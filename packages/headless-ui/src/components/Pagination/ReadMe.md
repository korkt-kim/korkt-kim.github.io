![pagination state-machine](<스크린샷 2024-07-16 오전 12.27.21.png>)

# Pagination

## Features

- Automatically focuses the next field on typing and focuses the previous field on deletion.
- Support for masking value (for sensitive data).
- Support for copy/paste to autofill all fields.
- Syncs with disabled state of fieldset

## Methods and Properties

### usePagination

- pageSize

  - `number`
  - required
  - Total number of data items

- count

  - `number`
  - required
  - Whether the pagination is disabled.

- siblingCount

  - `number`
  - required
  - Number of pages to show beside active page

- ids

  - `Partial<{ root: string; rightArrow: string; leftArrow: string; item: (index:number)=> string; ellipsis: (index:number) => string; }>`
  - The ids of the elements in the pagination. Useful for composition.

- currentPage

  - `number`
  - The active page

- defaultCurrentPage

  - `number`
  - Default initial page number

- onChange

  - `(page:number)=>void`
  - The callback invoked when the currentPage of pagination changes.

- translation

  - `Partial<{rootLabel: string; leftArrowLabel: string; rightArrowLabel: string; itemLabel: (props: { page: number, totalPages: number,currentPage: number }) => string}>`
  - Specifies the localized strings that identifies the accessibility elements and their states.

- setPage

  - `(page:number) => void`
  - Function to set the current page.

- getRootNode

  - `() => ShadowRoot | Node | Document`
  - A root node to correctly resolve document in custom environments.

### usePaginationMachine

- pageSize

  - `number`
  - required
  - Total number of data items

- count

  - `number`
  - required
  - Whether the pagination is disabled.

- siblingCount

  - `number`
  - required
  - Number of pages to show beside active page

- ids

  - `Partial<{ root: string; rightArrow: string; leftArrow: string; item: (index:number)=> string; ellipsis: (index:number) => string; }>`
  - The ids of the elements in the pagination. Useful for composition.

- currentPage

  - `number`
  - The active page

- defaultCurrentPage

  - `number`
  - Default initial page number

- onChange

  - `(page:number)=>void`
  - The callback invoked when the currentPage of pagination changes.

- translation

  - `Partial<{rootLabel: string; leftArrowLabel: string; rightArrowLabel: string; itemLabel: (props: { page: number, totalPages: number,currentPage: number }) => string}>`
  - Specifies the localized strings that identifies the accessibility elements and their states.

- getRootNode

  - `() => ShadowRoot | Node | Document`
  - A root node to correctly resolve document in custom environments.
