/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TTS_WORKER_URL: string
  readonly VITE_LLM_WORKER_URL: string
  readonly VITE_ENABLE_VOICE_INPUT: string
  readonly VITE_ENABLE_OFFLINE: string
  readonly VITE_ENABLE_PUSH_NOTIFICATIONS: string
  readonly VITE_DEV_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
