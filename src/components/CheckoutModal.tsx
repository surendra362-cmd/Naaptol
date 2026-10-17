import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  CreditCard,
  Building,
  Smartphone,
  Truck,
  ArrowRight,
  AlertTriangle,
  Loader2,
  Download,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ColorOption, PRODUCT_COLORS } from '../data/productData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: ColorOption;
  onColorChange: (color: ColorOption) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedColor,
  onColorChange,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeStep, setActiveStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');

  // Address form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi_app' | 'upi_qr' | 'card' | 'netbanking'>('upi_app');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'other'>('phonepe');
  const [upiId, setUpiId] = useState('');
  const [orderId, setOrderId] = useState('');

  // Lock background scroll to prevent double sliders
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Price calculations
  const unitPrice = 389;
  const totalPrice = quantity === 1 ? unitPrice : quantity === 2 ? 749 : 1099;
  const originalTotal = 1999 * quantity;
  const totalSavings = originalTotal - totalPrice;

  // Auto-fill city/state based on pincode prefix
  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    if (clean.length === 6) {
      const prefix = clean.slice(0, 2);
      if (['11', '12', '13'].includes(prefix)) {
        setCity('New Delhi');
        setStateName('Delhi NCR');
      } else if (['40', '41', '42'].includes(prefix)) {
        setCity('Mumbai');
        setStateName('Maharashtra');
      } else if (['56', '57', '58'].includes(prefix)) {
        setCity('Bengaluru');
        setStateName('Karnataka');
      } else if (['30', '31', '32', '33', '34'].includes(prefix)) {
        setCity('Jaipur');
        setStateName('Rajasthan');
      } else if (['38', '39'].includes(prefix)) {
        setCity('Ahmedabad');
        setStateName('Gujarat');
      } else if (['20', '21', '22', '23', '24'].includes(prefix)) {
        setCity('Lucknow');
        setStateName('Uttar Pradesh');
      } else if (['50', '51', '52'].includes(prefix)) {
        setCity('Hyderabad');
        setStateName('Telangana');
      } else if (['70', '71', '72'].includes(prefix)) {
        setCity('Kolkata');
        setStateName('West Bengal');
      } else if (['60', '61', '62'].includes(prefix)) {
        setCity('Chennai');
        setStateName('Tamil Nadu');
      } else if (['14', '15', '16'].includes(prefix)) {
        setCity('Chandigarh');
        setStateName('Punjab / Haryana');
      } else if (['45', '46', '47'].includes(prefix)) {
        setCity('Indore');
        setStateName('Madhya Pradesh');
      } else if (['80', '81', '82'].includes(prefix)) {
        setCity('Patna');
        setStateName('Bihar');
      } else {
        if (!city) setCity('City Center');
        if (!stateName) setStateName('India');
      }
    }
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your complete full name';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (pincode.length !== 6) {
      newErrors.pincode = 'Please enter a valid 6-digit postal pincode';
    }
    if (!address.trim() || address.trim().length < 8) {
      newErrors.address = 'Please enter house/flat number, road, and area';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (validateDetails()) {
      setActiveStep('payment');
    }
  };

  const handleExecutePayment = () => {
    setActiveStep('processing');
    const newOrderId = `FLIP-IND-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);

    setTimeout(() => {
      setActiveStep('success');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);
  };

  const handleReset = () => {
    setActiveStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm">
      <div className="w-full h-full max-w-md bg-white sm:h-[94vh] sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <img
              src="/images/naaptol_logo.png"
              alt="Naaptol"
              className="h-6 w-auto object-contain bg-white px-1.5 py-0.5 rounded"
            />
            <div>
              <p className="font-extrabold text-sm leading-tight">Naaptol Fast Checkout</p>
              <p className="text-[10px] text-slate-300">100% Secure Encrypted Online Payment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Container with single slim scrollbar */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1 slim-scrollbar overscroll-contain">
          {/* STEP 1: Details & Address */}
          {activeStep === 'details' && (
            <div className="space-y-4">
              {/* Product preview & color selector */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedColor.image}
                    alt={selectedColor.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-slate-900 line-clamp-1">
                      Naaptol 2 Sim Flip Phone With Camera (PMH1)
                    </p>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-black text-red-600 text-base">₹{totalPrice}</span>
                      <span className="text-xs text-slate-400 line-through">₹{originalTotal}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        Save ₹{totalSavings}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Selected: <strong className="text-slate-800">{selectedColor.name}</strong>
                    </p>
                  </div>
                </div>

                {/* 3 Color Selector inside checkout */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                    Select Your Phone Color:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRODUCT_COLORS.map(col => {
                      const isSelected = selectedColor.id === col.id;
                      return (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => onColorChange(col)}
                          className={`p-2 rounded-xl border-2 text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div
                            className="w-4 h-4 rounded-full mx-auto mb-1 border border-black/20"
                            style={{ backgroundColor: col.code }}
                          />
                          <p className="text-[10px] leading-tight font-bold">{col.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity option */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase">
                      Select Quantity:
                    </label>
                    <span className="text-[10px] font-bold text-emerald-700">Same Free Delivery</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(1)}
                      className={`p-2 rounded-xl border-2 text-center cursor-pointer transition-all ${
                        quantity === 1
                          ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold block">1 Phone</span>
                      <span className="text-[10px] text-slate-500">₹389</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuantity(2)}
                      className={`p-2 rounded-xl border-2 text-center cursor-pointer transition-all ${
                        quantity === 2
                          ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold block">2 Phones</span>
                      <span className="text-[10px] text-emerald-600 font-bold">₹749</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuantity(3)}
                      className={`p-2 rounded-xl border-2 text-center cursor-pointer transition-all ${
                        quantity === 3
                          ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold block">3 Phones</span>
                      <span className="text-[10px] text-emerald-600 font-bold">₹1,099</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* STRICT ONLINE PAYMENT NOTIFICATION */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] leading-snug">
                  <strong>Prepaid Online Payment Only:</strong>
                  <span className="block text-slate-700 mt-0.5">
                    Cash on Delivery is disabled at this discount price of ₹389. You will pay online via UPI, Google Pay, PhonePe, Paytm, or Debit Card in the next step.
                  </span>
                </div>
              </div>

              {/* Customer Delivery Details Form */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  Delivery Address Details
                </h3>

                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Customer Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {errors.fullName && (
                    <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Mobile Number (For Courier Call & SMS) *
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-xs font-bold text-slate-600">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full px-3 py-2.5 text-xs rounded-r-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.phone}</p>
                  )}
                </div>

                {/* Pincode & City/State */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={e => handlePincodeChange(e.target.value)}
                      placeholder="6-digit pincode"
                      maxLength={6}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-bold"
                    />
                    {errors.pincode && (
                      <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.pincode}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      City / State
                    </label>
                    <input
                      type="text"
                      value={city ? `${city}${stateName ? ', ' + stateName : ''}` : ''}
                      onChange={e => setCity(e.target.value)}
                      placeholder="City, State"
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    House / Flat No, Street & Locality *
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="E.g. House No. 42, Near Shiv Mandir, Main Market Road"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {errors.address && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-semibold">{errors.address}</p>
                  )}
                </div>

                {/* Landmark */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nearby Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={e => setLandmark(e.target.value)}
                    placeholder="E.g. Opposite Government Hospital or Near Bus Stand"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-3 bg-slate-100 rounded-xl space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Price ({quantity} item{quantity > 1 ? 's' : ''})</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Express All-India Delivery</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Online Payment Discount</span>
                  <span>APPLIED</span>
                </div>
                <div className="border-t border-slate-200 pt-1.5 flex justify-between font-extrabold text-sm text-slate-900">
                  <span>Total Amount Payable</span>
                  <span className="text-red-600">₹{totalPrice}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToPayment}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CONTINUE TO ONLINE PAYMENT (₹{totalPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Online Payment */}
          {activeStep === 'payment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveStep('details')}
                  className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  ← Edit Address
                </button>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Total to Pay</span>
                  <span className="text-base font-black text-red-600">₹{totalPrice}</span>
                </div>
              </div>

              {/* Strict No COD Reminder */}
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span className="text-[11px] font-semibold leading-tight">
                  Cash on Delivery is not supported. Please select an instant online payment mode below.
                </span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Choose Online Payment Mode:
                </label>

                {/* Option 1: Instant UPI Apps */}
                <div
                  onClick={() => setPaymentMethod('upi_app')}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'upi_app'
                      ? 'border-red-600 bg-red-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs">
                        UPI
                      </div>
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">
                          Instant UPI Apps
                        </p>
                        <p className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      FASTEST
                    </span>
                  </div>

                  {paymentMethod === 'upi_app' && (
                    <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                      <p className="text-[11px] font-semibold text-slate-600">Select your preferred UPI app:</p>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setUpiApp('phonepe')}
                          className={`p-2 rounded-xl border text-center text-xs font-bold ${
                            upiApp === 'phonepe'
                              ? 'border-purple-600 bg-purple-50 text-purple-800'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          PhonePe
                        </button>
                        <button
                          type="button"
                          onClick={() => setUpiApp('gpay')}
                          className={`p-2 rounded-xl border text-center text-xs font-bold ${
                            upiApp === 'gpay'
                              ? 'border-blue-600 bg-blue-50 text-blue-800'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          Google Pay
                        </button>
                        <button
                          type="button"
                          onClick={() => setUpiApp('paytm')}
                          className={`p-2 rounded-xl border text-center text-xs font-bold ${
                            upiApp === 'paytm'
                              ? 'border-sky-600 bg-sky-50 text-sky-800'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          Paytm
                        </button>
                      </div>

                      <div className="mt-2">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                          Or Enter Any UPI ID (e.g. mobile@upi / username@okhdfcbank)
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 2: Scan UPI QR Code */}
                <div
                  onClick={() => setPaymentMethod('upi_qr')}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'upi_qr'
                      ? 'border-red-600 bg-red-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-orange-100 text-orange-700">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-extrabold text-xs text-slate-900">Scan UPI QR Code</p>
                      <p className="text-[10px] text-slate-500">Scan & pay from any mobile banking / UPI app</p>
                    </div>
                  </div>

                  {paymentMethod === 'upi_qr' && (
                    <div className="mt-3 pt-3 border-t border-slate-200 text-center space-y-2">
                      <div className="p-3 bg-white rounded-xl border-2 border-dashed border-slate-300 inline-block">
                        <div className="w-36 h-36 bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-center text-white relative">
                          <QrCode className="w-28 h-28 text-white" />
                          <span className="text-[9px] font-mono text-amber-300">Amount: ₹{totalPrice}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium">
                        Open Google Pay, PhonePe, or Paytm camera and scan this QR to pay ₹{totalPrice}
                      </p>
                    </div>
                  )}
                </div>

                {/* Option 3: Debit / Credit Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-red-600 bg-red-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-extrabold text-xs text-slate-900">ATM / Debit / Credit Cards</p>
                      <p className="text-[10px] text-slate-500">RuPay, Visa, MasterCard, Maestro</p>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                      <input
                        type="text"
                        placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                        maxLength={19}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          maxLength={5}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength={4}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 4: Net Banking */}
                <div
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-red-600 bg-red-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-extrabold text-xs text-slate-900">Net Banking</p>
                      <p className="text-[10px] text-slate-500">SBI, HDFC, ICICI, Axis, PNB & All Indian Banks</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                onClick={handleExecutePayment}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>PAY ₹{totalPrice} & CONFIRM ORDER</span>
              </button>

              <p className="text-[10px] text-center text-slate-500">
                🔒 Protected by 256-Bit Bank-Grade SSL Encryption. Instant Order Confirmation.
              </p>
            </div>
          )}

          {/* STEP 3: Processing */}
          {activeStep === 'processing' && (
            <div className="py-12 px-4 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto" />
              <div>
                <h3 className="font-black text-base text-slate-900">Verifying Payment...</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connecting to secure payment gateway. Please do not refresh or press back.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 max-w-xs mx-auto">
                <p>Generating order confirmation and packaging slip...</p>
              </div>
            </div>
          )}

          {/* STEP 4: Success Confirmed */}
          {activeStep === 'success' && (
            <div className="py-6 px-2 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                  PAYMENT RECEIVED & ORDER CONFIRMED
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Order ID: <strong className="text-slate-900 font-mono">{orderId}</strong>
                </p>
              </div>

              {/* Order summary card */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Item:</span>
                  <span className="font-bold text-slate-900">Naaptol 2 Sim Flip Phone (PMH1)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Color Selected:</span>
                  <span className="font-bold text-slate-900">{selectedColor.name}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Quantity:</span>
                  <span className="font-bold text-slate-900">{quantity} Piece{quantity > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Amount Paid (Prepaid Online):</span>
                  <span className="font-extrabold text-emerald-700">₹{totalPrice} (FREE Delivery)</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 block mb-0.5">Shipping To:</span>
                  <p className="font-medium text-slate-800 leading-snug">
                    {fullName}, +91 {phone}<br />
                    {address}, {landmark && `${landmark}, `}{city}, {stateName} - {pincode}
                  </p>
                </div>
              </div>

              {/* Delivery notice */}
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-2 text-left">
                <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-[11px] leading-tight">
                  Dispatched within 24 hours. Expected delivery in <strong>2-4 days</strong> via Express Courier. Tracking updates sent to +91 {phone}.
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-black transition-all cursor-pointer"
                >
                  Done / Back to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
