/** Your uploaded performance video */
export const PERFORMANCE_SRC = `${import.meta.env.BASE_URL}audio/IMG_3039.mov`
export const AUDIO_VOLUME = 0.4

/**
 * Bind playback controls to a visible <video> element (React ref).
 * Shows you playing — not a hidden audio-only tag.
 */
export function createVideoController(getVideoEl) {
  return {
    async start() {
      const el = getVideoEl()
      if (!el) return false
      el.loop = true
      el.playsInline = true
      el.volume = AUDIO_VOLUME
      el.muted = false
      try {
        await el.play()
        return true
      } catch {
        return false
      }
    },
    stop() {
      const el = getVideoEl()
      if (!el) return
      el.pause()
      el.currentTime = 0
    },
    setMuted(muted) {
      const el = getVideoEl()
      if (!el) return
      el.muted = muted
      if (!muted && el.paused) {
        void el.play().catch(() => {})
      }
    },
    isPlaying() {
      const el = getVideoEl()
      return Boolean(el && !el.paused && !el.muted)
    },
  }
}
