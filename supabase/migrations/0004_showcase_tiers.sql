-- NexusShop = vidriera: never processes funds; tiers = the only revenue.
alter table profiles add column if not exists role text not null default 'seller';
alter table stores add column if not exists whatsapp text;
alter table stores add column if not exists socials jsonb not null default '{}';
alter table stores add column if not exists tier text not null default 'free'
  check (tier in ('free','premium','platinum','gold'));
alter table stores add column if not exists tier_activated_at timestamptz;
alter table products add column if not exists videos jsonb not null default '[]';
comment on column orders.payment_method is
  'Off-platform arrangement label (COD/bank/wallet agreed via WhatsApp). NexusShop never processes funds.';
create or replace function tier_limits(p_tier text) returns jsonb
language sql immutable as $$
  select case p_tier
    when 'gold'     then '{"max_products": -1, "videos": true, "ai": "unlimited", "featured": true}'::jsonb
    when 'platinum' then '{"max_products": -1, "videos": true, "ai": "monthly",   "featured": true}'::jsonb
    when 'premium'  then '{"max_products": 100,"videos": true, "ai": "addon",     "featured": false}'::jsonb
    else                 '{"max_products": 10, "videos": false,"ai": "addon",     "featured": false}'::jsonb
  end;
$$;
create or replace function set_store_tier(p_store_id uuid, p_tier text)
returns void language plpgsql security definer as $$
begin
  if not exists (select 1 from profiles where id = auth.uid() and role = 'admin') then
    raise exception 'not authorized';
  end if;
  update stores set tier = p_tier, tier_activated_at = now() where id = p_store_id;
end; $$;
