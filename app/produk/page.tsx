'use client';
import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Sepatu Sneakers Casual Premium Alpha', price: 'Rp 450.000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', stock: 12, rating: '4.8', description: 'Sepatu sneakers casual nyaman untuk aktivitas sehari-hari dengan bahan premium.' },
  { id: 2, name: 'Jaket Bomber Waterproof', price: 'Rp 350.000', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80', stock: 5, rating: '4.9', description: 'Jaket bomber dengan lapisan luar tahan air dan angin, cocok untuk berkendara.' },
  { id: 3, name: 'Ransel Backpack Digital Multi-slot', price: 'Rp 275.000', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', stock: 20, rating: '4.7', description: 'Tas ransel modern dengan slot laptop 15.6 inci dan port USB charger eksternal.' },
  { id: 4, name: 'Jam Tangan Minimalis Classic Leather', price: 'Rp 620.000', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', stock: 3, rating: '5.0', description: 'Jam tangan elegan dengan desain minimalis, strap kulit asli, dan mesin quartz analog.' },
  { id: 5, name: 'Kacamata Hitam Anti-UV Polarized', price: 'Rp 145.000', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80', stock: 15, rating: '4.6', description: 'Kacamata hitam dengan lensa polarized anti-UV400 melindungi mata dari matahari.' },
  { id: 6, name: 'Botol Minum Termos Stainless SUS304', price: 'Rp 185.000', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80', stock: 8, rating: '4.8', description: 'Termos stainless steel food-grade berkualitas mampu menjaga suhu air hingga 12 jam.' },
  { id: 7, name: 'Headphone Wireless Bluetooth Bass+', price: 'Rp 599.000', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', stock: 10, rating: '4.9', description: 'Headphone wireless dengan koneksi Bluetooth stabil dan kualitas audio super bass.' },
  { id: 8, name: 'Mouse Gaming Ergonomis RGB', price: 'Rp 245.000', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80', stock: 25, rating: '4.7', description: 'Mouse gaming dengan desain ergonomis yang nyaman dilengkapi dengan lampu RGB.' }
];

export default function ProdukPage() {
  const [selected, setSelected] = useState<typeof products[0] | null>(null);
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-gray-100 min-h-screen p-4 text-black">
      <h1 className="text-xl font-black text-center mb-4">Daftar Produk</h1>
      <div className="max-w-xs mx-auto mb-6">
        <input
          type="text"
          placeholder="🔍 Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          suppressHydrationWarning
          className="w-full px-3 py-1.5 text-black bg-white border border-gray-400 rounded-lg focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {filtered.map((p) => (
          <div key={p.id} onClick={() => setSelected(p)} className="bg-white rounded-lg p-3 cursor-pointer shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded" />
              <h2 className="text-xs font-bold mt-2 text-black line-clamp-2">{p.name}</h2>
            </div>
            <div>
              <p className="text-sm font-black text-orange-600 mt-1">{p.price}</p>
              <p className="text-[10px] text-gray-500 mt-1">⭐ {p.rating} | Stok: {p.stock}</p>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-lg w-full p-4 relative shadow-xl flex flex-col md:flex-row gap-4">
            <button onClick={() => setSelected(null)} className="absolute top-2 right-3 font-bold text-gray-500">✕</button>
            <div className="w-full md:w-1/2">
              <img src={selected.image} alt={selected.name} className="w-full h-48 object-cover rounded-lg" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold text-black">{selected.name}</h2>
                <p className="text-xs text-gray-500 mt-1">⭐ {selected.rating} | Stok: {selected.stock} pcs</p>
                <p className="text-lg font-black text-orange-600 my-2">{selected.price}</p>
                <p className="text-xs text-gray-700 border-t pt-2">{selected.description}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 border border-orange-600 text-orange-600 font-bold py-1.5 rounded text-xs">🛒 Keranjang</button>
                <button className="flex-1 bg-orange-600 text-white font-bold py-1.5 rounded text-xs">Beli</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}