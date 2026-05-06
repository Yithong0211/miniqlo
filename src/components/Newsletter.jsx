import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section className="py-20 bg-soft-blue/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-white rounded-4xl px-8 py-14 md:px-16 text-center shadow-card"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-miniqlo-pink/10 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-baby-blue/20 translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="w-14 h-14 bg-miniqlo-pink/15 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="text-miniqlo-pink" size={26} />
            </motion.div>

            <p className="section-subtitle mb-2">Stay In The Loop</p>
            <h2 className="section-title text-3xl md:text-4xl mb-3">
              Get 15% Off Your First Order
            </h2>
            <p className="text-muted text-sm max-w-md mx-auto mb-8">
              Subscribe for exclusive deals, new arrivals, and parenting style tips. No spam — we promise!
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="input-field flex-1"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Subscribe <ArrowRight size={15} /></>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="inline-flex items-center gap-3 bg-miniqlo-green/20 border border-miniqlo-green/40 rounded-2xl px-6 py-4"
              >
                <div className="w-8 h-8 bg-miniqlo-green/30 rounded-xl flex items-center justify-center">
                  <Check className="text-green-600" size={16} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-charcoal text-sm">You're in! 🎉</p>
                  <p className="text-xs text-muted">Use code <strong>WELCOME</strong> for 15% off your first order</p>
                </div>
              </motion.div>
            )}

            <p className="text-xs text-muted mt-4">
              Join 12,000+ parents already subscribed · Unsubscribe anytime
            </p>

            {/* Perks */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-100">
              {[
                { emoji: '🎁', text: 'Exclusive member deals' },
                { emoji: '📦', text: 'Free shipping perks' },
                { emoji: '✨', text: 'Early access to drops' },
              ].map(p => (
                <div key={p.text} className="flex items-center gap-2 text-sm text-charcoal/70">
                  <span>{p.emoji}</span>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
