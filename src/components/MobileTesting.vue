<template>
  <div class="mobile-testing">
    <h2 class="mobile-heading-2 mb-6">🧪 Mobile Testing & Usability</h2>
    
    <!-- Device Simulator -->
    <div class="mobile-card mb-6">
      <h3 class="mobile-heading-3 mb-4">Device Simulator</h3>
      
      <div class="device-controls mb-4">
        <div class="flex gap-3 flex-wrap">
          <select v-model="selectedDevice" class="mobile-input" style="width: auto;">
            <option value="320x568">iPhone SE (320x568)</option>
            <option value="375x667">iPhone 8 (375x667)</option>
            <option value="375x812">iPhone 11 (375x812)</option>
            <option value="414x896">iPhone 11 Max (414x896)</option>
            <option value="390x844">iPhone 12 (390x844)</option>
            <option value="428x926">iPhone 12 Max (428x926)</option>
            <option value="375x812">iPhone 13 (375x812)</option>
            <option value="390x844">iPhone 14 (390x844)</option>
            <option value="428x926">iPhone 14 Max (428x926)</option>
            <option value="360x640">Android Small (360x640)</option>
            <option value="360x780">Android Medium (360x780)</option>
            <option value="412x915">Android Large (412x915)</option>
            <option value="411x823">Pixel 5 (411x823)</option>
            <option value="412x892">Pixel 6 (412x892)</option>
            <option value="384x854">Galaxy S8 (384x854)</option>
            <option value="360x740">Galaxy S9 (360x740)</option>
            <option value="360x780">Galaxy S10 (360x780)</option>
            <option value="384x854">Galaxy S20 (384x854)</option>
            <option value="412x915">Galaxy S21 (412x915)</option>
            <option value="768x1024">iPad Mini (768x1024)</option>
            <option value="820x1180">iPad (820x1180)</option>
            <option value="1024x1366">iPad Pro (1024x1366)</option>
          </select>
          
          <button @click="rotateDevice" class="mobile-btn mobile-btn-secondary">
            <i data-lucide="rotate-cw" class="w-4 h-4"></i>
            Rotate
          </button>
          
          <button @click="toggleTouchMode" class="mobile-btn mobile-btn-secondary">
            <i data-lucide="hand" class="w-4 h-4"></i>
            {{ touchMode ? 'Touch Off' : 'Touch On' }}
          </button>
        </div>
      </div>
      
      <div class="device-simulator" :style="simulatorStyle">
        <div class="device-frame" :class="{ 'landscape': isLandscape }">
          <!-- Device Status Bar -->
          <div class="device-status-bar">
            <span class="time">{{ currentTime }}</span>
            <div class="status-icons">
              <span>📶</span>
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>
          
          <!-- Mobile App Preview -->
          <div class="device-content">
            <MobileArchitectChat />
          </div>
          
          <!-- Touch Indicators -->
          <div v-if="touchMode" class="touch-indicators">
            <div 
              v-for="touch in touches" 
              :key="touch.id"
              class="touch-indicator"
              :style="{ left: touch.x + 'px', top: touch.y + 'px' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Performance Metrics -->
    <div class="mobile-card mb-6">
      <h3 class="mobile-heading-3 mb-4">Performance Metrics</h3>
      
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value">{{ performanceMetrics.loadTime }}ms</div>
          <div class="metric-label">Load Time</div>
          <div class="metric-status" :class="getPerformanceStatus(performanceMetrics.loadTime, 3000)">
            {{ getPerformanceStatus(performanceMetrics.loadTime, 3000) === 'good' ? '✅' : '⚠️' }}
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-value">{{ performanceMetrics.firstContentfulPaint }}ms</div>
          <div class="metric-label">First Contentful Paint</div>
          <div class="metric-status" :class="getPerformanceStatus(performanceMetrics.firstContentfulPaint, 1800)">
            {{ getPerformanceStatus(performanceMetrics.firstContentfulPaint, 1800) === 'good' ? '✅' : '⚠️' }}
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-value">{{ performanceMetrics.largestContentfulPaint }}ms</div>
          <div class="metric-label">Largest Contentful Paint</div>
          <div class="metric-status" :class="getPerformanceStatus(performanceMetrics.largestContentfulPaint, 2500)">
            {{ getPerformanceStatus(performanceMetrics.largestContentfulPaint, 2500) === 'good' ? '✅' : '⚠️' }}
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-value">{{ performanceMetrics.cumulativeLayoutShift.toFixed(3) }}</div>
          <div class="metric-label">Cumulative Layout Shift</div>
          <div class="metric-status" :class="getPerformanceStatus(performanceMetrics.cumulativeLayoutShift, 0.1, true)">
            {{ getPerformanceStatus(performanceMetrics.cumulativeLayoutShift, 0.1, true) === 'good' ? '✅' : '⚠️' }}
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-value">{{ performanceMetrics.firstInputDelay }}ms</div>
          <div class="metric-label">First Input Delay</div>
          <div class="metric-status" :class="getPerformanceStatus(performanceMetrics.firstInputDelay, 100)">
            {{ getPerformanceStatus(performanceMetrics.firstInputDelay, 100) === 'good' ? '✅' : '⚠️' }}
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-value">{{ getPerformanceScore() }}/100</div>
          <div class="metric-label">Overall Score</div>
          <div class="metric-status" :class="getPerformanceStatus(getPerformanceScore(), 80, true)">
            {{ getPerformanceStatus(getPerformanceScore(), 80, true) === 'good' ? '✅' : '⚠️' }}
          </div>
        </div>
      </div>
      
      <div class="mt-4">
        <button @click="runPerformanceTest" class="mobile-btn mobile-btn-primary" :disabled="isTesting">
          <i data-lucide="activity" class="w-4 h-4"></i>
          {{ isTesting ? 'Testing...' : 'Run Performance Test' }}
        </button>
      </div>
    </div>
    
    <!-- Accessibility Audit -->
    <div class="mobile-card mb-6">
      <h3 class="mobile-heading-3 mb-4">Accessibility Audit (WCAG 2.1)</h3>
      
      <div v-if="accessibilityResults" class="accessibility-results">
        <div class="accessibility-score mb-4">
          <div class="score-circle" :class="getScoreClass(accessibilityResults.score)">
            {{ accessibilityResults.score }}/100
          </div>
          <div class="score-details">
            <div class="score-item">
              <span class="score-label">High Severity:</span>
              <span class="score-value high">{{ accessibilityResults.grouped.high.length }}</span>
            </div>
            <div class="score-item">
              <span class="score-label">Medium Severity:</span>
              <span class="score-value medium">{{ accessibilityResults.grouped.medium.length }}</span>
            </div>
            <div class="score-item">
              <span class="score-label">Low Severity:</span>
              <span class="score-value low">{{ accessibilityResults.grouped.low.length }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="accessibilityResults.violations.length > 0" class="violations-list">
          <h4 class="mobile-heading-4 mb-3">Violations Found</h4>
          <div class="space-y-2">
            <div 
              v-for="violation in accessibilityResults.violations.slice(0, 5)" 
              :key="violation.element.tagName + Math.random()"
              class="violation-item"
              :class="violation.severity"
            >
              <div class="violation-header">
                <span class="violation-type">{{ violation.type }}</span>
                <span class="violation-severity">{{ violation.severity }}</span>
                <span class="violation-criterion">WCAG {{ violation.wcagCriterion }}</span>
              </div>
              <div class="violation-message">{{ violation.message }}</div>
            </div>
          </div>
          
          <div v-if="accessibilityResults.violations.length > 5" class="mt-3">
            <button @click="showAllViolations = !showAllViolations" class="mobile-btn mobile-btn-secondary">
              {{ showAllViolations ? 'Show Less' : `Show All (${accessibilityResults.violations.length})` }}
            </button>
          </div>
        </div>
        
        <div v-else class="no-violations">
          <div class="text-2xl mb-2">🎉</div>
          <div class="mobile-heading-4">No Accessibility Violations Found!</div>
          <div class="mobile-caption">Your app meets WCAG 2.1 standards</div>
        </div>
      </div>
      
      <div class="mt-4">
        <button @click="runAccessibilityAudit" class="mobile-btn mobile-btn-primary" :disabled="isAuditing">
          <i data-lucide="eye" class="w-4 h-4"></i>
          {{ isAuditing ? 'Auditing...' : 'Run Accessibility Audit' }}
        </button>
      </div>
    </div>
    
    <!-- Network Simulation -->
    <div class="mobile-card mb-6">
      <h3 class="mobile-heading-3 mb-4">Network Simulation</h3>
      
      <div class="network-controls">
        <div class="grid grid-cols-2 gap-3 mb-4">
          <button 
            v-for="profile in networkProfiles" 
            :key="profile.name"
            @click="setNetworkProfile(profile)"
            class="mobile-btn"
            :class="selectedProfile?.name === profile.name ? 'mobile-btn-primary' : 'mobile-btn-secondary'"
          >
            <div class="text-sm font-semibold">{{ profile.name }}</div>
            <div class="text-xs opacity-75">{{ profile.downlink }}Mbps</div>
            <div class="text-xs opacity-75">{{ profile.rtt }}ms RTT</div>
          </button>
        </div>
        
        <div v-if="selectedProfile" class="network-info">
          <div class="network-status">
            <div class="status-indicator" :class="{ active: isNetworkActive }"></div>
            <span>{{ selectedProfile.name }}</span>
            <span class="network-speed">{{ currentSpeed }}Mbps</span>
          </div>
          
          <div class="network-metrics">
            <div class="metric">
              <span class="metric-label">Latency:</span>
              <span class="metric-value">{{ currentLatency }}ms</span>
            </div>
            <div class="metric">
              <span class="metric-label">Packet Loss:</span>
              <span class="metric-value">{{ packetLoss }}%</span>
            </div>
            <div class="metric">
              <span class="metric-label">Jitter:</span>
              <span class="metric-value">{{ jitter }}ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Usability Testing Checklist -->
    <div class="mobile-card">
      <h3 class="mobile-heading-3 mb-4">Usability Testing Checklist</h3>
      
      <div class="checklist">
        <div 
          v-for="item in usabilityChecklist" 
          :key="item.id"
          class="checklist-item"
          :class="{ completed: item.completed }"
        >
          <label class="flex items-start gap-3">
            <input 
              type="checkbox" 
              v-model="item.completed"
              class="w-5 h-5 mt-1"
            >
            <div class="flex-1">
              <div class="checklist-title">{{ item.title }}</div>
              <div class="checklist-description">{{ item.description }}</div>
              <div class="checklist-category">{{ item.category }}</div>
            </div>
          </label>
        </div>
      </div>
      
      <div class="mt-6">
        <div class="progress-bar mb-3">
          <div 
            class="progress-fill" 
            :style="{ width: completionPercentage + '%' }"
          ></div>
        </div>
        <div class="text-center">
          <span class="mobile-heading-4">{{ completionPercentage }}% Complete</span>
          <div class="mobile-caption">{{ completedItems }} of {{ totalItems }} items tested</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import MobileArchitectChat from './MobileArchitectChat.vue';
import { runAccessibilityAudit as auditAccessibility } from '../utils/accessibility';

// Device Simulator
const selectedDevice = ref('375x812');
const isLandscape = ref(false);
const touchMode = ref(false);
const touches = ref<Array<{ id: number; x: number; y: number }>>([]);

const simulatorStyle = computed(() => {
  const [width, height] = selectedDevice.value.split('x').map(Number);
  const containerWidth = isLandscape.value ? height : width;
  const containerHeight = isLandscape.value ? width : height;
  
  return {
    maxWidth: containerWidth + 'px',
    maxHeight: containerHeight + 'px',
    margin: '0 auto'
  };
});

const rotateDevice = () => {
  isLandscape.value = !isLandscape.value;
};

const toggleTouchMode = () => {
  touchMode.value = !touchMode.value;
  if (!touchMode.value) {
    touches.value = [];
  }
};

// Touch simulation
const handleTouch = (event: TouchEvent) => {
  if (!touchMode.value) return;
  
  touches.value = Array.from(event.touches).map((touch, index) => ({
    id: index,
    x: touch.clientX,
    y: touch.clientY
  }));
};

// Performance Metrics
const isTesting = ref(false);
const performanceMetrics = ref({
  loadTime: 0,
  firstContentfulPaint: 0,
  largestContentfulPaint: 0,
  cumulativeLayoutShift: 0,
  firstInputDelay: 0
});

const runPerformanceTest = async () => {
  isTesting.value = true;
  
  // Simulate performance test
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  performanceMetrics.value = {
    loadTime: Math.random() * 2000 + 800,
    firstContentfulPaint: Math.random() * 1500 + 300,
    largestContentfulPaint: Math.random() * 2000 + 500,
    cumulativeLayoutShift: Math.random() * 0.2,
    firstInputDelay: Math.random() * 150 + 20
  };
  
  isTesting.value = false;
};

const getPerformanceStatus = (value: number, threshold: number, higherIsBetter = false) => {
  if (higherIsBetter) {
    return value >= threshold ? 'good' : 'warning';
  }
  return value <= threshold ? 'good' : 'warning';
};

const getPerformanceScore = () => {
  let score = 100;
  
  if (performanceMetrics.value.loadTime > 3000) score -= 20;
  if (performanceMetrics.value.firstContentfulPaint > 1800) score -= 20;
  if (performanceMetrics.value.largestContentfulPaint > 2500) score -= 20;
  if (performanceMetrics.value.cumulativeLayoutShift > 0.1) score -= 20;
  if (performanceMetrics.value.firstInputDelay > 100) score -= 20;
  
  return Math.max(0, score);
};

// Accessibility Audit
const isAuditing = ref(false);
const accessibilityResults = ref<any>(null);
const showAllViolations = ref(false);

const runAccessibilityAudit = async () => {
  isAuditing.value = true;
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate accessibility audit
  accessibilityResults.value = auditAccessibility();
  
  isAuditing.value = false;
};

const getScoreClass = (score: number) => {
  if (score >= 90) return 'excellent';
  if (score >= 80) return 'good';
  if (score >= 70) return 'fair';
  return 'poor';
};

// Network Simulation
const selectedProfile = ref<any>(null);
const isNetworkActive = ref(false);
const currentSpeed = ref(0);
const currentLatency = ref(0);
const packetLoss = ref(0);
const jitter = ref(0);

const networkProfiles = [
  { name: '4G', downlink: 10, rtt: 50, type: '4g' },
  { name: '3G', downlink: 2, rtt: 200, type: '3g' },
  { name: '2G', downlink: 0.1, rtt: 600, type: '2g' },
  { name: 'Slow 3G', downlink: 0.5, rtt: 400, type: 'slow-3g' },
  { name: 'Offline', downlink: 0, rtt: 9999, type: 'offline' }
];

const setNetworkProfile = async (profile: any) => {
  selectedProfile.value = profile;
  isNetworkActive.value = true;
  
  // Simulate network conditions
  currentSpeed.value = profile.downlink;
  currentLatency.value = profile.rtt;
  packetLoss.value = Math.random() * 5;
  jitter.value = Math.random() * 20;
  
  if (profile.type === 'offline') {
    isNetworkActive.value = false;
  }
};

// Usability Testing Checklist
const usabilityChecklist = ref([
  {
    id: 1,
    title: '44px minimum touch targets',
    description: 'All interactive elements meet minimum touch target size',
    category: 'Touch Targets',
    completed: false
  },
  {
    id: 2,
    title: 'Thumb-friendly navigation',
    description: 'Navigation is optimized for one-handed use',
    category: 'Navigation',
    completed: false
  },
  {
    id: 3,
    title: 'Readable text at 16px minimum',
    description: 'Body text is at least 16px for readability',
    category: 'Typography',
    completed: false
  },
  {
    id: 4,
    title: 'Sufficient color contrast',
    description: 'Text meets WCAG AA contrast requirements (4.5:1)',
    category: 'Accessibility',
    completed: false
  },
  {
    id: 5,
    title: 'Clear focus indicators',
    description: 'Keyboard navigation has visible focus states',
    category: 'Accessibility',
    completed: false
  },
  {
    id: 6,
    title: 'Responsive design',
    description: 'Layout works across all screen sizes (320px-768px)',
    category: 'Responsive',
    completed: false
  },
  {
    id: 7,
    title: 'Fast loading on 3G',
    description: 'Page loads in under 3 seconds on 3G networks',
    category: 'Performance',
    completed: false
  },
  {
    id: 8,
    title: 'Offline functionality',
    description: 'Core features work without internet connection',
    category: 'Offline',
    completed: false
  },
  {
    id: 9,
    title: 'Voice input support',
    description: 'Speech-to-text input is available and functional',
    category: 'Input',
    completed: false
  },
  {
    id: 10,
    title: 'Gesture alternatives',
    description: 'All gestures have keyboard/button alternatives',
    category: 'Accessibility',
    completed: false
  },
  {
    id: 11,
    title: 'Error prevention',
    description: 'Forms confirm destructive actions and provide recovery',
    category: 'Forms',
    completed: false
  },
  {
    id: 12,
    title: 'Consistent design language',
    description: 'UI elements follow consistent patterns and behaviors',
    category: 'Design',
    completed: false
  }
]);

const completedItems = computed(() => 
  usabilityChecklist.value.filter(item => item.completed).length
);

const totalItems = computed(() => usabilityChecklist.value.length);

const completionPercentage = computed(() => 
  Math.round((completedItems.value / totalItems.value) * 100)
);

// Time display
const currentTime = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

// Update time
const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

onMounted(() => {
  // Initialize Lucide icons
  if (typeof window !== 'undefined' && (window as any).lucide) {
    (window as any).lucide.createIcons();
  }
  
  // Set up touch listeners
  document.addEventListener('touchstart', handleTouch);
  document.addEventListener('touchmove', handleTouch);
  document.addEventListener('touchend', () => {
    touches.value = [];
  });
  
  // Update time every minute
  setInterval(updateTime, 60000);
  
  // Run initial tests
  runPerformanceTest();
  runAccessibilityAudit();
});

onBeforeUnmount(() => {
  document.removeEventListener('touchstart', handleTouch);
  document.removeEventListener('touchmove', handleTouch);
  document.removeEventListener('touchend', () => {
    touches.value = [];
  });
});
</script>

<style scoped>
.mobile-testing {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--mobile-space-4);
}

