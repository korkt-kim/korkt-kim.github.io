import { devtools, persist } from 'zustand/middleware'

export const persistWithDevtools = (...props: Parameters<typeof persist>) =>
  devtools(persist(...props))
