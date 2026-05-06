import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Check, Shield, CreditCard, Truck, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';

const steps = ['Shipping', 'Delivery', 'Payment'];

const paymentMethods = [
  { id: 'visa', label: 'Visa', group: 'Card', emoji: '💳', desc: 'Credit / Debit' },
  { id: 'mastercard', label: 'Mastercard', group: 'Card', emoji: '💳', desc: 'Credit / Debit' },
  { id: 'tng', label: "Touch 'n Go eWallet", group: 'E-Wallet', emoji: '🟢', desc: 'TNG Digital' },
  { id: 'grabpay', label: 'GrabPay', group: 'E-Wallet', emoji: '🟡', desc: 'Grab' },
  { id: 'boost', label: 'Boost', group: 'E-Wallet', emoji: '🔴', desc: 'Axiata Digital' },
  { id: 'fpx', label: 'FPX Online Banking', group: 'Online Banking', emoji: '🏦', desc: 'Malaysia Banks' },
  { id: 'atome', label: 'Atome', group: 'Buy Now Pay Later', emoji: '⚡', desc: '3 interest-free payments' },
  { id: 'spaylater', label: 'SPayLater', group: 'Buy Now Pay Later', emoji: '🛍️', desc: 'Shopee Pay' },
  { id: 'cod', label: 'Cash On Delivery', group: 'Cash', emoji: '💵', desc: 'Pay when received' },
];

const groupOrder = ['Card', 'E-Wallet', 'Online Banking', 'Buy Now Pay Later', 'Cash'];

const deliveryOptions = [
  { id: 'standard', label: 'Standard Delivery', sub: '5–7 business days', price: 9.90 },
  { id: 'express', label: 'Express Delivery', sub: '1–2 business days', price: 19.90 },
  { id: 'free', label: 'Free Shipping', sub: '5–7 business days (orders ≥ RM150)', price: 0 },
];

