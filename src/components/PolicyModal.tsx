import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Mail, Phone, MapPin, Truck, RefreshCw, FileText, ArrowLeft, Clock } from 'lucide-react';

export type PolicyPageType =
  | 'about'
  | 'refund'
  | 'return'
  | 'shipping'
  | 'cancellation'
  | 'privacy'
  | 'contact';

interface PolicyModalProps {
  initialPage: PolicyPageType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ initialPage, onClose }) => {
  const [currentPage, setCurrentPage] = useState<PolicyPageType>(initialPage);

  // Lock background scroll to prevent double sliders
  useEffect(() => {
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const navItems: { id: PolicyPageType; label: string }[] = [
    { id: 'about', label: 'About Us' },
    { id: 'refund', label: 'Refund Policy' },
    { id: 'return', label: 'Return Policy' },
    { id: 'shipping', label: 'Shipping Policy' },
    { id: 'cancellation', label: 'Cancellation Policy' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm">
      <div className="w-full h-full max-w-md bg-white sm:h-[94vh] sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <img
              src="/images/naaptol_logo.png"
              alt="Naaptol"
              className="h-6 w-auto object-contain bg-white px-1.5 py-0.5 rounded"
            />
            <span className="text-xs font-bold text-slate-300">Customer Support & Policies</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Pills Nav */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
          {navItems.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1 text-slate-700 text-xs leading-relaxed slim-scrollbar overscroll-contain">
          {/* ABOUT US */}
          {currentPage === 'about' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <h2 className="text-base font-black">About Naaptol Online</h2>
              </div>
              <p>
                Welcome to <strong>Naaptol</strong>, India’s trusted shopping destination for innovative, practical, and highly affordable electronics, household products, and mobile gadgets.
              </p>
              <p>
                Our mission is to bring high-utility technology directly to millions of Indian consumers at factory-direct, subsidised promotional rates. By removing middlemen and retail storefront markups, we deliver genuine products like our <strong>Naaptol 2 SIM Flip Phone</strong> straight to doorsteps nationwide.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5">
                <p className="font-bold text-slate-900 text-xs">Why Shop on Naaptol:</p>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                  <li>Direct factory clearance rates (upto 80% discount).</li>
                  <li>Free express doorstep delivery across 26,000+ Indian pincodes.</li>
                  <li>100% genuine sealed boxes with 1-year brand warranty.</li>
                  <li>256-bit safe and verified online payment gateways.</li>
                </ul>
              </div>
            </div>
          )}

          {/* REFUND POLICY */}
          {currentPage === 'refund' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <RefreshCw className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-black">Refund Policy</h2>
              </div>
              <p>
                At Naaptol, customer satisfaction is our highest priority. If you encounter any functional defect or issue with your purchase, you are fully protected by our 100% money-back guarantee.
              </p>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs">1. Refund Eligibility</h3>
                <p>
                  Refunds are issued if the product received is physically damaged in transit, fails to turn on, or does not match the specifications advertised on our portal.
                </p>

                <h3 className="font-bold text-slate-900 text-xs">2. Processing Timeline</h3>
                <p>
                  Once the return pickup is completed by our courier partner or upon verification of the defect, your full refund of <strong>₹389</strong> is initiated within 24 to 48 hours.
                </p>

                <h3 className="font-bold text-slate-900 text-xs">3. Mode of Refund</h3>
                <p>
                  Refunds are credited directly back to the original payment source:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                  <li><strong>UPI (GPay / PhonePe / Paytm):</strong> Instant to 24 hours.</li>
                  <li><strong>Debit / Credit Cards:</strong> 2 to 4 business banking days.</li>
                  <li><strong>Net Banking:</strong> 2 to 5 business days.</li>
                </ul>
              </div>
            </div>
          )}

          {/* RETURN POLICY */}
          {currentPage === 'return' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-black">7 Days Return & Replacement Policy</h2>
              </div>
              <p>
                Every Naaptol Dual SIM Flip Phone comes backed with our <strong>7 Days Hassle-Free Replacement Guarantee</strong> from the exact date of package delivery.
              </p>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs">How to Request a Replacement:</h3>
                <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-slate-700">
                  <li>Contact our customer care via email at <strong>support@naaptol.co.in</strong> or phone <strong>022-65867005</strong> within 7 days of receiving the phone.</li>
                  <li>Share your Order ID and a short photo or video showing the issue.</li>
                  <li>Our support team will arrange a free reverse pickup from your doorstep and immediately dispatch a brand-new sealed unit.</li>
                </ol>
                <p className="text-[11px] text-slate-500 italic mt-1">
                  Please keep original packaging box and accessories intact for smooth replacement.
                </p>
              </div>
            </div>
          )}

          {/* SHIPPING POLICY */}
          {currentPage === 'shipping' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <Truck className="w-5 h-5 text-red-600" />
                <h2 className="text-base font-black">Shipping & Delivery Policy</h2>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs font-bold">
                ✓ 100% Free Express Shipping All Over India (No Hidden Charges)
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs">1. Dispatch Time</h3>
                <p>
                  All confirmed orders are packed in secure tamper-proof boxes and dispatched within <strong>24 working hours</strong> from our central logistics hub in New Delhi.
                </p>

                <h3 className="font-bold text-slate-900 text-xs">2. Estimated Delivery Timelines</h3>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                  <li><strong>Metro Cities (Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad):</strong> 2 to 3 days.</li>
                  <li><strong>Rest of India (Tier 2 & Tier 3 Cities, Towns & Rural Districts):</strong> 3 to 5 business days.</li>
                </ul>

                <h3 className="font-bold text-slate-900 text-xs">3. Courier Partners</h3>
                <p>
                  We ship via premier national air couriers including BlueDart, Delhivery, XpressBees, and India Post Speed Post with full SMS tracking updates sent to your registered mobile number.
                </p>
              </div>
            </div>
          )}

          {/* CANCELLATION POLICY */}
          {currentPage === 'cancellation' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-black">Cancellation Policy</h2>
              </div>
              <p>
                We understand plans can change. You can request order cancellation quickly before the product leaves our warehouse:
              </p>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs">Cancellation Window:</h3>
                <p>
                  Cancellation requests are accepted within <strong>4 hours of order placement</strong> or before the tracking airway bill (AWB) is assigned.
                </p>
                <p>
                  To cancel, simply email <strong>support@naaptol.co.in</strong> with your Order ID or call <strong>022-65867005</strong>.
                </p>
                <p>
                  Upon cancellation approval, 100% of your paid amount (₹389) is refunded back to your bank account or UPI automatically without any cancellation deductions.
                </p>
              </div>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {currentPage === 'privacy' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-black">Privacy & Data Security Policy</h2>
              </div>
              <p>
                Naaptol respects and protects the confidentiality of your personal information.
              </p>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs">1. Information We Collect</h3>
                <p>
                  We collect customer name, 10-digit mobile number, and physical postal shipping address solely for courier delivery and SMS dispatch notifications.
                </p>

                <h3 className="font-bold text-slate-900 text-xs">2. Payment Security</h3>
                <p>
                  We never store your credit/debit card numbers, CVVs, or UPI PINs. All online payments are handled directly by RBI-licensed payment gateways over encrypted 256-bit SSL connections.
                </p>

                <h3 className="font-bold text-slate-900 text-xs">3. No Data Sharing</h3>
                <p>
                  We never sell, rent, or trade your contact information to any third-party marketing agencies.
                </p>
              </div>
            </div>
          )}

          {/* CONTACT US */}
          {currentPage === 'contact' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <Mail className="w-5 h-5 text-red-600" />
                <h2 className="text-base font-black">Contact Naaptol Customer Support</h2>
              </div>
              <p>
                Need assistance with your order, tracking, or replacement? Our dedicated Indian support executives are available 6 days a week.
              </p>

              <div className="space-y-2.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 text-xs">Customer Support Email</p>
                    <p className="text-red-700 font-semibold text-xs">support@naaptol.co.in</p>
                    <p className="text-[10px] text-slate-500">Replies within 4 working hours</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 text-xs">Helpline Phone Number</p>
                    <p className="text-slate-900 font-bold text-xs">022-65867005</p>
                    <p className="text-[10px] text-slate-500">Mon - Sat (9:30 AM to 7:30 PM IST)</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 text-xs">Registered Dispatch Warehouse & Seller</p>
                    <p className="text-slate-700 text-[11px] leading-snug">
                      Shri Traders Delhi DS (Naaptol Authorized DS)<br />
                      First Floor, 557/B, Gali No.2, West Guru Anand Nagar, Main Road, Near Sheetla Balloon Decoration Shop, Laxmi Nagar, East Delhi, New Delhi, Delhi - 110092
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Close Button */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">Naaptol Online Shopping</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Close & Back to Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
