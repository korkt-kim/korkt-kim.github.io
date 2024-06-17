'use client'
import { FloatingContext, ReferenceType, Strategy } from '@floating-ui/react'
import { createContext, HTMLProps, ReactNode, Ref, useContext } from 'react'

import { Animation } from '../../util/type'

export interface ContextValue {
  open?: boolean
  strategy: Strategy
  x?: number
  y?: number
  context: FloatingContext<ReferenceType>
  reference: Ref<HTMLDivElement> | null
  floating: Ref<HTMLDivElement> | null
  getReferenceProps: (userProps?: HTMLProps<Element>) => any
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => any
  appliedAnimation: Animation
  labelId: string
  descriptionId: string
}

export interface PopoverContextProviderProps {
  value: ContextValue
  children: ReactNode
}

export const PopoverContext = createContext<ContextValue | null>(null)
PopoverContext.displayName = 'PopoverContext'

export function usePopover() {
  const context = useContext(PopoverContext)

  if (!context) {
    throw new Error(
      'usePopover() must be used within a Popover. It happens when you use PopoverHandler or PopoverContent components outside the Popover component.'
    )
  }

  return context
}

export const PopoverContextProvider = ({
  value,
  children,
}: PopoverContextProviderProps) => {
  return (
    <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
  )
}

PopoverContextProvider.displayName = 'PopoverContextProvider'
