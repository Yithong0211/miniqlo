import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import { products, categories } from '../data/products';

export default function ProductGrid() {
  const [active, setActive] = useState('all');
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = active === 'all' ? products : products.filter(p => p.category === active);
  const visible = filtered.slice(0, visibleCount);

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="section-subtitle mb-2">Our Collection</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <button className="flex items-center gap-2 text-sm text-muted border border-gray-200 rounded-xl px-4 py-2 hover:bg-beige transition-colors self-start md:self-auto">
            <SlidersHorizontal size={15} /> Filter & Sort
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActive(cat.id); setVisibleCount(8); }}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat.id
                  ? 'text-white'
                  : 'text-charcoal/70 bg-beige hover:bg-gray-100'
              }`}
            >
              {active === cat.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-charcoal rounded-full"
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {visible.map((product, i) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(v => v + 8)}
              className="btn-outline"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
