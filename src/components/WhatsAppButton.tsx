'use client';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  productName: string;
  price: number;
  phoneNumber: string;
}

export default function WhatsAppButton({ productName, price, phoneNumber }: WhatsAppButtonProps) {
  const message = `¡Hola! Estoy interesado en el producto: *${productName}* por *$${price}*. ¿Está disponible?`;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition flex items-center justify-center gap-2"
    >
      <MessageCircle size={18} />
      Comprar por WhatsApp
    </a>
  );
}
