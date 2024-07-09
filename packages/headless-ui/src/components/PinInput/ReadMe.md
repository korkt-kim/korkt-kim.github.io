![pin-input statemachine](<스크린샷 2024-07-09 오후 9.34.56.png>)

# PinInput

## Features

- Automatically focuses the next field on typing and focuses the previous field on deletion.
- Support for masking value (for sensitive data).
- Support for copy/paste to autofill all fields.
- Syncs with disabled state of fieldset

## Methods and Properties

### usePinInput

- length

  - `number`
  - required
  - The number of inputs

- ids

  - `Partial<{ root: string; input: string; label: string; }>`
  - The ids of the elements in the pin-input. Useful for composition.

- disabled

  - `boolean`
  - Whether the pin-input is disabled.

- value

  - `string`
  - The input value of pin-input

- defaultValue

  - `string`
  - The default input value of pin-input

- password

  - `boolean``
  - If `true`, the value of input will be masked just like `type=password`

- onChange

  - `(value: string) => void`
  - The callback invoked when the input value of pin-input changes.

- onComplete

  - `(value: string) => void`
  - The callback invoked when the input value of pin-input is fully filled.

- name

  - `string`
  - The name of the input field in a pin-input. Useful for form submission.

- getRootNode

  - `() => ShadowRoot | Node | Document`
  - A root node to correctly resolve document in custom environments.

### usePinInputMachine

- length

  - `number`
  - required
  - The number of inputs

- ids

  - `Partial<{ root: string; input: string; label: string; }>`
  - The ids of the elements in the pin-input. Useful for composition.

- disabled

  - `boolean`
  - Whether the pin-input is disabled.

- value

  - `string`
  - The input value of pin-input

- defaultValue

  - `string`
  - The default input value of pin-input

- password

  - `boolean``
  - If `true`, the value of input will be masked just like `type=password`

- onChange

  - `(value: string) => void`
  - The callback invoked when the input value of pin-input changes.

- onComplete

  - `(value: string) => void`
  - The callback invoked when the input value of pin-input is fully filled.

- name

  - `string`
  - The name of the input field in a pin-input. Useful for form submission.

- getRootNode

  - `() => ShadowRoot | Node | Document`
  - A root node to correctly resolve document in custom environments.
