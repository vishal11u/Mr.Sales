import React, { useState, useLayoutEffect, useCallback } from 'react';
import { XIcon } from './icons/XIcon';

export interface TourStep {
  selector: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
}

const TOUR_POPOVER_OFFSET = 12; // space between element and popover
const HIGHLIGHT_PADDING = 8; // padding around highlighted element

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ steps, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

  const step = steps[currentStep];

  const calculatePosition = useCallback(() => {
    if (!isOpen || !step) return;

    const targetElement = document.querySelector(step.selector);
    if (!targetElement) {
      // If element not found, center the popover (for intro steps without a target)
      setHighlightStyle({ display: 'none' });
      setPopoverStyle({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed',
        zIndex: 10001,
      });
      return;
    }
    
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    const rect = targetElement.getBoundingClientRect();
    
    // Calculate highlight position
    setHighlightStyle({
      position: 'fixed',
      top: rect.top - HIGHLIGHT_PADDING,
      left: rect.left - HIGHLIGHT_PADDING,
      width: rect.width + HIGHLIGHT_PADDING * 2,
      height: rect.height + HIGHLIGHT_PADDING * 2,
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
      borderRadius: '8px',
      transition: 'all 0.3s ease-in-out',
      zIndex: 10000,
      pointerEvents: 'none',
    });
    
    // Calculate popover position
    const popoverPos: React.CSSProperties = {
      position: 'fixed',
      zIndex: 10001,
      transition: 'all 0.3s ease-in-out',
    };
    
    const position = step.position || 'bottom';

    switch (position) {
      case 'top':
        popoverPos.top = rect.top - TOUR_POPOVER_OFFSET;
        popoverPos.left = rect.left + rect.width / 2;
        popoverPos.transform = 'translate(-50%, -100%)';
        break;
      case 'left':
        popoverPos.top = rect.top + rect.height / 2;
        popoverPos.left = rect.left - TOUR_POPOVER_OFFSET;
        popoverPos.transform = 'translate(-100%, -50%)';
        break;
      case 'right':
        popoverPos.top = rect.top + rect.height / 2;
        popoverPos.left = rect.right + TOUR_POPOVER_OFFSET;
        popoverPos.transform = 'translate(0, -50%)';
        break;
      case 'bottom':
      default:
        popoverPos.top = rect.bottom + TOUR_POPOVER_OFFSET;
        popoverPos.left = rect.left + rect.width / 2;
        popoverPos.transform = 'translate(-50%, 0)';
        break;
    }
    setPopoverStyle(popoverPos);

  }, [currentStep, isOpen, step]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    
    // Add a small delay for elements that might animate in
    const timer = setTimeout(calculatePosition, 100);
    window.addEventListener('resize', calculatePosition);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [calculatePosition, isOpen]);

  if (!isOpen || !step) {
    return null;
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <>
      <div className="fixed inset-0 bg-transparent z-[9999]"></div>
      <div style={highlightStyle} />
      <div
        style={popoverStyle}
        className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-2xl p-6 w-80 animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
      >
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-base-300 dark:hover:bg-dark-base-300 transition-colors" aria-label="Close tour">
          <XIcon className="w-5 h-5" />
        </button>
        <h3 id="tour-title" className="text-lg font-bold mb-2 text-content-100 dark:text-dark-content-100">{step.title}</h3>
        <p className="text-sm text-content-200 dark:text-dark-content-200">{step.content}</p>
        <div className="flex justify-between items-center mt-6">
          <span className="text-xs font-mono text-content-200 dark:text-dark-content-200">
            {currentStep + 1} / {steps.length}
          </span>
          <div className="space-x-2">
            {!isFirstStep && (
              <button onClick={handlePrev} className="text-sm px-3 py-1.5 rounded-md text-content-200 dark:text-dark-content-200 hover:bg-base-300 dark:hover:bg-dark-base-300 transition-colors">
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="text-sm font-semibold px-4 py-2 rounded-md bg-brand-primary dark:bg-dark-brand-primary text-base-100 dark:text-dark-base-100 hover:opacity-90 transition-opacity"
            >
              {isLastStep ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
