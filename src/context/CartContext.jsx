import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

const COUPONS = {
  'MINI10': { type: 'percent', value: 10, label: '10% off' },
  'MINI20': { type: 'percent', value: 20, label: '20% off' },
  'FREESHIP': { type: 'freeship', value: 0, label: 'Free Shipping' },
  'WELCOME': { type: 'percent', value: 15, label: '15% off' },
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [savedItems, setSavedItems] = useState([]);

  const addToCart = useCallback((product, size = null, quantity = 1) => {
    setCartItems(prev => {
      const key = `${product.id}-${size}`;
      const existing = prev.find(i => i.cartKey === key);
      if (existing) {
        return prev.map(i =>
          i.cartKey === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, {
        ...product,
        cartKey: key,
        selectedSize: size || (product.sizes?.[0] ?? null),
        quantity,
      }];
    });
  }, []);

  const removeFromCart = useCallback((cartKey) => {
    setCartItems(prev => prev.filter(i => i.cartKey !== cartKey));
  }, []);

  const updateQuantity = useCallback((cartKey, qty) => {
    if (qty < 1) return;
    setCartItems(prev =>
      prev.map(i => i.cartKey === cartKey ? { ...i, quantity: qty } : i)
    );
  }, []);

  const saveForLater = useCallback((cartKey) => {
    const item = cartItems.find(i => i.cartKey === cartKey);
    if (item) {
      setSavedItems(prev => [...prev, item]);
      removeFromCart(cartKey);
    }
  }, [cartItems, removeFromCart]);

  const moveToCart = useCallback((cartKey) => {
    const item = savedItems.find(i => i.cartKey === cartKey);
    if (item) {
      addToCart(item, item.selectedSize, item.quantity);
      setSavedItems(prev => prev.filter(i => i.cartKey !== cartKey));
    }
  }, [savedItems, addToCart]);

  const applyCoupon = useCallback((code) => {
    const found = COUPONS[code.toUpperCase()];
    if (found) {
      setCoupon({ code: code.toUpperCase(), ...found });
      setCouponError('');
      return true;
    } else {
      setCouponError('Invalid coupon code. Try MINI10, MINI20 or FREESHIP');
      return false;
    }
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
    setCouponError('');
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCoupon(null);
  }, []);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : subtotal === 0 ? 0 : 9.90;
  const shippingFee = coupon?.type === 'freeship' ? 0 : shipping;
  const discount = coupon?.type === 'percent'
    ? (subtotal * coupon.value) / 100
    : 0;
  const tax = (subtotal - discount) * 0.06;
  const total = subtotal - discount + shippingFee + tax;
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, savedItems,
      addToCart, removeFromCart, updateQuantity,
      saveForLater, moveToCart,
      coupon, couponError, applyCoupon, removeCoupon,
      clearCart,
      subtotal, shippingFee, discount, tax, total, cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
