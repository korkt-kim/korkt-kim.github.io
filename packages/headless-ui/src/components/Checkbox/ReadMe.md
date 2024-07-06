![checkbox statemachine](<스크린샷 2024-07-06 오후 9.09.56.png>)

# Checkbox

## Features

- Can be toggled programmatically. state changes even though disabled.
- Can be indeterminate programmatically. state changes even though disabled.
- Syncs with disabled state of fieldset

## Methods and Properties

### useCheckbox

- ids

  - `Partial<{ root: string; input: string; label: string; }>`
  - The ids of the elements in the checkbox. Useful for composition.

- disabled

  - `boolean`
  - Whether the checkbox is disabled.

- checked

  - `boolean`
  - Whether the checkbox is checked.

- indeterminate

  - `boolean`
  - Whether the checkbox is indeterminate.

- onChange

  - `(details: ({checked:boolean, indeterminate: boolean})) => void`
  - The callback invoked when the indeterminate(prgramatically)/checked state changes.

- name

  - `string`
  - The name of the input field in a checkbox. Useful for form submission.

- getRootNode

  - `() => ShadowRoot | Node | Document`

  - A root node to correctly resolve document in custom environments.

- setChecked

  - `(checked:boolean) => void`
  - Function to set the checked state of the checkbox

- setIndeterminate

  - `(indeterminate: boolean) => void`
  - Function to set the indeterminate state of the checkbox

### useCheckboxMachine

- ids

  - `Partial<{ root: string; input: string; label: string; }>`
  - The ids of the elements in the checkbox. Useful for composition.

- disabled

  - `boolean`
  - Whether the checkbox is disabled.

- checked

  - `boolean`
  - Whether the checkbox is checked.

- indeterminate

  - `boolean`
  - Whether the checkbox is indeterminate.

- onChange

  - `({checked:boolean, indeterminate: boolean}) => void`
  - The callback invoked when the indeterminate(prgramatically)/checked state changes.

- name

  - `string`
  - The name of the input field in a checkbox. Useful for form submission.

- getRootNode

  - `() => ShadowRoot | Node | Document`

  - A root node to correctly resolve document in custom environments.
