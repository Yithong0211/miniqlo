import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Kids fashion images from hero.txt ShuffleGrid adapted for MiniQlo
const kidsImages = [
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1555861496-0666c8981751?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1537654780462-c1dd2c5dbb5a?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1616879340882-a32b2b25c0f4?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1559181567-c3190bfbf716?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop&auto=format",
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function ShuffleGrid() {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(() => shuffle(kidsImages));

  useEffect(() => {
    const go = () => {
      setSquares(shuffle(kidsImages));
      timeoutRef.current = setTimeout(go, 3500);
    };
    timeoutRef.current = setTimeout(go, 3500);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-2 h-[420px] lg:h-[520px]">
      {squares.map((src, i) => (
        <motion.div
          key={src}
          layout
          transition={{ duration: 1.2, type: 'spring', damping: 20 }}
          className="rounded-2xl overflow-hidden bg-beige"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-pastel">
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(126,200,227,0.4), transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(244,167,185,0.4), transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(255,224,163,0.5), transparent 70%)', filter: 'blur(40px)' }}
        />
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '15%', left: '8%', size: 'w-12 h-12', color: 'bg-miniqlo-pink/30', delay: 0 },
          { top: '65%', left: '5%', size: 'w-8 h-8', color: 'bg-baby-blue/40', delay: 1 },
          { top: '25%', right: '5%', size: 'w-16 h-16', color: 'bg-miniqlo-yellow/40', delay: 2 },
          { top: '75%', right: '8%', size: 'w-10 h-10', color: 'bg-miniqlo-green/40', delay: 0.5 },
          { top: '45%', left: '3%', size: 'w-6 h-6', color: 'bg-miniqlo-lavender/50', delay: 1.5 },
        ].map((shape, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -18, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: shape.delay, ease: 'easeInOut' }}
            className={`absolute ${shape.size} ${shape.color} rounded-full backdrop-blur-sm`}
            style={{ top: shape.top, left: shape.left, right: shape.right }}
          />
        ))}
        {/* Stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
            className="absolute w-2 h-2 bg-miniqlo-yellow rounded-full"
            style={{
              top: `${10 + i * 10}%`,
              left: `${5 + i * 12}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/60 rounded-full px-4 py-1.5 text-xs font-semibold text-charcoal/70 mb-6">
                <span className="w-2 h-2 bg-miniqlo-pink rounded-full animate-pulse" />
                New Collection 2026 — Now Available
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-[1.05] mb-6"
            >
              Tiny Style,{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-miniqlo-pink to-miniqlo-blue">
                  Big Smiles
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            >
              Discover trendy and comfy outfits for every little adventure. Premium kids fashion inspired by minimalist Japanese style.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#shop" className="btn-primary text-base px-8 py-4 inline-block">
                Shop Now →
              </a>
              <a href="#new-arrivals" className="btn-outline text-base px-8 py-4 inline-block">
                Explore Collection
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex gap-8 mt-12 pt-8 border-t border-charcoal/10"
            >
              {[
                { value: '50K+', label: 'Happy Kids' },
                { value: '200+', label: 'Styles' },
                { value: '4.9★', label: 'Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-charcoal">{stat.value}</p>
                  <p className="text-xs text-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Shuffle Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <ShuffleGrid />
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card-hover p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-soft-sage rounded-xl flex items-center justify-center text-xl">🌟</div>
              <div>
                <p className="text-xs font-bold text-charcoal">Free Shipping</p>
                <p className="text-xs text-muted">Orders over RM150</p>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card-hover p-4"
            >
              <p className="text-xs font-bold text-charcoal">🏷️ Sale Up to</p>
              <p className="text-2xl font-display font-bold text-miniqlo-pink">30% OFF</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="white" fillOpacity="0.5" />
          <path d="M0,60 C480,20 960,20 1440,60 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