.device-simulator {
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  background: #1a1a1a;
  padding: 1rem;
}

.device-frame {
  background: #000;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
}

.device-frame.landscape {
  transform: rotate(90deg);
  margin: 2rem 0;
}

.device-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.75rem;
}

.status-icons {
  display: flex;
  gap: 0.25rem;
}

.device-content {
  height: 600px;
  overflow: hidden;
  background: white;
}

.touch-indicators {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.touch-indicator {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 3px solid rgba(59, 130, 246, 0.8);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: touchRipple 0.6s ease-out;
}

@keyframes touchRipple {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.metric-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}

.metric-label {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.25rem 0;
}

.metric-status.good {
  color: #10b981;
}

.metric-status.warning {
  color: #f59e0b;
}

.accessibility-results {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
}

.accessibility-score {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
}

.score-circle.excellent {
  background: #10b981;
}

.score-circle.good {
  background: #3b82f6;
}

.score-circle.fair {
  background: #f59e0b;
}

.score-circle.poor {
  background: #ef4444;
}

.score-details {
  flex: 1;
}

.score-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.score-value.high {
  color: #ef4444;
  font-weight: 600;
}

.score-value.medium {
  color: #f59e0b;
  font-weight: 600;
}

.score-value.low {
  color: #3b82f6;
  font-weight: 600;
}

.violation-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
}

