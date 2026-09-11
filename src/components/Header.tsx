'use client';
import { useState } from 'react';
import { Search, ShoppingCart, User, Store, Globe } from 'lucide-react';
import es from '../messages/es.json';
import en from '../messages/en.json';
import ur from '../messages/ur.json';

const translations = { es, en, ur };

export default function Header() {
  const [lang, setLang] = useState<'es' | 'en' | 'ur'>('es');
  const t = translations[lang].Header;

  return (
    <header className="bg-nexusGreen text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <ShoppingCart size={32} className="text-nexusYellow" />
          <span className="text-2xl font-bold tracking-tight">NexusShop</span>
        </div>

        {/* Barra de Búsqueda */}
        <div className="flex-1 w-full relative">
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full py-2 px-4 rounded-sm text-gray-800 outline-none focus:ring-2 focus:ring-nexusBlue"
          />
          <button className="absolute right-0 top-0 h-full px-4 bg-gray-100 rounded-r-sm border-l border-gray-300">
            <Search size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Acciones y Selector de Idioma */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer hover:text-nexusYellow">
            <User size={20} />
            <span>{t.login}</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-nexusYellow">
            <Store size={20} />
            <span>{t.sell}</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-nexusYellow">
            <ShoppingCart size={20} />
            <span>{t.cart}</span>
          </div>
          
          {/* Selector de Idiomas */}
          <div className="flex items-center gap-1 bg-nexusGreen-dark px-2 py-1 rounded-md">
            <Globe size={16} />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as any)}
              className="bg-transparent outline-none cursor-pointer text-white"
            >
              <option value="es" className="text-black">ES</option>
              <option value="en" className="text-black">EN</option>
              <option value="ur" className="text-black">UR</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
