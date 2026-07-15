import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react';
import ProductCard from '../components/home/ProductCard';
import SectionHeader from '../components/shared/SectionHeader';
import { cn } from '../utils/utils';
import { getMarketplaceData } from '../utils/marketplaceStore';

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(catParam);
  const { categories, products } = getMarketplaceData();

  useEffect(() => {
    setActiveCategory(catParam);
  }, [catParam]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setSearchParams({ cat: id });
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader 
          title="Marketplace" 
          subtitle="Discover, compare and buy premium digital assets for your next project."
        />

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search Bar */}
          <div className="flex-grow group relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500 transition-colors">
              <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Search YouTube channels, TikTok accounts, eBooks..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button 
              onClick={() => handleCategoryChange('all')}
              className={cn(
                "px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap whitespace-nowrap",
                activeCategory === 'all' 
                  ? "bg-red-600 text-white shadow-xl shadow-red-600/20" 
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              All Assets
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  "px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap",
                  activeCategory === cat.id
                    ? "bg-red-600 text-white shadow-xl shadow-red-600/20"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-slate-500 font-medium">
            Showing <span className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</span> assets
          </p>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
             <button className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm text-red-600"><LayoutGrid size={18} /></button>
             <button className="p-2 rounded-lg text-slate-400"><List size={18} /></button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No assets found</h3>
            <p className="text-slate-500">We couldn't find any assets matching your filters. Try a different search or category.</p>
            <button 
              onClick={() => {setSearchQuery(''); handleCategoryChange('all');}}
              className="mt-6 text-red-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
