import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const badgeStyles = {
  New: 'bg-miniqlo-blue text-white',
  Bestseller: 'bg-miniqlo-yellow text-charcoal',
  Sale: 'bg-red-400 text-white',
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, product.sizes?.[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="product-card group relative"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-beige aspect-square">
        <motion.img
          src={product.image}
          alt={product.name}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`tag text-xs font-bold ${badgeStyles[product.badge]}`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="tag bg-red-500 text-white text-xs font-bold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => { e.preventDefault(); setWishlisted(v => !v); }}
            className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-soft transition-colors ${
              wishlisted ? 'bg-red-400 text-white' : 'bg-white text-charcoal hover:bg-red-50'
            }`}
          >
            <Heart size={14} fill={wishlisted ? 'white' : 'none'} />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-soft text-charcoal hover:bg-beige transition-colors"
          >
            <Eye size={14} />
          </motion.button>
        </div>

        {/* Quick Add */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={handleAdd}
              className={`absolute bottom-3 left-3 right-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                added
                  ? 'bg-miniqlo-green text-charcoal'
                  : 'bg-charcoal text-white hover:bg-gray-800'
              }`}
            >
              <ShoppingBag size={13} />
              {added ? '✓ Added to Cart!' : 'Quick Add'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Colors */}
        <div className="flex gap-1.5 mb-2">
          {product.colors?.slice(0, 4).map((c, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 rounded-full border border-gray-200 cursor-pointer hover:scale-125 transition-transform"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <h3 className="font-medium text-charcoal text-sm leading-tight mb-1 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
            />
          ))}
          <span className="text-xs text-muted ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-charcoal text-sm">
            RM {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted line-through">
              RM {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
