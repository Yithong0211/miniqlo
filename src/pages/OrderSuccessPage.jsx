import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OrderSuccessPage() {
  const location = useLocation();
  const orderNum = location.state?.orderNum || `MQ-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-16">
      <div className="max-w-lg w-full text-center">
        {/* Animated success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
          className="w-28 h-28 bg-miniqlo-green/20 rounded-full flex items-center justify-center mx-auto mb-6 relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 300, delay: 0.4 }}
          >
            <CheckCircle2 size={52} className="text-green-500" />
          </motion.div>
          {/* Rings */}
          {[1.3, 1.6, 1.9].map((scale, i) => (
            <motion.div
              key={i}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: scale, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 + 0.5 }}
              className="absolute inset-0 bg-green-300/30 rounded-full"
            />
          ))}
        </motion.div>

        {/* Confetti emojis */}
        <div className="relative">
          {['🎉', '⭐', '🎊', '✨', '🌟', '🎈'].map((emoji, i) => (
            <motion.span
              key={i}
              initial={{ y: 0, opacity: 1, scale: 0 }}
              animate={{ y: -80 - i * 20, opacity: 0, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.6 + i * 0.15, ease: 'easeOut' }}
              className="absolute text-2xl pointer-events-none select-none"
              style={{ left: `${10 + i * 16}%`, top: '-20px' }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="section-subtitle mb-3">Order Confirmed 🎉</p>
          <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
            Thank you for shopping<br />with MiniQlo!
          </h1>
          <p className="text-muted text-sm mb-2">
            Your little one's new outfit is on its way!
          </p>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-5 py-3 mb-8">
            <Package size={16} className="text-miniqlo-blue" />
            <span className="text-sm font-medium text-charcoal">Order #</span>
            <span className="text-sm font-bold text-charcoal font-mono">{orderNum}</span>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-3xl p-6 shadow-card mb-8"
        >
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">What happens next?</p>
          <div className="space-y-4">
            {[
              { emoji: '📧', title: 'Confirmation email', desc: "We've sent your order details to your email." },
              { emoji: '📦', title: 'Order being packed', desc: 'Your items are being carefully packaged.' },
              { emoji: '🚀', title: 'Shipped & delivered', desc: 'Estimated 3–5 business days delivery.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 bg-beige rounded-2xl flex items-center justify-center text-lg flex-none">
                  {item.emoji}
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button className="btn-outline flex-1 py-4 flex items-center justify-center gap-2">
            <Package size={16} /> Track Order
          </button>
          <Link to="/" className="btn-primary flex-1 py-4 flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
