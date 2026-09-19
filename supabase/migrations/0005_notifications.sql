-- Notifications: written only by system triggers; read/marked by owner.
create table if not exists public.notifications (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,
  payload jsonb not null default '{}',
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_notifications_owner
  on public.notifications(user_id, read, created_at desc);
alter table public.notifications enable row level security;
revoke all on public.notifications from anon, authenticated;
create policy "notifications_select_own" on public.notifications
  for select using (user_id = auth.uid());
create policy "notifications_mark_read_own" on public.notifications
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create or replace function public.system_notify(p_user uuid, p_kind text, p_payload jsonb)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.notifications(user_id, kind, payload) values (p_user, p_kind, p_payload);
end $$;
revoke all on function public.system_notify from public;

create or replace function public.trg_notify_store_event() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.status is distinct from old.status then
    perform public.system_notify(new.owner_id, 'store_' || new.status,
      jsonb_build_object('store', new.name, 'reason', new.rejection_reason));
  end if;
  if new.tier is distinct from old.tier then
    perform public.system_notify(new.owner_id, 'tier_' || new.tier,
      jsonb_build_object('store', new.name, 'tier', new.tier));
  end if;
  return new;
end $$;
drop trigger if exists trg_notify_store_event on public.stores;
create trigger trg_notify_store_event after update on public.stores
for each row execute function public.trg_notify_store_event();

create or replace function public.trg_notify_new_order() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_owner uuid;
begin
  select owner_id into v_owner from public.stores where id = new.store_id;
  if v_owner is not null then
    perform public.system_notify(v_owner, 'new_order',
      jsonb_build_object('order_id', new.id, 'city', new.customer_city));
  end if;
  return new;
end $$;
drop trigger if exists trg_notify_new_order on public.orders;
create trigger trg_notify_new_order after insert on public.orders
for each row execute function public.trg_notify_new_order();
