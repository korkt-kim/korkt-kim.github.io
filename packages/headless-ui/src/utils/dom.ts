export const getDocument = (el: Element | Window | Node | Document) => {
  if (isDocument(el)) {
    return el
  }

  if (isWindow(el)) {
    return el.document
  }

  // iframe 내 element의 ownerDocument는 iframe scope document
  return el.ownerDocument ?? document
}

export const getWindow = (
  el: ShadowRoot | Node | Document
): (Window & typeof window) | null => {
  // iframe 내 document의 window는 iframe scope window
  if (isShadowRoot(el)) {
    return getWindow(el.host)
  }

  if (isDocument(el)) {
    return el.defaultView
  }

  return window
}

export const isDocument = (el: unknown): el is Document => {
  if (!(el instanceof Document)) {
    return false
  }

  return el.nodeType === Node.DOCUMENT_NODE
}

export const isWindow = (el: unknown): el is Window => {
  if (!(el instanceof Window)) {
    return false
  }

  return el.window === el
}

export const isShadowRoot = (el: unknown): el is ShadowRoot => {
  // https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
  if (!(el instanceof ShadowRoot)) {
    return false
  }

  return el.nodeType === Node.DOCUMENT_FRAGMENT_NODE
}

export const isNode = (el: unknown): el is Node => {
  if (!(el instanceof Node)) {
    return false
  }

  return true
}

export const isElement = (el: unknown): el is Element => {
  if (!(el instanceof Element)) {
    return false
  }

  return el.nodeType === Node.ELEMENT_NODE
}
