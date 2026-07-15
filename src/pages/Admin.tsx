import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { PlusCircle, Save, ShieldCheck, Trash2, RefreshCw } from 'lucide-react';
import { getMarketplaceData, saveMarketplaceData } from '../utils/marketplaceStore';
import type { Product } from '../types';

const blankProduct = {
  id: '',
  name: '',
  platform: 'YouTube',
  category: 'youtube',
  stats: '',
  priceRWF: 0,
  description: '',
  features: [''],
  thumbnail: '',
  isFeatured: false,
  isNew: true,
  rating: 4.8,
};

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [draft, setDraft] = useState({ ...blankProduct });
  const [message, setMessage] = useState('Manage your catalog in the browser.');

  useEffect(() => {
    const data = getMarketplaceData();
    setProducts(data.products);
  }, []);

  const totalValue = useMemo(() => products.reduce((sum, item) => sum + item.priceRWF, 0), [products]);

  const saveProducts = () => {
    saveMarketplaceData({ products });
    setMessage('Catalog updated successfully.');
  };

  const addProduct = () => {
    if (!draft.name.trim()) {
      setMessage('Please enter a title before adding a product.');
      return;
    }

    const newProduct: Product = {
      ...draft,
      id: draft.id || `asset-${Date.now()}`,
      features: draft.features.filter(Boolean),
      priceRWF: Number(draft.priceRWF) || 0,
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    setDraft({ ...blankProduct });
    saveMarketplaceData({ products: updated });
    setMessage('New asset added and saved locally.');
  };

  const updatePrice = (id: string, nextPrice: number) => {
    const updated = products.map((item) => (item.id === id ? { ...item, priceRWF: nextPrice } : item));
    setProducts(updated);
    saveMarketplaceData({ products: updated });
    setMessage('Price updated.');
  };

  const removeProduct = (id: string) => {
    const updated = products.filter((item) => item.id !== id);
    setProducts(updated);
    saveMarketplaceData({ products: updated });
    setMessage('Asset removed.');
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[40px] border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 md:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-semibold mb-4">
                <ShieldCheck size={16} /> Secure admin workspace
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Admin Dashboard</h1>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">Create new premium digital assets, update pricing instantly, and keep the catalog synchronized in local storage.</p>
            </div>
            <button onClick={saveProducts} className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-white font-semibold shadow-lg shadow-red-600/20">
              <Save size={18} /> Save Changes
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Add New Asset</h2>
                <span className="rounded-full bg-slate-200 dark:bg-slate-800 px-3 py-1 text-sm font-semibold text-slate-700 dark:text-slate-300">{products.length} assets</span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Title" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900" />
                <input value={draft.platform} onChange={(e) => setDraft({ ...draft, platform: e.target.value })} placeholder="Platform" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900" />
                <input value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} placeholder="Category id" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900" />
                <input type="number" value={draft.priceRWF} onChange={(e) => setDraft({ ...draft, priceRWF: Number(e.target.value) })} placeholder="Price (RWF)" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900" />
                <input value={draft.stats} onChange={(e) => setDraft({ ...draft, stats: e.target.value })} placeholder="Stats" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900 md:col-span-2" />
                <input value={draft.thumbnail} onChange={(e) => setDraft({ ...draft, thumbnail: e.target.value })} placeholder="Image URL" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900 md:col-span-2" />
                <input value={draft.features[0] || ''} onChange={(e) => setDraft({ ...draft, features: [e.target.value] })} placeholder="WhatsApp Link or note" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900 md:col-span-2" />
                <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Short description" rows={4} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900 md:col-span-2" />
              </div>

              <button onClick={addProduct} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 px-5 py-3 text-white font-semibold shadow-lg shadow-red-600/20">
                <PlusCircle size={18} /> Add Asset
              </button>
            </div>

            <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
              <h2 className="text-xl font-black">Catalog Summary</h2>
              <p className="mt-2 text-slate-300">Dynamic control center for your storefront.</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Total listed value</p>
                  <p className="mt-1 text-3xl font-black">{totalValue.toLocaleString()} RWF</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Status</p>
                  <p className="mt-1 text-lg font-semibold">{message}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Live Inventory</h2>
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <RefreshCw size={16} /> Updates saved locally
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {products.map((item) => (
                <div key={item.id} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-black text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.platform} • {item.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" value={item.priceRWF} onChange={(e) => updatePrice(item.id, Number(e.target.value))} className="w-32 rounded-2xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
                      <button onClick={() => removeProduct(item.id)} className="rounded-2xl border border-red-200 p-2 text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
