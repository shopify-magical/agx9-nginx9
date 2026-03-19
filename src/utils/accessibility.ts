/**
 * WCAG 2.1 Accessibility utilities for mobile devices
 */

import { ref } from 'vue';

// WCAG 2.1 compliance checker
export class AccessibilityChecker {
  private violations: AccessibilityViolation[] = [];
  
  constructor(private element: HTMLElement) {}

  // Check all accessibility criteria
  checkAll(): AccessibilityViolation[] {
    this.violations = [];
    
    this.checkColorContrast();
    this.checkTouchTargets();
    this.checkKeyboardNavigation();
    this.checkScreenReaderSupport();
    this.checkFocusManagement();
    this.checkAltText();
    this.checkFormLabels();
    this.checkHeadingStructure();
    this.checkLanguageDeclaration();
    
    return this.violations;
  }

  // Check color contrast (WCAG 1.4.3)
  private checkColorContrast() {
    const elements = this.element.querySelectorAll('*');
    
    elements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        const ratio = this.calculateContrastRatio(color, backgroundColor);
        
        if (ratio < 4.5) {
          this.addViolation({
            type: 'color-contrast',
            severity: 'high',
            element: element as HTMLElement,
            message: `Low contrast ratio: ${ratio.toFixed(2)}:1 (minimum 4.5:1 required)`,
            wcagCriterion: '1.4.3'
          });
        }
      }
    });
  }

  // Check touch target sizes (WCAG 2.5.5)
  private checkTouchTargets() {
    const interactiveElements = this.element.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], [onclick]'
    );
    
    interactiveElements.forEach(element => {
      const rect = (element as HTMLElement).getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const minSize = 44; // 44px minimum for touch targets
      
      if (width < minSize || height < minSize) {
        this.addViolation({
          type: 'touch-target',
          severity: 'medium',
          element: element as HTMLElement,
          message: `Touch target too small: ${width}x${height}px (minimum 44x44px required)`,
          wcagCriterion: '2.5.5'
        });
      }
    });
  }

  // Check keyboard navigation (WCAG 2.1.1)
  private checkKeyboardNavigation() {
    const focusableElements = this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
      const styles = window.getComputedStyle(element);
      
      if (styles.display === 'none' || styles.visibility === 'hidden') {
        return;
      }
      
      // Check if element has visible focus indicator
      const hasFocusStyle = 
        styles.outline !== 'none' ||
        styles.boxShadow !== 'none' ||
        element.getAttribute('data-focus-visible') !== null;
      
      if (!hasFocusStyle) {
        this.addViolation({
          type: 'keyboard-navigation',
          severity: 'medium',
          element: element as HTMLElement,
          message: 'No visible focus indicator for keyboard navigation',
          wcagCriterion: '2.4.7'
        });
      }
    });
  }

  // Check screen reader support (WCAG 1.3.1)
  private checkScreenReaderSupport() {
    // Check for proper ARIA labels
    const interactiveElements = this.element.querySelectorAll(
      'button, a, input, select, textarea'
    );
    
    interactiveElements.forEach(element => {
      const hasLabel = 
        element.getAttribute('aria-label') ||
        element.getAttribute('aria-labelledby') ||
        element.getAttribute('title') ||
        (element as HTMLInputElement).labels?.length ||
        element.textContent?.trim();
      
      if (!hasLabel) {
        this.addViolation({
          type: 'screen-reader',
          severity: 'high',
          element: element as HTMLElement,
          message: 'Interactive element lacks accessible label',
          wcagCriterion: '1.3.1'
        });
      }
    });
  }

  // Check focus management (WCAG 2.4.3)
  private checkFocusManagement() {
    // Check for proper focus order
    const focusableElements = Array.from(this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )) as HTMLElement[];
    
    // Check tabindex values
    focusableElements.forEach(element => {
      const tabindex = element.getAttribute('tabindex');
      
      if (tabindex && parseInt(tabindex) > 0) {
        this.addViolation({
          type: 'focus-management',
          severity: 'medium',
          element: element,
          message: `Positive tabindex (${tabindex}) can disrupt natural tab order`,
          wcagCriterion: '2.4.3'
        });
      }
    });
  }

  // Check alt text for images (WCAG 1.1.1)
  private checkAltText() {
    const images = this.element.querySelectorAll('img');
    
    images.forEach(img => {
      const alt = img.getAttribute('alt');
      
      if (alt === null) {
        this.addViolation({
          type: 'alt-text',
          severity: 'high',
          element: img as HTMLElement,
          message: 'Image missing alt attribute',
          wcagCriterion: '1.1.1'
        });
      } else if (alt === '' && !img.getAttribute('role')) {
        // Check if image is decorative
        const parent = img.parentElement;
        if (parent && !parent.getAttribute('aria-hidden')) {
          this.addViolation({
            type: 'alt-text',
            severity: 'medium',
            element: img as HTMLElement,
            message: 'Decorative image should have aria-hidden="true"',
            wcagCriterion: '1.1.1'
          });
        }
      }
    });
  }

  // Check form labels (WCAG 1.3.1, 3.3.2)
  private checkFormLabels() {
    const inputs = this.element.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      const hasLabel = 
        (input as HTMLInputElement).labels?.length ||
        input.getAttribute('aria-label') ||
        input.getAttribute('aria-labelledby') ||
        input.getAttribute('title');
      
      if (!hasLabel) {
        this.addViolation({
          type: 'form-label',
          severity: 'high',
          element: input as HTMLElement,
          message: 'Form input missing associated label',
          wcagCriterion: '3.3.2'
        });
      }
    });
  }

  // Check heading structure (WCAG 1.3.1)
  private checkHeadingStructure() {
    const headings = Array.from(this.element.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let lastLevel = 0;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.substring(1));
      
      if (level > lastLevel + 1) {
        this.addViolation({
          type: 'heading-structure',
          severity: 'medium',
          element: heading as HTMLElement,
          message: `Heading level skipped: h${lastLevel} to h${level}`,
          wcagCriterion: '1.3.1'
        });
      }
      
      lastLevel = level;
    });
    
    // Check for exactly one h1
    const h1s = this.element.querySelectorAll('h1');
    if (h1s.length !== 1) {
      this.addViolation({
        type: 'heading-structure',
        severity: 'medium',
        element: h1s[0] as HTMLElement,
        message: `Page should have exactly one h1 (found ${h1s.length})`,
        wcagCriterion: '1.3.1'
      });
    }
  }

  // Check language declaration (WCAG 3.1.1)
  private checkLanguageDeclaration() {
    const html = document.documentElement;
    const lang = html.getAttribute('lang');
    
    if (!lang) {
      this.addViolation({
        type: 'language',
        severity: 'medium',
        element: html,
        message: 'Missing lang attribute on html element',
        wcagCriterion: '3.1.1'
      });
    }
  }

  // Calculate contrast ratio
  public calculateContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 1;
    
    const l1 = this.getLuminance(rgb1);
    const l2 = this.getLuminance(rgb2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private getLuminance(rgb: { r: number; g: number; b: number }): number {
    const rsRGB = rgb.r / 255;
    const gsRGB = rgb.g / 255;
    const bsRGB = rgb.b / 255;

    const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  private addViolation(violation: AccessibilityViolation) {
    this.violations.push(violation);
  }
}

// Accessibility violation interface
export interface AccessibilityViolation {
  type: string;
  severity: 'low' | 'medium' | 'high';
  element: HTMLElement;
  message: string;
  wcagCriterion: string;
}

// Mobile-specific accessibility utilities
export class MobileAccessibility {
  // Check if viewport is properly configured
  static checkViewport(): boolean {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) return false;
    
    const content = viewport.getAttribute('content') || '';
    const hasWidth = content.includes('width=device-width');
    const hasScale = content.includes('initial-scale=1');
    
    return hasWidth && hasScale;
  }

  // Check if touch targets are properly spaced
  static checkTouchSpacing(): AccessibilityViolation[] {
    const violations: AccessibilityViolation[] = [];
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"]'
    );
    
    for (let i = 0; i < interactiveElements.length; i++) {
      for (let j = i + 1; j < interactiveElements.length; j++) {
        const elem1 = interactiveElements[i] as HTMLElement;
        const elem2 = interactiveElements[j] as HTMLElement;
        
        const rect1 = elem1.getBoundingClientRect();
        const rect2 = elem2.getBoundingClientRect();
        
        const horizontalSpacing = Math.abs(rect1.left - rect2.left);
        const verticalSpacing = Math.abs(rect1.top - rect2.top);
        
        const minSpacing = 8; // 8px minimum spacing
        
        if (horizontalSpacing < minSpacing || verticalSpacing < minSpacing) {
          violations.push({
            type: 'touch-spacing',
            severity: 'medium',
            element: elem1,
            message: `Touch targets too close: ${horizontalSpacing}px horizontal, ${verticalSpacing}px vertical spacing`,
            wcagCriterion: '2.5.5'
          });
        }
      }
    }
    
    return violations;
  }

  // Check for proper mobile input types
  static checkInputTypes(): AccessibilityViolation[] {
    const violations: AccessibilityViolation[] = [];
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
      const type = input.getAttribute('type');
      const inputMode = input.getAttribute('inputmode');
      
      // Check for appropriate input types
      if (input.getAttribute('pattern')?.includes('[0-9]') && type !== 'tel' && type !== 'number') {
        violations.push({
          type: 'input-type',
          severity: 'low',
          element: input as HTMLElement,
          message: 'Numeric input should use type="tel" or type="number" for better mobile keyboard',
          wcagCriterion: '1.3.1'
        });
      }
      
      // Check for inputmode attribute
      if (type === 'email' && !inputMode) {
        violations.push({
          type: 'input-type',
          severity: 'low',
          element: input as HTMLElement,
          message: 'Email input should have inputmode="email" for better mobile experience',
          wcagCriterion: '1.3.1'
        });
      }
    });
    
    return violations;
  }

  // Check for proper mobile gestures
  static checkGestures(): AccessibilityViolation[] {
    const violations: AccessibilityViolation[] = [];
    
    // Check for swipe alternatives
    const swipeElements = document.querySelectorAll('[data-swipe]');
    swipeElements.forEach(element => {
      const hasAlternative = 
        element.querySelector('button') ||
        element.getAttribute('aria-label') ||
        element.getAttribute('title');
      
      if (!hasAlternative) {
        violations.push({
          type: 'gesture-alternative',
          severity: 'high',
          element: element as HTMLElement,
          message: 'Swipe gesture needs keyboard/button alternative',
          wcagCriterion: '2.1.1'
        });
      }
    });
    
    return violations;
  }
}

