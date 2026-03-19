import { ref, onMounted, onBeforeUnmount } from 'vue';

export interface MobileMetrics {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screenSize: { width: number; height: number };
  pixelRatio: number;
  connectionType: string;
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
  memory: number;
  cores: number;
}

export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

export function useMobileOptimization() {
  const metrics = ref<MobileMetrics | null>(null);
  const performanceMetrics = ref<PerformanceMetrics | null>(null);
  const isOnline = ref(navigator.onLine);
  const isLowEndDevice = ref(false);
  const isSlowConnection = ref(false);
  const isReducedMotion = ref(false);

  // Detect device capabilities
  const detectDeviceCapabilities = () => {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;

    const deviceInfo: MobileMetrics = {
      deviceType: getDeviceType(),
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      pixelRatio: window.devicePixelRatio || 1,
      connectionType: connection?.effectiveType || 'unknown',
      effectiveType: connection?.effectiveType || 'unknown',
      downlink: connection?.downlink || 0,
      rtt: connection?.rtt || 0,
      saveData: connection?.saveData || false,
      memory: (navigator as any).deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4
    };

    metrics.value = deviceInfo;

    // Determine optimization strategies
    isLowEndDevice.value = 
      deviceInfo.memory <= 2 || 
      deviceInfo.cores <= 2 || 
      deviceInfo.pixelRatio >= 3;

    isSlowConnection.value = 
      deviceInfo.effectiveType === 'slow-2g' ||
      deviceInfo.effectiveType === '2g' ||
      deviceInfo.effectiveType === '3g' ||
      deviceInfo.saveData;

    // Detect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion.value = motionQuery.matches;

    console.log('📱 Mobile Optimization:', {
      deviceInfo,
      isLowEndDevice: isLowEndDevice.value,
      isSlowConnection: isSlowConnection.value,
      isReducedMotion: isReducedMotion.value
    });
  };

  // Get device type based on screen size
  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  };

  // Monitor performance metrics
  const monitorPerformance = () => {
    if ('PerformanceObserver' in window) {
      // Observe Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          switch (entry.entryType) {
            case 'paint':
              if (entry.name === 'first-contentful-paint') {
                performanceMetrics.value = {
                  ...performanceMetrics.value!,
                  firstContentfulPaint: entry.startTime
                };
              }
              break;
              
            case 'largest-contentful-paint':
              performanceMetrics.value = {
                ...performanceMetrics.value!,
                largestContentfulPaint: entry.startTime
              };
              break;
              
            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                const cls = (performanceMetrics.value?.cumulativeLayoutShift || 0) + (entry as any).value;
                performanceMetrics.value = {
                  ...performanceMetrics.value!,
                  cumulativeLayoutShift: cls
                };
              }
              break;
              
            case 'first-input':
              performanceMetrics.value = {
                ...performanceMetrics.value!,
                firstInputDelay: (entry as any).processingStart - entry.startTime
              };
              break;
          }
        });
      });

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] });
    }
  };

  // Optimize images based on connection and device
  const optimizeImage = (src: string, options?: {
    width?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpg' | 'png';
  }) => {
    const opts = {
      width: options?.width || window.innerWidth,
      quality: isSlowConnection.value ? 60 : (options?.quality || 80),
      format: options?.format || 'webp'
    };

    // For slow connections, use lower quality
    if (isSlowConnection.value) {
      opts.quality = Math.min(opts.quality, 50);
    }

    // For low-end devices, reduce resolution
    if (isLowEndDevice.value) {
      opts.width = Math.min(opts.width, 800);
    }

    // Return optimized image URL (this would integrate with your image CDN)
    return `${src}?w=${opts.width}&q=${opts.quality}&f=${opts.format}`;
  };

  // Lazy load components based on priority
  const lazyLoadComponent = async (componentLoader: () => Promise<any>, priority: 'high' | 'low' = 'low') => {
    if (priority === 'high' || !isSlowConnection.value) {
      return await componentLoader();
    }

    // For low priority on slow connections, delay loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    return await componentLoader();
  };

  // Adaptive loading strategy
  const adaptiveLoad = async <T>(
    highQualityLoader: () => Promise<T>,
    lowQualityLoader: () => Promise<T>
  ): Promise<T> => {
    if (isSlowConnection.value || isLowEndDevice.value) {
      console.log('🐌 Using low-quality loader for better performance');
      return await lowQualityLoader();
    }

    console.log('⚡ Using high-quality loader');
    return await highQualityLoader();
  };

  // Optimize font loading
  const optimizeFonts = () => {
    // Use system fonts on slow connections
    if (isSlowConnection.value) {
      document.documentElement.style.setProperty(
        '--font-family',
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      );
    }

    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = '/fonts/architect-font.woff2';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
  };

  // Optimize animations for reduced motion
  const getAnimationDuration = (defaultDuration: number) => {
    return isReducedMotion.value ? 0 : defaultDuration;
  };

  // Batch DOM updates for better performance
  const batchDOMUpdate = (updates: (() => void)[]) => {
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        updates.forEach(update => update());
        resolve();
      });
    });
  };

  // Monitor network status
  const updateNetworkStatus = () => {
    isOnline.value = navigator.onLine;
    
    if (navigator.onLine) {
      // Connection restored - sync any pending actions
      console.log('🌐 Connection restored');
    } else {
      // Connection lost - notify user
      console.log('📵 Connection lost');
    }
  };

  // Get performance score
  const getPerformanceScore = () => {
    if (!performanceMetrics.value) return null;

    const { 
      firstContentfulPaint, 
      largestContentfulPaint, 
      cumulativeLayoutShift, 
      firstInputDelay 
    } = performanceMetrics.value;

    let score = 100;

    // FCP penalty (should be < 1.8s)
    if (firstContentfulPaint > 1800) score -= 20;
    else if (firstContentfulPaint > 1000) score -= 10;

    // LCP penalty (should be < 2.5s)
    if (largestContentfulPaint > 2500) score -= 20;
    else if (largestContentfulPaint > 1500) score -= 10;

    // CLS penalty (should be < 0.1)
    if (cumulativeLayoutShift > 0.25) score -= 20;
    else if (cumulativeLayoutShift > 0.1) score -= 10;

    // FID penalty (should be < 100ms)
    if (firstInputDelay > 300) score -= 20;
    else if (firstInputDelay > 100) score -= 10;

    return Math.max(0, score);
  };

  // Log performance metrics
  const logPerformanceMetrics = () => {
    const score = getPerformanceScore();
    console.log('📊 Performance Score:', score, '/100');
    
    if (performanceMetrics.value) {
      console.table(performanceMetrics.value);
    }
  };

  // Initialize optimizations
  onMounted(() => {
    detectDeviceCapabilities();
    monitorPerformance();
    optimizeFonts();
    
    // Listen for network changes
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    // Listen for connection changes
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', detectDeviceCapabilities);
    }
    
    // Listen for screen size changes
    const resizeObserver = new ResizeObserver(() => {
      detectDeviceCapabilities();
    });
    resizeObserver.observe(document.documentElement);
    
    // Log performance after page load
    setTimeout(() => {
      logPerformanceMetrics();
    }, 5000);
  });

  // Cleanup
  onBeforeUnmount(() => {
    window.removeEventListener('online', updateNetworkStatus);
    window.removeEventListener('offline', updateNetworkStatus);
    
    const connection = (navigator as any).connection;
    if (connection) {
      connection.removeEventListener('change', detectDeviceCapabilities);
    }
  });

  return {
    metrics,
    performanceMetrics,
    isOnline,
    isLowEndDevice,
    isSlowConnection,
    isReducedMotion,
    optimizeImage,
    lazyLoadComponent,
    adaptiveLoad,
    getAnimationDuration,
    batchDOMUpdate,
    getPerformanceScore,
    logPerformanceMetrics
  };
}
