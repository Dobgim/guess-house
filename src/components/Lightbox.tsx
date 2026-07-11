import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  captions?: string[];
}

const PLACEHOLDER_GRADIENTS = [
  'from-stone-600 to-stone-900',
  'from-emerald-700 to-emerald-950',
  'from-amber-700 to-amber-900',
  'from-slate-600 to-slate-900',
  'from-purple-700 to-purple-950',
  'from-rose-700 to-rose-950',
];

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  captions,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const grad = PLACEHOLDER_GRADIENTS[currentIndex % PLACEHOLDER_GRADIENTS.length];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            id="lightbox-close"
            onClick={onClose}
            className="absolute top-4 right-4 text-cream-light hover:text-gold z-10 p-2 rounded-full bg-charcoal/50 border border-gold/20 transition-all"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-cream-light/70 text-sm font-medium bg-charcoal/60 px-4 py-1.5 rounded-full border border-gold/15">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Prev Button */}
          <button
            id="lightbox-prev"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 text-cream-light hover:text-gold p-3 rounded-full bg-charcoal/60 border border-gold/15 hover:border-gold/50 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl max-h-[80vh] w-full mx-16 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`w-full h-[60vh] rounded-xl bg-gradient-to-br ${grad} flex items-end justify-center shadow-2xl border border-gold/15 overflow-hidden`}
            >
              <div className="p-6 text-center">
                <p className="font-serif text-cream-light/70 text-2xl italic">M&J Luxurious Apartment</p>
                <p className="text-cream-light/50 text-sm mt-1">Gallery Image {currentIndex + 1}</p>
              </div>
            </div>

            {/* Caption */}
            {captions && captions[currentIndex] && (
              <p className="mt-4 text-cream-light/80 text-sm text-center max-w-lg font-medium">
                {captions[currentIndex]}
              </p>
            )}
          </motion.div>

          {/* Next Button */}
          <button
            id="lightbox-next"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 text-cream-light hover:text-gold p-3 rounded-full bg-charcoal/60 border border-gold/15 hover:border-gold/50 transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); /* navigate */ }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-gold w-6' : 'bg-cream-light/40 hover:bg-cream-light/70'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
