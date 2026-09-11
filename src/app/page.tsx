'use client';
import Header from '../components/Header';
import { ShoppingCart, Heart } from 'lucide-react';
import es from '../messages/es.json';
import en from '../messages/en.json';
import ur from '../messages/ur.json';
import { useState } from 'react';

const translations = { es, en, ur };

// Productos de ejemplo (luego los conectaremos a Supabase)
const mockProducts = [
  { id: 1, name: 'Smart Watch Pro', price: 2499, category: 'Electronics', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Wireless Earbuds', price: 1899, category: 'Electronics', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Leather Jacket', price: 3500, category: 'Fashion', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Home Decor Lamp', price: 1200, category: 'Home', image: 'https://via.placeholder.com/150' },
];

export default function Home() {
  const [lang, setLang] = useState<'es' | 'en' | 'ur'>('es'); // Temporal para prueba
  const t = translations[lang].Home;

  return (
    <div className="min-h-screen bg-nexusGray">
      {/* Pasamos el idioma al Header manualmente por ahora */}
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 text-center">
          <h1 className="text-3xl font-bold text-nexusGreen mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">{t.products}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <ShoppingCart size={48} className="text-gray-400" />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">{product.name}</h3>
                <p className="text-2xl font-bold text-nexusGreen">${product.price}</p>
                <button className="mt-3 w-full bg-nexusBlue hover:bg-nexusBlue-dark text-white py-2 rounded-md font-medium transition">
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
