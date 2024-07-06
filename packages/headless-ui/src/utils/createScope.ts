import { getDocument, getWindow } from './dom'

export interface ScopeContext {
  getRootNode?(): Document | ShadowRoot | Node | null
}

export const createScope = <T extends object>(methods?: T) => {
  const dom = {
    getRootNode: (ctx: ScopeContext) =>
      (ctx.getRootNode?.() ?? document) as ShadowRoot | Document,
    getDocument: (ctx: ScopeContext) => getDocument(dom.getRootNode(ctx)),
    getWindow: (ctx: ScopeContext) => getWindow(dom.getRootNode(ctx)),
    querySelector: <E extends HTMLElement>(ctx: ScopeContext, query: string) =>
      dom.getRootNode(ctx).querySelector<E>(query),
  }

  return { ...dom, ...methods } as typeof dom & T
}
