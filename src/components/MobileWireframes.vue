<template>
  <div class="mobile-wireframes">
    <h2 class="mobile-heading-2 mb-6">Mobile Wireframes & Prototypes</h2>
    
    <!-- Wireframe Grid -->
    <div class="mobile-grid mobile-grid-1 mb-8">
      <!-- 320px Small Phone -->
      <div class="mobile-card">
        <h3 class="mobile-heading-3 mb-4">📱 Small Phone (320px)</h3>
        <div class="wireframe-container" style="max-width: 320px;">
          <div class="wireframe-frame">
            <!-- Status Bar -->
            <div class="wireframe-status-bar">
              <span class="text-xs">9:41 AM</span>
              <div class="flex gap-1">
                <span class="text-xs">📶</span>
                <span class="text-xs">📶</span>
                <span class="text-xs">🔋</span>
              </div>
            </div>
            
            <!-- Header -->
            <div class="wireframe-header">
              <div class="w-6 h-6 bg-blue-500 rounded"></div>
              <span class="text-sm font-semibold">@Architect</span>
              <div class="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
            
            <!-- Content -->
            <div class="wireframe-content">
              <div class="space-y-3">
                <div class="wireframe-message assistant">
                  <div class="wireframe-avatar"></div>
                  <div class="flex-1">
                    <div class="wireframe-bubble"></div>
                  </div>
                </div>
                <div class="wireframe-message user">
                  <div class="flex-1">
                    <div class="wireframe-bubble user"></div>
                  </div>
                  <div class="wireframe-avatar"></div>
                </div>
              </div>
            </div>
            
            <!-- Input Area -->
            <div class="wireframe-input">
              <div class="wireframe-textfield"></div>
              <div class="wireframe-send-btn"></div>
            </div>
            
            <!-- Bottom Navigation -->
            <div class="wireframe-nav">
              <div class="wireframe-nav-item active"></div>
              <div class="wireframe-nav-item"></div>
              <div class="wireframe-nav-item"></div>
              <div class="wireframe-nav-item"></div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 space-y-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-sm">44px minimum touch targets</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span class="text-sm">Single-handed navigation</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span class="text-sm">Thumb-friendly zones</span>
          </div>
        </div>
      </div>
      
      <!-- 375px Standard Phone -->
      <div class="mobile-card">
        <h3 class="mobile-heading-3 mb-4">📱 Standard Phone (375px)</h3>
        <div class="wireframe-container" style="max-width: 375px;">
          <div class="wireframe-frame">
            <!-- Status Bar -->
            <div class="wireframe-status-bar">
              <span class="text-xs">9:41 AM</span>
              <div class="flex gap-1">
                <span class="text-xs">📶</span>
                <span class="text-xs">📶</span>
                <span class="text-xs">🔋</span>
              </div>
            </div>
            
            <!-- Header -->
            <div class="wireframe-header">
              <div class="w-6 h-6 bg-blue-500 rounded"></div>
              <span class="text-sm font-semibold">@Architect</span>
              <div class="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
            
            <!-- Quick Actions Grid -->
            <div class="wireframe-quick-actions">
              <div class="grid grid-cols-2 gap-3">
                <div class="wireframe-action-card">
                  <div class="text-2xl mb-1">📐</div>
                  <div class="h-2 bg-gray-300 rounded w-20"></div>
                  <div class="h-1 bg-gray-200 rounded w-16 mt-1"></div>
                </div>
                <div class="wireframe-action-card">
                  <div class="text-2xl mb-1">🏗️</div>
                  <div class="h-2 bg-gray-300 rounded w-24"></div>
                  <div class="h-1 bg-gray-200 rounded w-20 mt-1"></div>
                </div>
              </div>
            </div>
            
            <!-- Content -->
            <div class="wireframe-content">
              <div class="space-y-3">
                <div class="wireframe-message assistant">
                  <div class="wireframe-avatar"></div>
                  <div class="flex-1">
                    <div class="wireframe-bubble"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Input Area -->
            <div class="wireframe-input">
              <div class="wireframe-voice-btn"></div>
              <div class="wireframe-textfield"></div>
              <div class="wireframe-send-btn"></div>
            </div>
            
            <!-- Bottom Navigation -->
            <div class="wireframe-nav">
              <div class="wireframe-nav-item active"></div>
              <div class="wireframe-nav-item"></div>
              <div class="wireframe-nav-item"></div>
              <div class="wireframe-nav-item"></div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 space-y-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-sm">Enhanced content layout</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span class="text-sm">Quick action cards</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span class="text-sm">Optimized thumb reach</span>
          </div>
        </div>
      </div>
      
      <!-- 414px Large Phone -->
      <div class="mobile-card">
        <h3 class="mobile-heading-3 mb-4">📱 Large Phone (414px)</h3>
        <div class="wireframe-container" style="max-width: 414px;">
          <div class="wireframe-frame">
            <!-- Status Bar -->
            <div class="wireframe-status-bar">
              <span class="text-xs">9:41 AM</span>
              <div class="flex gap-1">
                <span class="text-xs">📶</span>
                <span class="text-xs">📶</span>
                <span class="text-xs">🔋</span>
              </div>
            </div>
            
            <!-- Header -->
            <div class="wireframe-header">
              <div class="w-6 h-6 bg-blue-500 rounded"></div>
              <span class="text-sm font-semibold">@Architect</span>
              <div class="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
            
            <!-- Quick Actions Grid -->
            <div class="wireframe-quick-actions">
              <div class="grid grid-cols-2 gap-3">
                <div class="wireframe-action-card">
                  <div class="text-2xl mb-1">📐</div>
                  <div class="h-2 bg-gray-300 rounded w-20"></div>
                  <div class="h-1 bg-gray-200 rounded w-16 mt-1"></div>
                </div>
                <div class="wireframe-action-card">
                  <div class="text-2xl mb-1">🏗️</div>
                  <div class="h-2 bg-gray-300 rounded w-24"></div>
                  <div class="h-1 bg-gray-200 rounded w-20 mt-1"></div>
                </div>
                <div class="wireframe-action-card">
                  <div class="text-2xl mb-1">🧱</div>
                  <div class="h-2 bg-gray-300 rounded w-20"></div>
                  <div class="h-1 bg-gray-200 rounded w-16 mt-1"></div>
                </div>
                <div class="wireframe-action-card">
                  <div class="text-2xl mb-1">📋</div>
                  <div class="h-2 bg-gray-300 rounded w-24"></div>
                  <div class="h-1 bg-gray-200 rounded w-20 mt-1"></div>
                </div>
              </div>
            </div>
            
            <!-- Content -->
            <div class="wireframe-content">
              <div class="space-y-3">
                <div class="wireframe-message assistant">
                  <div class="wireframe-avatar"></div>
                  <div class="flex-1">
                    <div class="wireframe-bubble"></div>
                    <div class="wireframe-actions">
                      <div class="flex gap-2">
                        <div class="w-8 h-8 bg-gray-200 rounded"></div>
                        <div class="w-8 h-8 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Input Area -->
            <div class="wireframe-input">
              <div class="wireframe-voice-btn"></div>
              <div class="wireframe-textfield"></div>
              <div class="wireframe-send-btn"></div>
            </div>
            
            <!-- Bottom Navigation -->
            <div class="wireframe-nav">
              <div class="wireframe-nav-item active"></div>
              <div class="wireframe-nav-item"></div>
              <div class="wireframe-nav-item"></div>
              <div class="wireframe-nav-item"></div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 space-y-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-sm">4-column quick actions</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span class="text-sm">Enhanced message actions</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span class="text-sm">Maximum thumb comfort</span>
          </div>
        </div>
      </div>
      
      <!-- 640px Small Tablet -->
      <div class="mobile-card">
        <h3 class="mobile-heading-3 mb-4">📱 Small Tablet (640px)</h3>
        <div class="wireframe-container" style="max-width: 640px;">
          <div class="wireframe-frame">
            <!-- Status Bar -->
            <div class="wireframe-status-bar">
              <span class="text-xs">9:41 AM</span>
              <div class="flex gap-1">
                <span class="text-xs">📶</span>
                <span class="text-xs">📶</span>
                <span class="text-xs">🔋</span>
              </div>
            </div>
            
            <!-- Header -->
            <div class="wireframe-header">
              <div class="w-6 h-6 bg-blue-500 rounded"></div>
              <span class="text-sm font-semibold">@Architect</span>
              <div class="flex gap-2">
                <div class="w-6 h-6 bg-gray-300 rounded"></div>
                <div class="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
            
            <!-- Content Layout -->
            <div class="flex gap-4 p-4">
              <!-- Sidebar -->
              <div class="w-48 space-y-3">
                <div class="wireframe-sidebar-item active"></div>
                <div class="wireframe-sidebar-item"></div>
                <div class="wireframe-sidebar-item"></div>
                <div class="wireframe-sidebar-item"></div>
              </div>
              
              <!-- Main Content -->
              <div class="flex-1">
                <div class="wireframe-quick-actions">
                  <div class="grid grid-cols-4 gap-3">
                    <div class="wireframe-action-card">
                      <div class="text-xl mb-1">📐</div>
                      <div class="h-1 bg-gray-300 rounded"></div>
                    </div>
                    <div class="wireframe-action-card">
                      <div class="text-xl mb-1">🏗️</div>
                      <div class="h-1 bg-gray-300 rounded"></div>
                    </div>
                    <div class="wireframe-action-card">
                      <div class="text-xl mb-1">🧱</div>
                      <div class="h-1 bg-gray-300 rounded"></div>
                    </div>
                    <div class="wireframe-action-card">
                      <div class="text-xl mb-1">📋</div>
                      <div class="h-1 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div class="wireframe-content">
                  <div class="space-y-3">
                    <div class="wireframe-message assistant">
                      <div class="wireframe-avatar"></div>
                      <div class="flex-1">
                        <div class="wireframe-bubble"></div>
                        <div class="wireframe-actions">
                          <div class="flex gap-2">
                            <div class="w-8 h-8 bg-gray-200 rounded"></div>
                            <div class="w-8 h-8 bg-gray-200 rounded"></div>
                            <div class="w-8 h-8 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Input Area -->
            <div class="wireframe-input">
              <div class="flex gap-3 items-center">
                <div class="wireframe-voice-btn"></div>
                <div class="flex-1 wireframe-textfield"></div>
                <div class="wireframe-send-btn"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 space-y-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-sm">Sidebar navigation</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span class="text-sm">Two-column layout</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span class="text-sm">Enhanced multitasking</span>
          </div>
        </div>
      </div>
      
      <!-- 768px Standard Tablet -->
      <div class="mobile-card">
        <h3 class="mobile-heading-3 mb-4">📱 Standard Tablet (768px)</h3>
        <div class="wireframe-container" style="max-width: 768px;">
          <div class="wireframe-frame">
            <!-- Status Bar -->
            <div class="wireframe-status-bar">
              <span class="text-xs">9:41 AM</span>
              <div class="flex gap-1">
                <span class="text-xs">📶</span>
                <span class="text-xs">📶</span>
                <span class="text-xs">🔋</span>
              </div>
            </div>
            
            <!-- Header -->
            <div class="wireframe-header">
              <div class="w-6 h-6 bg-blue-500 rounded"></div>
              <span class="text-sm font-semibold">@Architect</span>
              <div class="flex gap-2">
                <div class="w-6 h-6 bg-gray-300 rounded"></div>
                <div class="w-6 h-6 bg-gray-300 rounded"></div>
                <div class="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
            
            <!-- Content Layout -->
            <div class="flex gap-6 p-6">
              <!-- Sidebar -->
              <div class="w-56 space-y-3">
                <div class="wireframe-sidebar-item active"></div>
                <div class="wireframe-sidebar-item"></div>
                <div class="wireframe-sidebar-item"></div>
                <div class="wireframe-sidebar-item"></div>
                <div class="wireframe-sidebar-item"></div>
              </div>
              
              <!-- Main Content -->
              <div class="flex-1">
                <div class="wireframe-quick-actions">
                  <div class="grid grid-cols-4 gap-4">
                    <div class="wireframe-action-card">
                      <div class="text-2xl mb-2">📐</div>
                      <div class="h-2 bg-gray-300 rounded w-20"></div>
                      <div class="h-1 bg-gray-200 rounded w-16 mt-1"></div>
                    </div>
                    <div class="wireframe-action-card">
                      <div class="text-2xl mb-2">🏗️</div>
                      <div class="h-2 bg-gray-300 rounded w-24"></div>
                      <div class="h-1 bg-gray-200 rounded w-20 mt-1"></div>
                    </div>
                    <div class="wireframe-action-card">
                      <div class="text-2xl mb-2">🧱</div>
                      <div class="h-2 bg-gray-300 rounded w-20"></div>
                      <div class="h-1 bg-gray-200 rounded w-16 mt-1"></div>
                    </div>
                    <div class="wireframe-action-card">
                      <div class="text-2xl mb-2">📋</div>
                      <div class="h-2 bg-gray-300 rounded w-24"></div>
                      <div class="h-1 bg-gray-200 rounded w-20 mt-1"></div>
                    </div>
                  </div>
                </div>
                
                <div class="wireframe-content">
                  <div class="space-y-4">
                    <div class="wireframe-message assistant">
                      <div class="wireframe-avatar"></div>
                      <div class="flex-1">
                        <div class="wireframe-bubble"></div>
                        <div class="wireframe-actions">
                          <div class="flex gap-2">
                            <div class="w-10 h-10 bg-gray-200 rounded"></div>
                            <div class="w-10 h-10 bg-gray-200 rounded"></div>
                            <div class="w-10 h-10 bg-gray-200 rounded"></div>
                            <div class="w-10 h-10 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="wireframe-message user">
                      <div class="flex-1">
                        <div class="wireframe-bubble user"></div>
                      </div>
                      <div class="wireframe-avatar"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Input Area -->
            <div class="wireframe-input">
              <div class="flex gap-4 items-center">
                <div class="wireframe-voice-btn"></div>
                <div class="flex-1 wireframe-textfield"></div>
                <div class="wireframe-tool-btn"></div>
                <div class="wireframe-tool-btn"></div>
                <div class="wireframe-send-btn"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 space-y-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-sm">Expanded sidebar</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span class="text-sm">Desktop-like layout</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span class="text-sm">Full toolbar access</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Touch Zone Analysis -->
    <div class="mobile-card mt-8">
      <h3 class="mobile-heading-3 mb-4">👆 Touch Zone Analysis</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left-Handed Zones -->
        <div>
          <h4 class="mobile-heading-4 mb-3">Left-Handed Reach Zones</h4>
          <div class="wireframe-container" style="max-width: 375px;">
            <div class="wireframe-frame">
              <div class="relative h-96">
                <!-- Easy Reach Zone -->
                <div class="absolute bottom-0 left-0 right-0 h-32 bg-green-100 border-2 border-green-300 rounded-t-lg">
                  <div class="text-center pt-2 text-xs font-semibold text-green-700">Easy Reach</div>
                </div>
                
                <!-- Stretch Zone -->
                <div class="absolute bottom-32 left-0 right-0 h-24 bg-yellow-100 border-2 border-yellow-300">
                  <div class="text-center pt-2 text-xs font-semibold text-yellow-700">Stretch</div>
                </div>
                
                <!-- Difficult Zone -->
                <div class="absolute top-0 left-0 right-0 h-40 bg-red-100 border-2 border-red-300 rounded-b-lg">
                  <div class="text-center pt-2 text-xs font-semibold text-red-700">Difficult</div>
                </div>
                
                <!-- Thumb Arc -->
                <div class="absolute bottom-4 right-4 w-24 h-24 border-4 border-blue-300 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right-Handed Zones -->
        <div>
          <h4 class="mobile-heading-4 mb-3">Right-Handed Reach Zones</h4>
          <div class="wireframe-container" style="max-width: 375px;">
            <div class="wireframe-frame">
              <div class="relative h-96">
                <!-- Easy Reach Zone -->
                <div class="absolute bottom-0 left-0 right-0 h-32 bg-green-100 border-2 border-green-300 rounded-t-lg">
                  <div class="text-center pt-2 text-xs font-semibold text-green-700">Easy Reach</div>
                </div>
                
                <!-- Stretch Zone -->
                <div class="absolute bottom-32 left-0 right-0 h-24 bg-yellow-100 border-2 border-yellow-300">
                  <div class="text-center pt-2 text-xs font-semibold text-yellow-700">Stretch</div>
                </div>
                
                <!-- Difficult Zone -->
                <div class="absolute top-0 left-0 right-0 h-40 bg-red-100 border-2 border-red-300 rounded-b-lg">
                  <div class="text-center pt-2 text-xs font-semibold text-red-700">Difficult</div>
                </div>
                
                <!-- Thumb Arc -->
                <div class="absolute bottom-4 left-4 w-24 h-24 border-4 border-blue-300 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-wireframes {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--mobile-space-4);
}

