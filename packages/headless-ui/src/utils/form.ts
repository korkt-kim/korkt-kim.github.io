export const trackFieldsetDisabled = (
  el: HTMLElement,
  callback: (disabled: boolean) => void
) => {
  const fieldset = el.closest('fieldset')

  if (!fieldset) {
    return
  }

  const win = fieldset.ownerDocument.defaultView || window
  const observer = new win.MutationObserver(() => callback(fieldset.disabled))

  observer.observe(fieldset, {
    attributes: true,
  })

  const disconnect = () => {
    observer.disconnect()
  }

  return { disconnect }
}
