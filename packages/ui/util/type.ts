import { AnimatePresenceProps } from 'framer-motion'
import { getDefaultConfig } from 'tailwind-merge'
import { ValueOf } from 'type-fest'

export type AnyObject = Record<PropertyKey, any>

export type CustomComponent<P = AnyObject> = React.ComponentType<P> | string

export type GetTailwindVariant<
  T extends keyof ReturnType<typeof getDefaultConfig>['classGroups'],
> = ValueOf<ReturnType<typeof getDefaultConfig>['classGroups'][T][0]>

export type Prefix<Prefix extends string, T extends string> = `${Prefix}${T}`

export interface NewAnimatePresenceProps
  extends Omit<AnimatePresenceProps, 'children'> {
  children: React.ReactNode
}

export interface Animation {
  initial?: object
  mount?: object
  unmount?: object
}