function StepIndicator({ step }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-charcoal' : 'text-muted'}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${
              i + 1 < step ? 'bg-miniqlo-green text-charcoal' :
              i + 1 === step ? 'bg-charcoal text-white' :
              'bg-gray-100 text-muted'
            }`}>
              {i + 1 < step ? <Check size={14} /> : i + 1}
            </div>
            <span className="text-xs font-medium hidden sm:inline">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 h-px ${i + 1 < step ? 'bg-miniqlo-green' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function ShippingForm({ form, setForm, onNext }) {
  const fields = [
    { key: 'fullName', label: 'Full Name', placeholder: 'John Doe', type: 'text', col: 2 },
    { key: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email', col: 1 },
    { key: 'phone', label: 'Phone Number', placeholder: '+60 12-345 6789', type: 'tel', col: 1 },
    { key: 'address', label: 'Street Address', placeholder: '123, Jalan Example', type: 'text', col: 2 },
    { key: 'city', label: 'City', placeholder: 'Kuala Lumpur', type: 'text', col: 1 },
    { key: 'state', label: 'State', placeholder: 'Selangor', type: 'text', col: 1 },
    { key: 'postcode', label: 'Postcode', placeholder: '50000', type: 'text', col: 1 },
    { key: 'country', label: 'Country', placeholder: 'Malaysia', type: 'text', col: 1 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-semibold text-charcoal text-lg mb-6">Shipping Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.key} className={f.col === 2 ? 'col-span-2' : 'col-span-2 sm:col-span-1'}>
            <label className="block text-xs font-medium text-charcoal/70 mb-1.5">{f.label}</label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key] || ''}
              onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
              required
              className="input-field"
            />
          </div>
        ))}
      </div>
      <button type="submit" className="btn-primary w-full mt-6 py-4 flex items-center justify-center gap-2">
        Continue to Delivery <ChevronRight size={15} />
      </button>
    </form>
  );
}

function DeliveryForm({ selected, onSelect, onNext, onBack }) {
  return (
    <div>
      <h2 className="font-semibold text-charcoal text-lg mb-6">Delivery Method</h2>
      <div className="space-y-3 mb-6">
        {deliveryOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
              selected === opt.id
                ? 'border-charcoal bg-charcoal/5'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === opt.id ? 'border-charcoal bg-charcoal' : 'border-gray-300'
              }`}>
                {selected === opt.id && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">{opt.label}</p>
                <p className="text-muted text-xs">{opt.sub}</p>
              </div>
            </div>
            <span className="font-semibold text-charcoal text-sm">
              {opt.price === 0 ? <span className="text-green-600">FREE</span> : `RM ${opt.price.toFixed(2)}`}
            </span>
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={onBack} className="btn-outline flex-1 py-4">← Back</button>
        <button onClick={onNext} className="btn-primary flex-1 py-4 flex items-center justify-center gap-2">
          Continue to Payment <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

function PaymentForm({ selectedPayment, onSelect, onPlace, onBack, loading }) {
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const showCardForm = ['visa', 'mastercard'].includes(selectedPayment);

  return (
    <div>
      <h2 className="font-semibold text-charcoal text-lg mb-6">Payment Method</h2>
      {groupOrder.map(group => {
        const groupItems = paymentMethods.filter(m => m.group === group);
        return (
          <div key={group} className="mb-5">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">{group}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {groupItems.map(method => (
                <button
                  key={method.id}
                  onClick={() => onSelect(method.id)}
                  className={`flex items-center gap-2 p-3 rounded-2xl border-2 transition-all text-left ${
                    selectedPayment === method.id
                      ? 'border-charcoal bg-charcoal/5'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-lg">{method.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold text-charcoal leading-tight">{method.label}</p>
                    <p className="text-xs text-muted leading-tight">{method.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Card form */}
      <AnimatePresence>
        {showCardForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-soft-blue/40 rounded-2xl p-5 mb-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-charcoal/70 block mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={card.number}
                  onChange={e => setCard(p => ({ ...p, number: e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim() }))}
                  className="input-field font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-charcoal/70 block mb-1">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" maxLength={5} className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal/70 block mb-1">CVV</label>
                  <input type="password" placeholder="•••" maxLength={4} className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal/70 block mb-1">Cardholder Name</label>
                <input type="text" placeholder="John Doe" className="input-field" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 text-xs text-muted mb-5">
        <Shield size={13} className="text-green-500" />
        Your payment is secured with 256-bit SSL encryption
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-outline flex-1 py-4">← Back</button>
        <button
          onClick={onPlace}
          disabled={!selectedPayment || loading}
          className="btn-pink flex-1 py-4 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading
            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <><CreditCard size={15} /> Pay Now</>
          }
        </button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, subtotal, shippingFee, discount, tax, total, clearCart, coupon } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      navigate('/order-success', { state: { orderNum: `MQ-${Date.now().toString().slice(-6)}` } });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/cart" className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-beige transition-colors">
            <ArrowLeft size={17} />
          </Link>
          <h1 className="font-display text-3xl font-bold text-charcoal">Checkout</h1>
        </div>

        <StepIndicator step={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <ShippingForm form={form} setForm={setForm} onNext={() => setStep(2)} />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <DeliveryForm selected={delivery} onSelect={setDelivery} onNext={() => setStep(3)} onBack={() => setStep(1)} />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <PaymentForm selectedPayment={payment} onSelect={setPayment} onPlace={handlePlaceOrder} onBack={() => setStep(2)} loading={loading} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-card sticky top-24">
              <h3 className="font-semibold text-charcoal text-sm uppercase tracking-wide mb-5">Order Summary</h3>
              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto scrollbar-hide">
                {cartItems.map(item => (
                  <div key={item.cartKey} className="flex gap-3 items-center">
                    <div className="relative flex-none">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-charcoal text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-charcoal truncate">{item.name}</p>
                      <p className="text-xs text-muted">{item.selectedSize}</p>
                    </div>
                    <p className="text-xs font-semibold flex-none">RM {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-muted">
                  <span>Subtotal</span><span>RM {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs text-green-600">
                    <span>Discount ({coupon?.code})</span><span>-RM {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-muted">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : `RM ${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-xs text-muted">
                  <span>SST (6%)</span><span>RM {tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-4 flex justify-between">
                <span className="font-bold text-charcoal">Total</span>
                <span className="font-bold text-charcoal text-lg">RM {total.toFixed(2)}</span>
              </div>
              <div className="mt-4 p-3 bg-soft-blue rounded-2xl text-center">
                <p className="text-xs text-charcoal/70">
                  🚀 Est. delivery: <strong>3–5 business days</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