.wireframe-container {
  margin: 0 auto;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
}

.wireframe-frame {
  position: relative;
  height: 600px;
  background: #f8fafc;
}

.wireframe-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--mobile-space-2) var(--mobile-space-4);
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.wireframe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--mobile-space-3) var(--mobile-space-4);
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.wireframe-content {
  flex: 1;
  padding: var(--mobile-space-4);
  overflow-y: auto;
}

.wireframe-quick-actions {
  padding: var(--mobile-space-4);
  background: white;
  border-bottom: 1px solid #f1f5f9;
}

.wireframe-input {
  padding: var(--mobile-space-4);
  background: white;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: var(--mobile-space-2);
  align-items: center;
}

.wireframe-nav {
  display: flex;
  justify-content: space-around;
  padding: var(--mobile-space-2) var(--mobile-space-4);
  background: white;
  border-top: 1px solid #e2e8f0;
}

.wireframe-message {
  display: flex;
  gap: var(--mobile-space-2);
  margin-bottom: var(--mobile-space-3);
}

.wireframe-message.user {
  flex-direction: row-reverse;
}

.wireframe-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e2e8f0;
  flex-shrink: 0;
}

.wireframe-bubble {
  background: #f1f5f9;
  border-radius: 1rem;
  padding: var(--mobile-space-3);
  min-height: 60px;
  position: relative;
}

