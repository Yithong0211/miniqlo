import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Tag, ChevronRight, ArrowLeft, BookmarkPlus, Shield, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-32 h-32 bg-beige rounded-4xl flex items-center justify-center mb-6"
      >
        <ShoppingBag size={52} className="text-muted" />
      </motion.div>
      <h2 className="font-display text-2xl font-bold text-charcoal mb-2">Your cart is empty</h2>
      <p className="text-muted text-sm mb-8">Browse our collection and add something adorable!</p>
      <Link to="/" className="btn-primary">Continue Shopping</Link>
    </div>
  );
}

const recommended = products.slice(0, 4);

export default function CartPage() {
  const {
    cartItems, savedItems, removeFromCart, updateQuantity, saveForLater, moveToCart,
    coupon, couponError, applyCoupon, removeCoupon,
    subtotal, shippingFee, discount, tax, total,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/" className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-beige transition-colors">
            <ArrowLeft size={17} />
          </Link>
          <div>
            <h1 className="font-display text-3xl font-bold text-charcoal">My Cart</h1>
            <p className="text-muted text-sm">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map(item => (
                  <motion.div
                    key={item.cartKey}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -60, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-5 shadow-card flex gap-4"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-beige flex-none">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-semibold text-charcoal text-sm leading-tight">{item.name}</h3>
                          <p className="text-muted text-xs mt-0.5">
                            Size: {item.selectedSize} · {item.category}
                          </p>
                        </div>
                        <p className="font-bold text-charcoal text-sm flex-none">
                          RM {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-beige transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-beige transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => saveForLater(item.cartKey)}
                            className="flex items-center gap-1 text-xs text-muted hover:text-charcoal transition-colors"
                          >
                            <BookmarkPlus size={13} /> Save
                          </button>
                          <button
                            onClick={() => removeFromCart(item.cartKey)}
                            className="w-8 h-8 rounded-xl hover:bg-red-50 flex items-center justify-center text-muted hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Saved for later */}
              {savedItems.length > 0 && (
                <div>
                  <h3 className="font-semibold text-charcoal text-sm mb-3">Saved for Later ({savedItems.length})</h3>
                  {savedItems.map(item => (
                    <div key={item.cartKey} className="bg-white/60 rounded-2xl p-4 flex gap-3 items-center mb-2">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal truncate">{item.name}</p>
                        <p className="text-xs text-muted">RM {item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => moveToCart(item.cartKey)}
                        className="text-xs text-miniqlo-blue font-medium hover:underline"
                      >
                        Move to cart
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { icon: Shield, text: 'Secure Payment', sub: 'SSL encrypted' },
                  { icon: Truck, text: 'Free Shipping', sub: 'Over RM150' },
                  { icon: Tag, text: 'Easy Returns', sub: '14-day policy' },
                ].map(({ icon: Icon, text, sub }) => (
                  <div key={text} className="bg-white rounded-2xl p-3 text-center shadow-soft">
                    <Icon size={18} className="text-miniqlo-blue mx-auto mb-1.5" />
                    <p className="text-xs font-semibold text-charcoal">{text}</p>
                    <p className="text-xs text-muted">{sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-card sticky top-24">
                <h3 className="font-semibold text-charcoal mb-5 text-sm uppercase tracking-wide">Order Summary</h3>

                {/* Coupon */}
                <div className="mb-5">
                  {coupon ? (
                    <div className="flex items-center justify-between bg-miniqlo-green/20 border border-miniqlo-green/40 rounded-2xl px-4 py-2.5">
                      <div>
                        <p className="text-xs font-semibold text-green-700">{coupon.code} — {coupon.label}</p>
                      </div>
                      <button onClick={removeCoupon} className="text-xs text-muted hover:text-red-400">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        className="input-field flex-1 py-2.5"
                      />
                      <button
                        onClick={() => applyCoupon(couponInput)}
                        className="btn-primary py-2.5 text-xs px-4"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-red-400 text-xs mt-1.5">{couponError}</p>}
                  <p className="text-xs text-muted mt-2">Try: MINI10, MINI20, FREESHIP</p>
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mb-5 pb-5 border-b border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-medium">RM {subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-RM {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span className={shippingFee === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                      {shippingFee === 0 ? 'FREE' : `RM ${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">SST (6%)</span>
                    <span className="font-medium">RM {tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-charcoal">Total</span>
                  <span className="font-bold text-charcoal text-xl">RM {total.toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  className="btn-primary w-full text-center flex items-center justify-center gap-2 py-4 text-base"
                >
                  Proceed to Checkout <ChevronRight size={16} />
                </Link>
                <Link to="/" className="mt-3 text-center text-sm text-muted hover:text-charcoal block transition-colors">
                  ← Continue Shopping
                </Link>

                {/* Estimated delivery */}
                <div className="mt-5 p-3 bg-soft-blue rounded-2xl">
                  <p className="text-xs text-charcoal/70 text-center">
                    🚀 <strong>Estimated delivery:</strong> 3–5 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommended.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="product-card">
                  <div className="aspect-square overflow-hidden bg-beige rounded-t-3xl">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-charcoal line-clamp-1">{product.name}</p>
                    <p className="text-xs font-bold mt-0.5">RM {product.price.toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
