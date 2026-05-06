import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Timer, Tag } from 'lucide-react';
import { saleItems } from '../data/products';
import ProductCard from './ProductCard';

export default function SaleBanner() {
  return (
    <section id="sale" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-4xl mb-16"
          style={{ background: 'linear-gradient(135deg, #2C2C2C 0%, #4a4a6a 50%, #7c5cbf 100%)' }}
        >
          {/* Blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-miniqlo-pink/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-miniqlo-blue/20 blur-3xl" />
            <div className="absolute top-10 left-1/2 w-40 h-40 rounded-full bg-miniqlo-yellow/10 blur-2xl" />
          </div>

          {/* Floating elements */}
          {['🎈', '⭐', '🌈', '🎉', '✨'].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.6 }}
              className="absolute text-2xl opacity-60 select-none"
              style={{ top: `${15 + i * 15}%`, left: `${5 + i * 20}%` }}
            >
              {emoji}
            </motion.div>
          ))}

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-12 md:px-16">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <Tag className="text-miniqlo-yellow" size={20} />
                <span className="text-miniqlo-yellow text-sm font-semibold tracking-wider uppercase">Limited Time Offer</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
                Up to <span className="text-miniqlo-yellow">30% OFF</span>
              </h2>
              <p className="text-white/70 text-lg mb-6 max-w-md">
                Shop our end-of-season sale on selected kids fashion. Premium quality, unbeatable prices.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="#shop" className="bg-white text-charcoal font-semibold px-8 py-3 rounded-2xl hover:bg-beige transition-all duration-200 hover:scale-105">
                  Shop Sale Now
                </a>
                <a href="#shop" className="border border-white/40 text-white px-8 py-3 rounded-2xl hover:bg-white/10 transition-all duration-200">
                  View All
                </a>
              </div>
            </div>

            {/* Countdown-style badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center"
            >
              <Timer className="text-miniqlo-yellow mx-auto mb-3" size={32} />
              <p className="text-white/70 text-xs uppercase tracking-wider mb-2">Sale Ends In</p>
              <div className="flex gap-3 justify-center">
                {[{v:'02',l:'Days'},{v:'14',l:'Hrs'},{v:'37',l:'Min'}].map(({v,l}) => (
                  <div key={l} className="text-center">
                    <div className="font-display text-3xl font-bold text-white">{v}</div>
                    <div className="text-white/50 text-xs">{l}</div>
                  </div>
                ))}
              </div>
              <p className="text-miniqlo-yellow text-xs mt-4 font-semibold">Use code: <span className="font-bold">MINI20</span></p>
            </motion.div>
          </div>
        </motion.div>

        {/* Sale products */}
        <div className="mb-8">
          <p className="section-subtitle mb-2">On Sale Now</p>
          <h3 className="section-title text-3xl">Sale Items</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {saleItems.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
