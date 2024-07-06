export interface UseCheckboxProps {
  checked?: boolean
  onChange?: (detail: CheckboxCurrentState) => void
  name?: string
  indeterminate?: boolean
  disabled?: boolean
  ids?: Partial<ElementIds>
  getRootNode?: () => ShadowRoot | Document | Node | null
}

export type CheckboxCurrentState = Required<
  Pick<UseCheckboxProps, 'checked' | 'indeterminate'>
>

export type ElementIds = {
  root: string
  input: string
  label: string
}
