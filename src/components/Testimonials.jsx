import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Lim',
    role: 'Mum of 2',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format',
    rating: 5,
    text: "MiniQlo has completely transformed how I dress my kids! The quality is incredible — so soft, and the designs are just adorable. My daughter refuses to wear anything else now! 😍",
    product: 'Floral Bloom Dress',
    location: 'Kuala Lumpur',
  },
  {
    id: 2,
    name: 'Ahmad Faris',
    role: 'Dad of 3',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format',
    rating: 5,
    text: "I love how minimalist yet stylish the designs are. My son loves the Bear Hug Hoodie — he's been wearing it every single day! The material is so comfy. Delivery was super fast too!",
    product: 'Bear Hug Hoodie',
    location: 'Petaling Jaya',
  },
  {
    id: 3,
    name: 'Michelle Tan',
    role: 'Mum of 1',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&auto=format',
    rating: 5,
    text: "The baby rompers are absolutely precious! So easy to put on with the snap buttons. My 6-month-old looked like a little fashion model at her cousins wedding 👶✨",
    product: 'Cloud Nine Romper',
    location: 'Penang',
  },
  {
    id: 4,
    name: 'Nurul Ain',
    role: 'Mum of 2',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&auto=format',
    rating: 5,
    text: "Amazing customer service and the packaging is so beautiful — feels like a luxury brand! My girls were so excited to unbox their new outfits. Will definitely order again! 🛍️",
    product: 'Linen Sunday Dress',
    location: 'Johor Bahru',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle mb-2"
          >
            Parent Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Loved by Families
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass-card p-6 relative"
            >
              <Quote className="absolute top-5 right-5 text-miniqlo-pink/20" size={40} />
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-2xl object-cover flex-none"
                />
                <div>
                  <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role} · {t.location}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={11} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-charcoal/80 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-xs text-muted">Purchased: {t.product}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-4xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <p className="font-display text-6xl font-bold text-charcoal">4.9</p>
            <div className="flex gap-1 justify-center md:justify-start mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-muted text-sm mt-1">from 2,400+ reviews</p>
          </div>
          <div className="flex-1 max-w-xs w-full space-y-2">
            {[['5 stars', 92], ['4 stars', 6], ['3 stars', 2]].map(([label, pct]) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs text-muted w-12 text-right">{label}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full bg-yellow-400 rounded-full"
                  />
                </div>
                <span className="text-xs font-medium w-8">{pct}%</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-miniqlo-green font-semibold text-sm mb-2">✓ 98% recommend us</p>
            <p className="text-xs text-muted">to their fellow parents</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
