import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type LineProfile = {
  userId?: string
  displayName?: string
  pictureUrl?: string
  statusMessage?: string
}

type LineToken = {
  access_token?: string
  expires_in?: number
  id_token?: string
  refresh_token?: string
  scope?: string
  token_type?: string
}

type AuthState = {
  profile: LineProfile | null
  token: LineToken | null
  isAuthenticated: boolean
  setAuth: (profile: LineProfile, token: LineToken) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      token: null,
      isAuthenticated: false,
      setAuth: (profile, token) => set({ profile, token, isAuthenticated: true }),
      clearAuth: () => set({ profile: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'line-auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