.violation-item.high {
  border-left: 4px solid #ef4444;
}

.violation-item.medium {
  border-left: 4px solid #f59e0b;
}

.violation-item.low {
  border-left: 4px solid #3b82f6;
}

.violation-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.violation-type {
  font-weight: 600;
}

.violation-severity {
  text-transform: uppercase;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  background: #f1f5f9;
}

.violation-message {
  color: #475569;
  font-size: 0.875rem;
}

.no-violations {
  text-align: center;
  padding: 2rem;
  color: #10b981;
}

.network-controls {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
}

.network-info {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
}

.network-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ef4444;
}

.status-indicator.active {
  background: #10b981;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.network-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.metric {
  text-align: center;
}

.metric-label {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
}

.checklist {
  space-y: 1rem;
}

.checklist-item {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s ease;
}

.checklist-item.completed {
  background: #f0fdf4;
  border-color: #10b981;
}

.checklist-title {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.checklist-description {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.checklist-category {
  font-size: 0.75rem;
  color: #94a3b8;
  background: #f1f5f9;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  display: inline-block;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .accessibility-score {
    flex-direction: column;
    text-align: center;
  }
  
  .network-metrics {
    grid-template-columns: 1fr;
  }
  
  .device-simulator {
    padding: 0.5rem;
  }
  
  .device-content {
    height: 400px;
  }
}
</style>