.wireframe-bubble.user {
  background: #3b82f6;
}

.wireframe-bubble::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: -8px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #f1f5f9;
}

.wireframe-bubble.user::before {
  left: auto;
  right: -8px;
  border-top-color: #3b82f6;
}

.wireframe-actions {
  margin-top: var(--mobile-space-2);
  opacity: 0.7;
}

.wireframe-textfield {
  flex: 1;
  height: 44px;
  background: #f1f5f9;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.wireframe-voice-btn,
.wireframe-send-btn,
.wireframe-tool-btn {
  width: 44px;
  height: 44px;
  border-radius: 0.5rem;
}

.wireframe-voice-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.wireframe-send-btn {
  background: #3b82f6;
}

.wireframe-tool-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
}

.wireframe-nav-item {
  width: 44px;
  height: 44px;
  border-radius: 0.5rem;
  background: #f1f5f9;
}

.wireframe-nav-item.active {
  background: #3b82f6;
}

.wireframe-action-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: var(--mobile-space-3);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.wireframe-action-card:active {
  transform: scale(0.98);
}

.wireframe-sidebar-item {
  height: 44px;
  background: #f1f5f9;
  border-radius: 0.5rem;
  margin-bottom: var(--mobile-space-2);
}

.wireframe-sidebar-item.active {
  background: #3b82f6;
}
</style>
