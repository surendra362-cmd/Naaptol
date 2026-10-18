import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Smartphone,
  Truck,
  ArrowRight,
  AlertTriangle,
  Loader2,
  Download,
  Copy,
  Check,
  Clock,
  Upload,
  FileImage,
  RefreshCw,
  Camera,
  MapPin,
  User,
  ShoppingBag,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import { ColorOption, PRODUCT_COLORS } from '../data/productData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: ColorOption;
  onColorChange: (color: ColorOption) => void;
}

const UPI_ID = '97229722972@ybl';
const MERCHANT_NAME = 'Naaptol';

const INDIAN_STATES = [
  'Rajasthan',
  'Uttar Pradesh',
  'Maharashtra',
  'Delhi NCR',
  'Gujarat',
  'Madhya Pradesh',
  'Bihar',
  'Haryana',
  'Punjab',
  'West Bengal',
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'Andhra Pradesh',
  'Kerala',
  'Odisha',
  'Jharkhand',
  'Chhattisgarh',
  'Uttarakhand',
  'Himachal Pradesh',
  'Assam',
  'Other'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedColor,
  onColorChange,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeStep, setActiveStep] = useState<'details' | 'payment' | 'success'>('details');

  // Customer Delivery details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Rajasthan');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Payment Options: 'qr' or 'upi' (Customer selects either QR Code or UPI ID)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<'qr' | 'upi' | null>('qr');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [qrDownloaded, setQrDownloaded] = useState(false);
  const [appRedirectToast, setAppRedirectToast] = useState('');

  // 14-second Verification Countdown
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyCountdown, setVerifyCountdown] = useState(14);
  const [showScreenshotUpload, setShowScreenshotUpload] = useState(false);

  // Payment Screenshot Upload State
  const [screenshotData, setScreenshotData] = useState<string | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');
  const [screenshotError, setScreenshotError] = useState<string>('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [pdfDownloaded, setPdfDownloaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 5-minute Offer Timer
  const [offerSeconds, setOfferSeconds] = useState(300);

  // Final Order details
  const [orderId, setOrderId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [orderDate, setOrderDate] = useState('');

  // Single scrollbar lock on body
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

  // 5-minute countdown timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setOfferSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // 14-second Verification Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVerifying && verifyCountdown > 0) {
      timer = setTimeout(() => {
        setVerifyCountdown(prev => prev - 1);
      }, 1000);
    } else if (isVerifying && verifyCountdown === 0) {
      setIsVerifying(false);
      setShowScreenshotUpload(true);
      setTimeout(() => {
        const el = document.getElementById('payment-not-received-alert');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [isVerifying, verifyCountdown]);

  if (!isOpen) return null;

  // Price calculations
  const unitPrice = 389;
  const totalPrice = quantity === 1 ? unitPrice : quantity === 2 ? 749 : 1099;
  const originalTotal = 1999 * quantity;
  const totalSavings = originalTotal - totalPrice;

  // Formatted offer timer
  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return {
      minutes: String(mins).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0')
    };
  };

  // Auto-fill city/state based on pincode
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
        setStateName('Punjab');
      } else if (['45', '46', '47'].includes(prefix)) {
        setCity('Indore');
        setStateName('Madhya Pradesh');
      } else if (['80', '81', '82'].includes(prefix)) {
        setCity('Patna');
        setStateName('Bihar');
      }
    }
  };

  const validateAddress = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your complete full name (minimum 3 characters)';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (pincode.length !== 6) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    if (!address.trim() || address.trim().length < 6) {
      newErrors.address = 'Please enter complete house/flat number, street, and area';
    }
    if (!city.trim()) {
      newErrors.city = 'Please enter your city/district';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      setActiveStep('payment');
    }
  };

  // Copy UPI ID to clipboard
  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Download Payment QR Code
  const handleDownloadQr = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/qr-code.png');
      if (!res.ok) throw new Error('Fetch failed');
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Naaptol_Payment_QR.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
      setQrDownloaded(true);
      setTimeout(() => setQrDownloaded(false), 3000);
    } catch {
      const link = document.createElement('a');
      link.href = '/qr-code.png';
      link.download = 'Naaptol_Payment_QR.png';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setQrDownloaded(true);
      setTimeout(() => setQrDownloaded(false), 3000);
    }
  };

  // UPI deep links
  const noteText = encodeURIComponent(`Naaptol Flip Phone ${selectedColor.name}`);
  const upiQuery = `pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${totalPrice}&cu=INR&tn=${noteText}`;
  const androidIntentUniversal = `intent://pay?${upiQuery}#Intent;scheme=upi;end`;
  const universalUpiUrl = `upi://pay?${upiQuery}`;

  const UPI_APPS = [
    {
      id: 'phonepe',
      name: 'PhonePe',
      androidIntent: `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.phonepe.app;end`,
      iosScheme: `phonepe://pay?${upiQuery}`,
      bgColor: 'bg-[#5f259f]',
      iconLetter: 'Pe'
    },
    {
      id: 'gpay',
      name: 'Google Pay',
      androidIntent: `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`,
      iosScheme: `gpay://upi/pay?${upiQuery}`,
      bgColor: 'bg-[#1a73e8]',
      iconLetter: 'G'
    },
    {
      id: 'paytm',
      name: 'Paytm',
      androidIntent: `intent://pay?${upiQuery}#Intent;scheme=upi;package=net.one97.paytm;end`,
      iosScheme: `paytmmp://pay?${upiQuery}`,
      bgColor: 'bg-[#002e6e]',
      iconLetter: 'Pay'
    },
    {
      id: 'bhim',
      name: 'BHIM UPI',
      androidIntent: `intent://pay?${upiQuery}#Intent;scheme=upi;package=in.org.npci.upiapp;end`,
      iosScheme: `bhim://pay?${upiQuery}`,
      bgColor: 'bg-[#005b9f]',
      iconLetter: 'BHIM'
    }
  ];

  const handleOpenUpiApp = (app: typeof UPI_APPS[0]) => {
    const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
    const isIos = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    setAppRedirectToast(`Opening ${app.name}... Please authorize ₹${totalPrice}`);
    setTimeout(() => setAppRedirectToast(''), 4000);

    if (isAndroid) {
      const a = document.createElement('a');
      a.href = app.androidIntent;
      a.target = '_top';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => {
        try {
          const fallback = document.createElement('a');
          fallback.href = universalUpiUrl;
          fallback.target = '_top';
          document.body.appendChild(fallback);
          fallback.click();
          document.body.removeChild(fallback);
        } catch {
          // ignore
        }
      }, 1200);
      return;
    }

    if (isIos) {
      const a = document.createElement('a');
      a.href = app.iosScheme;
      a.target = '_top';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // Desktop: copy UPI ID and show alert
    handleCopyUpi();
  };

  const handleOpenUniversalUpi = (e: React.MouseEvent) => {
    e.preventDefault();
    const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
    const isIos = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    setAppRedirectToast(`Opening UPI App... Please authorize ₹${totalPrice}`);
    setTimeout(() => setAppRedirectToast(''), 4000);

    if (isAndroid) {
      const a = document.createElement('a');
      a.href = androidIntentUniversal;
      a.target = '_top';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    if (isIos) {
      const a = document.createElement('a');
      a.href = universalUpiUrl;
      a.target = '_top';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    handleCopyUpi();
  };

  // Start 14s Verification Countdown
  const handleStartVerification = () => {
    setIsVerifying(true);
    setVerifyCountdown(14);
  };

  // Screenshot File Upload Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setScreenshotError('Please upload an image file (JPG, PNG, WebP) only.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setScreenshotError('File size must be less than 15MB.');
      return;
    }

    setScreenshotError('');
    setScreenshotFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Final confirmation after screenshot uploaded
  const handleFinalConfirmOrder = () => {
    if (!screenshotData) {
      setScreenshotError('Please upload your payment screenshot first.');
      return;
    }

    setIsSubmittingOrder(true);
    const generatedOrderId = `NT-${Math.floor(100000 + Math.random() * 900000)}`;
    const generatedTxnId = `TXN${Date.now().toString().slice(-9)}`;
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    setOrderId(generatedOrderId);
    setTransactionId(generatedTxnId);
    setOrderDate(today);

    setTimeout(() => {
      setIsSubmittingOrder(false);
      setActiveStep('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);
  };

  // PDF Generator for Order Details
  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF();

      // Brand Header Banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, 210, 32, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('NAAPTOL - OFFICIAL ORDER INVOICE', 14, 16);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(203, 213, 225);
      doc.text('Website: https://naaptol.co.in | Customer Support: care@naaptol.co.in', 14, 25);

      // Status Badge
      doc.setFillColor(220, 38, 38); // Red
      doc.roundedRect(150, 8, 48, 16, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('PAID & CONFIRMED', 154, 18);

      // Invoice Details Block
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('ORDER & INVOICE DETAILS', 14, 44);

      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(14, 47, 196, 47);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text('Order ID:', 14, 55);
      doc.text('Order Date:', 14, 62);
      doc.text('Transaction Ref:', 14, 69);
      doc.text('Payment Mode:', 14, 76);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(orderId || 'NT-829104', 55, 55);
      doc.text(orderDate || new Date().toLocaleDateString('en-IN'), 55, 62);
      doc.text(transactionId || 'TXN102938475', 55, 69);
      doc.text(`Prepaid Online UPI (${UPI_ID})`, 55, 76);

      // Customer Shipping Details Block
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('SHIPPING & DELIVERY ADDRESS', 110, 44);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text('Customer Name:', 110, 55);
      doc.text('Contact Mobile:', 110, 62);
      doc.text('Address:', 110, 69);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(fullName || 'Valued Customer', 145, 55);
      doc.text(`+91 ${phone || '9876543210'}`, 145, 62);

      doc.setFont('helvetica', 'normal');
      const addressLines = doc.splitTextToSize(
        `${address || 'Home Delivery'}, ${landmark ? landmark + ', ' : ''}${city || ''}, ${stateName || 'India'} - ${pincode || ''}`,
        50
      );
      doc.text(addressLines, 145, 69);

      // Item Table Header
      let yPos = 92;
      doc.setFillColor(241, 245, 249);
      doc.rect(14, yPos, 182, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text('Item Description', 18, yPos + 5.5);
      doc.text('Color', 105, yPos + 5.5);
      doc.text('Qty', 135, yPos + 5.5);
      doc.text('Unit Price', 150, yPos + 5.5);
      doc.text('Total', 178, yPos + 5.5);

      // Item Table Row
      yPos += 12;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text('Naaptol 2 Sim Flip Phone With Camera (PMH1)', 18, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(selectedColor.name, 105, yPos);
      doc.text(String(quantity), 138, yPos);
      doc.text('Rs. 389', 150, yPos);
      doc.setFont('helvetica', 'bold');
      doc.text(`Rs. ${totalPrice}`, 178, yPos);

      yPos += 5;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      doc.text('Dual SIM, Digital Camera, 4 Languages, 1800mAh Battery, Flash Alert', 18, yPos);

      // Table Separator
      yPos += 8;
      doc.setDrawColor(226, 232, 240);
      doc.line(14, yPos, 196, yPos);

      // Financials Summary
      yPos += 8;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text('Subtotal:', 140, yPos);
      doc.text(`Rs. ${totalPrice}`, 178, yPos);

      yPos += 6;
      doc.text('Shipping & Handling:', 140, yPos);
      doc.setTextColor(22, 101, 52); // green
      doc.text('FREE (Rs. 0)', 175, yPos);

      yPos += 6;
      doc.setTextColor(71, 85, 105);
      doc.text('Prepaid Discount:', 140, yPos);
      doc.setTextColor(22, 101, 52);
      doc.text('APPLIED', 177, yPos);

      yPos += 8;
      doc.setFillColor(248, 250, 252);
      doc.rect(135, yPos - 5, 61, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(220, 38, 38);
      doc.text('Total Paid:', 140, yPos + 2);
      doc.text(`Rs. ${totalPrice}`, 174, yPos + 2);

      // Delivery & Warranty Guarantee Box
      yPos += 22;
      doc.setFillColor(238, 242, 255);
      doc.roundedRect(14, yPos, 182, 34, 3, 3, 'F');
      doc.setDrawColor(199, 210, 254);
      doc.roundedRect(14, yPos, 182, 34, 3, 3, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 58, 138);
      doc.text('EXPRESS DISPATCH & WARRANTY GUARANTEE', 18, yPos + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      doc.text('• Dispatch: Parcel will be packed and dispatched within 24 hours via Express Courier.', 18, yPos + 15);
      doc.text('• Estimated Delivery: Delivery to your doorstep in 2 to 4 working days.', 18, yPos + 21);
      doc.text('• Manufacturer Warranty: 1-Year National Warranty covering all manufacturing defects.', 18, yPos + 27);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        'Thank you for shopping with Naaptol. This is a computer generated tax invoice and requires no signature.',
        14,
        280
      );

      doc.save(`Naaptol_Order_Receipt_${orderId || 'Order'}.pdf`);
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 4000);
    } catch (err) {
      console.error('PDF generation error:', err);
      window.print();
    }
  };

  const handleResetAndClose = () => {
    setActiveStep('details');
    setIsVerifying(false);
    setShowScreenshotUpload(false);
    setScreenshotData(null);
    setScreenshotFileName('');
    setScreenshotError('');
    setOrderId('');
    setTransactionId('');
    setOrderDate('');
    setPdfDownloaded(false);
    setIsSubmittingOrder(false);
    setVerifyCountdown(14);
    setErrors({});
    onClose();
  };

  const timerObj = formatTimer(offerSeconds);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md">
      <div className="w-full h-full max-w-md bg-white sm:h-[94vh] sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between flex-shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/naaptol_logo.png"
              alt="Naaptol"
              className="h-6 w-auto object-contain bg-white px-1.5 py-0.5 rounded shadow-xs"
            />
            <div>
              <p className="font-extrabold text-xs sm:text-sm leading-tight text-white flex items-center gap-1">
                Naaptol Official Checkout
              </p>
              <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                100% Safe Online Payment Portal
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close checkout and return to home page"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body - single slim scrollbar */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1 slim-scrollbar overscroll-contain bg-slate-50">
          {/* ================= STEP 1: ADDRESS & COLOR SELECTION ================= */}
          {activeStep === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              {/* Product preview & color switcher */}
              <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedColor.image}
                    alt={selectedColor.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-slate-50"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-slate-900 line-clamp-1">
                      Naaptol 2 Sim Flip Phone (PMH1)
                    </p>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-black text-red-600 text-base">₹{totalPrice}</span>
                      <span className="text-xs text-slate-400 line-through">₹{originalTotal}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Save ₹{totalSavings}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Color: <strong className="text-slate-800">{selectedColor.name}</strong>
                    </p>
                  </div>
                </div>

                {/* 3 Color Selector inside checkout */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                    Select Your Mobile Color:
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
                              ? 'border-red-600 bg-red-50 text-red-700 font-bold shadow-xs'
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

                {/* Quantity selector */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase">
                      Select Quantity:
                    </label>
                    <span className="text-[10px] font-bold text-emerald-700">Free All-India Delivery</span>
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

              {/* Strict Online Payment Reminder */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2 shadow-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] leading-snug">
                  <strong>Strictly Online Payment Only (No COD):</strong>
                  <span className="block text-slate-700 mt-0.5">
                    Cash on delivery is disabled at ₹389. You will pay online via official UPI ID or Scanner QR Code in the next step.
                  </span>
                </div>
              </div>

              {/* Delivery Address Form */}
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  Step 1: Enter Delivery Address
                </h3>

                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Customer Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar Sharma"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.fullName}</p>
                  )}
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Mobile Number (10 Digits) *
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-xs font-bold text-slate-600">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full px-3 py-2 text-xs rounded-r-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-bold bg-white"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Full Delivery Address (House No, Street, Colony) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="e.g. Flat 301, Sunshine Heights, Near Bus Stand, Main Road"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  />
                  {errors.address && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-semibold">{errors.address}</p>
                  )}
                </div>

                {/* City & Pincode & State */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={e => handlePincodeChange(e.target.value)}
                      placeholder="6-digit pincode"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-bold bg-white"
                    />
                    {errors.pincode && (
                      <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.pincode}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="e.g. Jaipur"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    />
                    {errors.city && (
                      <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    State
                  </label>
                  <select
                    value={stateName}
                    onChange={e => setStateName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  >
                    {INDIAN_STATES.map(st => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nearby Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={e => setLandmark(e.target.value)}
                    placeholder="e.g. Opp. Govt Hospital or Near Shiv Mandir"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700 shadow-xs">
                <div className="flex justify-between">
                  <span>Price ({quantity} Mobile{quantity > 1 ? 's' : ''})</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Express All-India Delivery</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Special Launch Discount</span>
                  <span>APPLIED</span>
                </div>
                <div className="border-t border-slate-200 pt-1.5 flex justify-between font-extrabold text-sm text-slate-900">
                  <span>Total Amount to Pay</span>
                  <span className="text-red-600 font-black text-base">₹{totalPrice}</span>
                </div>
              </div>

              {/* Continue to Payment button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:brightness-110 active:scale-98 text-white font-black text-sm shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>CONTINUE TO ONLINE PAYMENT (₹{totalPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ================= STEP 2: ONLINE PAYMENT (2 OPTIONS: QR CODE or UPI ID) ================= */}
          {activeStep === 'payment' && (
            <div className="space-y-4">
              {/* Back to Address & Summary */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveStep('details')}
                    className="text-xs text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>← Edit Delivery Address</span>
                  </button>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    Step 2 of 2
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="text-left min-w-0">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Order Summary</span>
                    <h4 className="font-extrabold text-xs text-slate-900 truncate">
                      {quantity}x Naaptol Flip Phone ({selectedColor.name})
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      Deliver to: {fullName || 'Customer'}, {city} ({pincode})
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] text-slate-400 block font-bold">Total Payable</span>
                    <span className="text-xl font-black text-red-600">₹{totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Special Online Price Countdown Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-400/50 rounded-2xl p-3 text-white shadow-md flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">
                      Special Online Price: <span className="text-amber-300 font-black">₹{totalPrice}</span> Locked
                    </p>
                    <p className="text-[10px] text-slate-300">Complete payment before timer expires</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-xl border border-amber-400/40 text-amber-300 font-mono font-bold text-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{timerObj.minutes}:{timerObj.seconds}</span>
                </div>
              </div>

              {/* 2 Payment Options Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-red-600" />
                    Select Online Payment Option:
                  </label>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Tap to View
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Option 1: Pay via QR Code */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentOption(prev => (prev === 'qr' ? null : 'qr'))}
                    className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1 cursor-pointer shadow-xs ${
                      selectedPaymentOption === 'qr'
                        ? 'bg-gradient-to-b from-purple-50 to-white border-purple-600 text-purple-900 ring-2 ring-purple-600/30'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-black shadow-md">
                      <QrCode className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-black leading-tight">
                      1. Pay via QR Code
                    </span>
                    <span className="text-[10px] font-bold text-purple-700">
                      {selectedPaymentOption === 'qr' ? '▲ Tap to Hide QR' : `▼ Tap to View QR (₹${totalPrice})`}
                    </span>
                  </button>

                  {/* Option 2: Pay via UPI ID */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentOption(prev => (prev === 'upi' ? null : 'upi'))}
                    className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1 cursor-pointer shadow-xs ${
                      selectedPaymentOption === 'upi'
                        ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-600 text-emerald-900 ring-2 ring-emerald-600/30'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#0c2e1f] border border-emerald-500/60 flex items-center justify-center text-emerald-400 font-black shadow-md">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-black leading-tight">
                      2. Pay via UPI ID
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700">
                      {selectedPaymentOption === 'upi' ? '▲ Tap to Hide ID' : '▼ Tap to View UPI ID'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Toast message if app is opened */}
              {appRedirectToast && (
                <div className="p-2 rounded-xl bg-purple-900 text-white text-xs font-bold text-center animate-pulse shadow-md flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                  <span>{appRedirectToast}</span>
                </div>
              )}

              {/* OPTION 1 CONTENT: QR CODE VIEW */}
              {selectedPaymentOption === 'qr' && (
                <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 text-center shadow-md space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#5f259f] flex items-center justify-center text-white text-xs">
                      <QrCode className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Scan & Pay via QR Code (₹{totalPrice})
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Scan this QR code using PhonePe, Google Pay, Paytm, CRED or any UPI app:
                  </p>

                  {/* QR Image Box */}
                  <div className="relative inline-block max-w-[260px] sm:max-w-[280px] mx-auto rounded-2xl overflow-hidden border-2 border-slate-900 shadow-xl bg-black p-2">
                    <img
                      src="/qr-code.png"
                      alt="Naaptol Payment QR Code"
                      onError={e => {
                        const target = e.currentTarget;
                        if (!target.src.includes('public/images/qr-code.png')) {
                          target.src = '/public/images/qr-code.png';
                        }
                      }}
                      className="w-full h-auto object-contain rounded-xl mx-auto"
                    />
                    <div className="bg-slate-900 py-1.5 px-3 mt-1.5 rounded-lg border border-slate-700 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400">UPI ID:</span>
                      <span className="font-mono font-bold text-amber-300 text-xs">{UPI_ID}</span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="text-xs text-amber-400 hover:text-white p-1 cursor-pointer"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* QR Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto">
                    <button
                      type="button"
                      onClick={handleOpenUniversalUpi}
                      className="w-full sm:w-auto flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#5f259f] to-[#7b2cbf] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4 text-white" />
                      <span>📱 Open UPI App on Mobile (₹{totalPrice})</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadQr}
                      className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 cursor-pointer border border-slate-700"
                    >
                      {qrDownloaded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>QR Code Saved ✓</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-amber-300" />
                          <span>Download QR Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick UPI App Icons */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-600 mb-2">
                      Or tap your UPI app to pay directly:
                    </p>
                    <div className="grid grid-cols-4 gap-1.5 max-w-xs mx-auto">
                      {UPI_APPS.map(app => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => handleOpenUpiApp(app)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex flex-col items-center gap-1 text-[10px] font-bold text-slate-800 cursor-pointer transition-all active:scale-95"
                        >
                          <div
                            className={`w-7 h-7 rounded-full ${app.bgColor} text-white font-black text-xs flex items-center justify-center shadow-xs`}
                          >
                            {app.iconLetter}
                          </div>
                          <span>{app.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* OPTION 2 CONTENT: UPI ID VIEW */}
              {selectedPaymentOption === 'upi' && (
                <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 text-left shadow-md space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs">
                      <Smartphone className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Pay via Official UPI ID
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    Copy our verified UPI ID below and pay using any UPI app (PhonePe, Google Pay, Paytm, BHIM):
                  </p>

                  {/* UPI Box */}
                  <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-2xl p-3.5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">
                        Official PhonePe / BHIM UPI ID:
                      </span>
                      <span className="font-mono text-lg font-black text-amber-300 block select-all tracking-wider">
                        {UPI_ID}
                      </span>
                      <span className="text-[11px] text-emerald-400 block mt-0.5 font-medium">
                        ✓ Recipient: <strong>Naaptol Store</strong> • Amount to Pay: <strong>₹{totalPrice}</strong>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shrink-0 cursor-pointer"
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-4 h-4 text-slate-950" />
                          <span>Copied ✓</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-950" />
                          <span>Copy UPI ID</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick UPI App Icons */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-600 mb-2">
                      Or tap your UPI app to open directly:
                    </p>
                    <div className="grid grid-cols-4 gap-1.5 max-w-xs mx-auto">
                      {UPI_APPS.map(app => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => handleOpenUpiApp(app)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex flex-col items-center gap-1 text-[10px] font-bold text-slate-800 cursor-pointer transition-all active:scale-95"
                        >
                          <div
                            className={`w-7 h-7 rounded-full ${app.bgColor} text-white font-black text-xs flex items-center justify-center shadow-xs`}
                          >
                            {app.iconLetter}
                          </div>
                          <span>{app.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 14-Second Verification Progress State */}
              {isVerifying && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400 text-center shadow-2xl text-white space-y-3 animate-in fade-in duration-200">
                  <div className="relative w-12 h-12 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-amber-400/30 animate-ping" />
                    <div className="w-12 h-12 rounded-full border-4 border-t-emerald-400 border-r-amber-400 border-b-transparent border-l-transparent animate-spin flex items-center justify-center bg-black/40">
                      <Loader2 className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>

                  <span className="inline-block bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                    Verifying with Bank / UPI Gateway
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-white">
                    Checking Payment Status for ₹{totalPrice}...
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                    Connecting to PhonePe / Bank Server to verify your payment. Please wait...
                  </p>

                  <div className="max-w-xs mx-auto space-y-1.5">
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-white/10 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400 h-2.5 rounded-full transition-all duration-1000"
                        style={{ width: `${((14 - verifyCountdown) / 14) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
                      <span>Verifying...</span>
                      <span className="text-amber-300 font-bold">{verifyCountdown}s remaining</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pulsing Green Button: "Pay ₹389 & Confirm Order" */}
              {!showScreenshotUpload && !isVerifying && (
                <div className="pt-2">
                  <div className="animate-bounce">
                    <button
                      type="button"
                      onClick={handleStartVerification}
                      className="cursor-pointer w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:brightness-110 active:scale-98 text-white font-black text-base shadow-[0_10px_30px_rgba(16,185,129,0.5)] border-2 border-emerald-300/80 flex flex-col items-center justify-center transition-all"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                        <span className="tracking-wide">Pay ₹{totalPrice} & Confirm Order</span>
                      </div>
                      <span className="text-xs text-emerald-100 font-semibold mt-0.5">
                        Instant Online Order Booking
                      </span>
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-slate-500 mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Safe & Secure • Instant booking with SMS & Invoice confirmation</span>
                  </p>
                </div>
              )}

              {/* SCREENSHOT UPLOAD SECTION (Appears after 14s verification finishes) */}
              {showScreenshotUpload && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  {/* Red Alert Box */}
                  <div
                    id="payment-not-received-alert"
                    className="bg-gradient-to-b from-red-950 via-red-900 to-slate-950 border-2 border-red-500/90 rounded-2xl p-4 shadow-xl text-center text-white space-y-1.5"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center mx-auto text-red-400">
                      <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                    </div>
                    <span className="inline-block bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                      Automatic Verification Incomplete
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-red-200">
                      Not Received Your Payment, Please Upload Your Payment Screenshot
                    </h3>
                    <p className="text-xs text-slate-200 max-w-sm mx-auto leading-relaxed">
                      Payment verification pending. Please upload your payment confirmation screenshot below to instantly confirm your order.
                    </p>
                  </div>

                  {/* Upload Card */}
                  <div className="bg-white border-2 border-amber-400 rounded-2xl p-4 shadow-xl space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 rounded-full font-black text-xs uppercase shadow-xs">
                        <Upload className="w-3.5 h-3.5 text-slate-950" />
                        <span>Upload Payment Screenshot</span>
                      </div>
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-200">
                        Required to Confirm
                      </span>
                    </div>

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="payment-screenshot-file"
                    />

                    {/* Screenshot Preview or Upload Button */}
                    {screenshotData ? (
                      <div className="flex flex-col items-center justify-center text-center py-2 space-y-2">
                        <div className="relative">
                          <img
                            src={screenshotData}
                            alt="Payment Receipt Preview"
                            className="max-h-52 max-w-full rounded-xl border-2 border-emerald-500 shadow-md object-contain bg-slate-900 p-1"
                          />
                          <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 shadow-md">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Screenshot Attached ✓</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                          <FileImage className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-[200px] font-bold text-xs">
                            {screenshotFileName || 'Payment_Screenshot.png'}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 py-1.5 px-3 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Change / Upload Different Screenshot</span>
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer flex flex-col items-center justify-center py-6 px-3 text-center border-2 border-dashed border-amber-400 hover:border-amber-500 rounded-2xl bg-amber-50/50 hover:bg-amber-50 transition-all group"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow-sm group-hover:scale-105 transition-transform mb-2">
                          <Camera className="w-7 h-7 text-amber-700" />
                        </div>
                        <h4 className="font-black text-slate-900 text-sm mb-1">
                          Upload Payment Receipt Screenshot <span className="text-red-500">*</span>
                        </h4>
                        <p className="text-xs text-slate-600 max-w-xs mx-auto mb-3">
                          Upload your PhonePe, Google Pay or Paytm payment receipt screenshot from your phone gallery.
                        </p>

                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all"
                        >
                          <Camera className="w-4 h-4" />
                          <span>CHOOSE FROM GALLERY / PHOTOS</span>
                        </button>
                        <span className="text-[10px] text-slate-500 mt-2">
                          ✓ Supports JPG, PNG, WebP (Max 15MB)
                        </span>
                      </div>
                    )}

                    {screenshotError && (
                      <p className="text-red-600 text-xs font-bold text-center bg-red-50 p-2 rounded-xl border border-red-200">
                        {screenshotError}
                      </p>
                    )}

                    {/* Final Confirm Button */}
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        disabled={!screenshotData || isSubmittingOrder}
                        onClick={screenshotData ? handleFinalConfirmOrder : undefined}
                        className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all text-sm font-black shadow-xl ${
                          screenshotData && !isSubmittingOrder
                            ? 'cursor-pointer bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:brightness-110 active:scale-98 text-white animate-pulse shadow-emerald-600/30 ring-4 ring-emerald-400/20'
                            : 'cursor-not-allowed bg-slate-200 text-slate-400 border border-slate-300'
                        }`}
                      >
                        {isSubmittingOrder ? (
                          <>
                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                            <span>Confirming Order...</span>
                          </>
                        ) : screenshotData ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-white" />
                            <span>Confirm Order (Paid ₹{totalPrice}) →</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4 text-slate-400" />
                            <span>Please Upload Screenshot of Payment</span>
                          </>
                        )}
                      </button>

                      {screenshotData ? (
                        <p className="text-center text-xs text-emerald-700 mt-2 font-bold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Screenshot attached! Click the green button above to confirm your order.</span>
                        </p>
                      ) : (
                        <p className="text-center text-xs text-amber-700 mt-2 font-medium flex items-center justify-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          <span>Please upload your payment screenshot above to unlock the confirm button.</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 3: ORDER SUCCESS CONFIRMED ================= */}
          {activeStep === 'success' && (
            <div className="py-4 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase border border-emerald-300">
                  PAYMENT RECEIVED & ORDER CONFIRMED
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                  Thank You! Your Order is Booked
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Order ID: <strong className="text-slate-900 font-mono">{orderId}</strong> • {orderDate}
                </p>
              </div>

              {/* Order Receipt Details */}
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-left space-y-2 text-xs shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Phone Model:</span>
                  <span className="font-bold text-slate-900">Naaptol 2 Sim Flip Phone (PMH1)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Selected Color:</span>
                  <span className="font-bold text-slate-900">{selectedColor.name}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Quantity:</span>
                  <span className="font-bold text-slate-900">{quantity} Piece{quantity > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-black text-emerald-700 text-sm">₹{totalPrice} (FREE Shipping)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="font-bold text-slate-900">
                    {selectedPaymentOption === 'qr' ? 'QR Code Scan' : 'Official UPI ID'} ({UPI_ID})
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Transaction Ref:</span>
                  <span className="font-mono text-slate-700">{transactionId}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 block mb-0.5">Shipping Address:</span>
                  <p className="font-medium text-slate-800 leading-snug">
                    {fullName}, +91 {phone}<br />
                    {address}, {landmark ? `${landmark}, ` : ''}{city}, {stateName} - {pincode}
                  </p>
                </div>

                {/* Attached Screenshot preview */}
                {screenshotData && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-500 block mb-1 text-[11px]">Payment Proof Attached:</span>
                    <img
                      src={screenshotData}
                      alt="Payment Proof"
                      className="h-20 w-auto rounded-lg border border-emerald-400 object-contain bg-slate-900 p-0.5 shadow-xs"
                    />
                  </div>
                )}
              </div>

              {/* Courier Delivery Notice */}
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-2 text-left">
                <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-[11px] leading-tight">
                  Dispatched within 24 hours. Expected delivery in <strong>2-4 days</strong> via Express Courier. Tracking updates sent to +91 {phone}.
                </span>
              </div>

              {/* PDF DOWNLOAD BUTTON (User explicit request) */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:brightness-110 active:scale-98 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/30 transition-all border border-red-500"
                >
                  {pdfDownloaded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>PDF Invoice Downloaded Successfully ✓</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 text-white" />
                      <Download className="w-4 h-4 text-white" />
                      <span>DOWNLOAD ORDER DETAILS (PDF INVOICE)</span>
                    </>
                  )}
                </button>

                {/* Back to store button */}
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white font-black text-xs hover:bg-black transition-all cursor-pointer shadow-md"
                >
                  DONE / BACK TO STORE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
