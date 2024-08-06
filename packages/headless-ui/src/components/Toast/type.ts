import { Dispatch } from 'react'

export type Type = 'error' | 'success' | 'info' | 'loading' | 'custom'
export type Placement =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'

export interface UseToastGroupProps {
  maxCount: number // Max Notification show, drop oldest if exceed limit
  placement: Placement
  duration: number
  getRootNode?: () => ShadowRoot | Document | Node | null
}

export type ToastItemState = 'unmounted' | 'visible' | 'persisting' | 'updating'

export interface ToastItemOption {
  id: string
  type: Type
  duration: number
  placement: Placement
  title?: string
  description?: string
}

export type ToastController =
  | { type: 'CLOSE'; id: string }
  | { type: 'OPEN'; option: Omit<ToastItemOption, 'id'> }
  | { type: 'PERSIST_ALL'; placement: Placement }
  | { type: 'RELEASE_PERSIST_ALL'; placement: Placement }

export interface UseToastItemProps {
  toastId: string
  persistingPlacements: Placement[]
  defaultDuration: number
  type: Type
  duration: number
  placement: Placement
  controller: Dispatch<ToastController>
  index: number
  ids?: Partial<ElementIds>
  getRootNode?: () => ShadowRoot | Document | Node | null
  translation?: Partial<Translation>
}

export interface Translation {
  rootLabel: string
  closeLabel: string
}

export interface ElementIds {
  root: string
  title: string
  description: string
  close: string
}

export interface ScopeAttribute {
  'data-scope': string
  'data-part': string
}
