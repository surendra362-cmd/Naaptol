/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { UrgencyBar } from './components/UrgencyBar';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { FeaturesList } from './components/FeaturesList';
import { SpecificationsTable } from './components/SpecificationsTable';
import { CustomerReviews } from './components/CustomerReviews';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { StickyBottomBar } from './components/StickyBottomBar';
import { CheckoutModal } from './components/CheckoutModal';
import { PRODUCT_COLORS, ColorOption } from './data/productData';
import { PolicyPageType } from './components/PolicyModal';

// Lazy load Policy Modal on-demand only when a customer clicks a policy in the footer
const PolicyModal = lazy(() => import('./components/PolicyModal'));

export default function App() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(PRODUCT_COLORS[1]); // Royal Gold
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activePolicyPage, setActivePolicyPage] = useState<PolicyPageType | null>(null);

  const handleSelectColor = (color: ColorOption) => {
    setSelectedColor(color);
    setActiveIndex(color.galleryIndex);
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleOpenPolicy = (page: PolicyPageType) => {
    setActivePolicyPage(page);
  };

  const handleClosePolicy = () => {
    setActivePolicyPage(null);
  };

  const handleScrollToReviews = () => {
    const el = document.getElementById('customer-reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lock background scroll when checkout or policy modals are open
  React.useEffect(() => {
    if (isCheckoutOpen || activePolicyPage !== null) {
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
  }, [isCheckoutOpen, activePolicyPage]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between selection:bg-red-500 selection:text-white">
      {/* Centered Mobile App Shell - Instant First Contentful Paint for Ads Traffic */}
      <div className="w-full max-w-md mx-auto bg-white min-h-screen shadow-2xl flex flex-col relative pb-16">
        {/* Naaptol Header with Urgency Ticker & Fast Order button */}
        <Header
          onOrderClick={handleOpenCheckout}
          onRatingClick={handleScrollToReviews}
          onLogoClick={handleScrollToTop}
        />

        {/* Urgency & Scarcity Countdown Banner */}
        <UrgencyBar />

        <main className="flex-1">
          {/* Product Image Gallery with Real Naaptol Photos & Color Switcher */}
          <ProductGallery
            selectedColor={selectedColor}
            onSelectColor={handleSelectColor}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />

          {/* Pricing, Strict Online Payment Notice, Primary CTA */}
          <ProductInfo
            selectedColor={selectedColor}
            onOrderClick={handleOpenCheckout}
          />

          {/* Visual Feature Highlights */}
          <FeaturesList />

          {/* Detailed Hardware & Package Specifications Table */}
          <SpecificationsTable />

          {/* High-Performance Customer Reviews (Initial 5 on Home, On-demand 14,820) */}
          <CustomerReviews />

          {/* Frequently Asked Questions */}
          <FaqSection />
        </main>

        {/* Footer with Naaptol Branding, Seller Info & Policy Links */}
        <Footer onOpenPolicy={handleOpenPolicy} />

        {/* Mobile Sticky Buy Now Bottom Bar */}
        <StickyBottomBar
          selectedColor={selectedColor}
          onOrderClick={handleOpenCheckout}
        />

        {/* Fast Online Checkout Modal (Address + Online Payment Flow) */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          selectedColor={selectedColor}
          onColorChange={handleSelectColor}
        />

        {/* Lazy Loaded Policy Modal (Loads ONLY on user click, zero impact on home page load speed) */}
        {activePolicyPage && (
          <Suspense fallback={null}>
            <PolicyModal
              initialPage={activePolicyPage}
              onClose={handleClosePolicy}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