// Accessibility testing utilities
export function runAccessibilityAudit(element: HTMLElement = document.body) {
  const checker = new AccessibilityChecker(element);
  const violations = checker.checkAll();
  
  // Add mobile-specific checks
  const mobileViolations = [
    ...MobileAccessibility.checkTouchSpacing(),
    ...MobileAccessibility.checkInputTypes(),
    ...MobileAccessibility.checkGestures()
  ];
  
  const allViolations = [...violations, ...mobileViolations];
  
  // Group by severity
  const grouped = {
    high: allViolations.filter(v => v.severity === 'high'),
    medium: allViolations.filter(v => v.severity === 'medium'),
    low: allViolations.filter(v => v.severity === 'low')
  };
  
  console.group('🔍 Accessibility Audit Results');
  console.log(`Total violations: ${allViolations.length}`);
  console.log(`High severity: ${grouped.high.length}`);
  console.log(`Medium severity: ${grouped.medium.length}`);
  console.log(`Low severity: ${grouped.low.length}`);
  
  if (allViolations.length > 0) {
    console.table(allViolations);
  }
  
  console.groupEnd();
  
  return {
    violations: allViolations,
    grouped,
    score: Math.max(0, 100 - (grouped.high.length * 10 + grouped.medium.length * 5 + grouped.low.length * 1))
  };
}

// Vue composable for accessibility
export function useAccessibility() {
  const auditResults = ref<ReturnType<typeof runAccessibilityAudit> | null>(null);
  const isAuditing = ref(false);

  const runAudit = (element?: HTMLElement) => {
    isAuditing.value = true;
    
    try {
      auditResults.value = runAccessibilityAudit(element);
    } catch (error) {
      console.error('Accessibility audit failed:', error);
    } finally {
      isAuditing.value = false;
    }
  };

  const checkContrast = (foreground: string, background: string) => {
    const checker = new AccessibilityChecker(document.body);
    return checker.calculateContrastRatio(foreground, background);
  };

  return {
    auditResults,
    isAuditing,
    runAudit,
    checkContrast
  };
}
