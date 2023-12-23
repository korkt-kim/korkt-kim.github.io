import { ComponentProps, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typo } from '../Typo'

export function Card({
  className,
  title,
  children,
  ...rest
}: {
  title: string
} & PropsWithChildren<ComponentProps<'div'>>): JSX.Element {
  return (
    <div
      className={twMerge('border-r border border-solid p-[20px]', className)}
      {...rest}>
      <Typo.Title>{title}</Typo.Title>
      {children}
    </div>
  )
}
