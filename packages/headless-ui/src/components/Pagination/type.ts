export interface UsePaginationProps {
  currentPage?: number
  defaultCurrentPage?: number
  onChange?: (currentPage: number) => void
  ids?: Partial<ElementIds>
  getRootNode?: () => ShadowRoot | Document | Node | null
  pageSize: number
  count: number
  siblingCount: number
}

export interface ElementIds {
  root: string
  rightArrow: string
  leftArrow: string
  item: (index: number) => string
  ellipsis: (index: number) => string
}

export interface ScopeAttribute {
  'data-scope': string
  'data-part': string
}
