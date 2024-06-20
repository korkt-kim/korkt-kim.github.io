import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface SidebarStore {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useSidebarStore = create<SidebarStore>()(
  devtools(set => ({
    isOpen: true,
    setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
  }))
)
