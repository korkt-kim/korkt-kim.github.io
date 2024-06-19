export interface TocElement {
  tag: Element['tagName']
  tocRef: string
  text?: Element['textContent']
  children?: TocElement[]
  active?: boolean
}
