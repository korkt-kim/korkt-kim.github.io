import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface CommentStore {
  username: string
  password: string
  setUsername: (username: string) => void
  setPassword: (password: string) => void
}

export const useCommentStore = create<CommentStore>()(
  devtools(
    persist(
      set => ({
        username: '',
        password: '',
        setUsername: (username: string) => set(() => ({ username })),
        setPassword: (password: string) => set(() => ({ password })),
      }),
      { name: 'commentStore' }
    )
  )
)
