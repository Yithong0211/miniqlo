import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, User, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/#shop' },
  { label: 'New Arrival', href: '/#new-arrivals' },
  { label: 'Sale', href: '/#sale', highlight: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-soft border-b border-white/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-charcoal flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span className="font-display text-xl font-bold text-charcoal tracking-tight">
                Mini<span className="text-miniqlo-pink">Qlo</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 relative group ${
                    link.highlight
                      ? 'text-red-500 font-semibold'
                      : 'text-charcoal/75 hover:text-charcoal'
                  }`}
                >
                  {link.label}
                  {!link.highlight && (
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-charcoal rounded-full transition-all duration-300 group-hover:w-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Search */}
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-baby-blue"
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-charcoal/70 hover:text-charcoal hover:bg-beige transition-all duration-200"
                aria-label="Search"
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>

              <button className="w-9 h-9 rounded-xl hidden sm:flex items-center justify-center text-charcoal/70 hover:text-charcoal hover:bg-beige transition-all duration-200">
                <Heart size={18} />
              </button>

              <button className="w-9 h-9 rounded-xl hidden sm:flex items-center justify-center text-charcoal/70 hover:text-charcoal hover:bg-beige transition-all duration-200">
                <User size={18} />
              </button>

              <Link
                to="/cart"
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-charcoal hover:bg-beige transition-all duration-200"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-miniqlo-pink rounded-full text-white text-xs font-bold flex items-center justify-center"
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-charcoal hover:bg-beige transition-all duration-200"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="font-display text-xl font-bold">
                  Mini<span className="text-miniqlo-pink">Qlo</span>
                </span>
                <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-beige transition-colors">
                  <X size={20} />
                </button>
              </div>
              <nav className="p-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                      link.highlight
                        ? 'text-red-500 font-semibold'
                        : 'text-charcoal hover:bg-beige'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="p-6 border-t border-gray-100 flex gap-3">
                <button className="flex-1 btn-outline text-xs py-2.5">Sign In</button>
                <button className="flex-1 btn-primary text-xs py-2.5">Sign Up</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
