import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const footerLinks = {
  'Shop': ['T-Shirts', 'Hoodies', 'Dresses', 'Baby Rompers', 'Shoes', 'Pajamas', 'Sale'],
  'Help': ['FAQ', 'Size Guide', 'Track Order', 'Returns & Exchange', 'Contact Us'],
  'About': ['Our Story', 'Sustainability', 'Careers', 'Press', 'Affiliate Program'],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                <span className="text-charcoal text-sm font-bold">M</span>
              </div>
              <span className="font-display text-2xl font-bold">
                Mini<span className="text-miniqlo-pink">Qlo</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Premium children's fashion inspired by minimalist Japanese style. Tiny Style, Big Smiles.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 mb-8">
              {[
                { icon: Mail, text: 'hello@miniqlo.my' },
                { icon: Phone, text: '+60 12-345 6789' },
                { icon: MapPin, text: 'Kuala Lumpur, Malaysia' },
              ].map(({ icon: Icon, text }) => (
                <a key={text} href="#" className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                  <Icon size={14} />
                  {text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  whileHover={{ scale: 1.15 }}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-5 text-white/90">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-white text-sm transition-colors hover:pl-1 block transition-all duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2026 MiniQlo. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-white/40 text-xs">
            Made with <Heart size={11} className="text-miniqlo-pink mx-1" fill="currentColor" /> for little ones everywhere
          </div>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <a key={l} href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
