export interface UsePinInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  name?: string
  disabled?: boolean
  ids?: Partial<ElementIds>
  getRootNode?: () => ShadowRoot | Document | Node | null
  onComplete?: (value: string) => void
  length: number
  password?: boolean
}

export interface ElementIds {
  root: string
  label: string
  input: string
}

export interface ScopeAttribute {
  'data-scope': string
  'data-part': string
}
