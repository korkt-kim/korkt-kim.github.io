import { getDefaultConfig } from 'tailwind-merge'
import { ValueOf } from 'type-fest'

export type AnyObject = Record<PropertyKey, any>

export type CustomComponent<P = AnyObject> = React.ComponentType<P> | string

export type GetTailwindVariant<
  T extends keyof ReturnType<typeof getDefaultConfig>['classGroups'],
> = ValueOf<ReturnType<typeof getDefaultConfig>['classGroups'][T][0]>
