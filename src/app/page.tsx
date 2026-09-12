'use client';
import Header from '../components/Header';
import { ShoppingCart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import WhatsAppButton from '../components/WhatsAppButton';
import es from '../messages/es.json';
import en from '../messages/en.json';
import ur from '../messages/ur.json';

const translations = { es, en, ur };

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  rating: number;
};

export default function Home() {
  const [lang, setLang] = useState<'es' | 'en' | 'ur'>('es');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[lang].Home;

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error cargando productos:', error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-nexusGray">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 text-center">
          <h1 className="text-3xl font-bold text-nexusGreen mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t.products}</h2>
        {loading ? (
          <p className="text-center text-gray-500">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer">
                <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {product.img ? (
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingCart size={48} className="text-gray-400" />
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="text-nexusYellow fill-nexusYellow" />
                    <span className="text-xs text-gray-500">{product.rating}</span>
                  </div>
                  <p className="text-2xl font-bold text-nexusGreen">${product.price}</p>
                  <WhatsAppButton productName={product.name} price={product.price} phoneNumber="923001234567" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
