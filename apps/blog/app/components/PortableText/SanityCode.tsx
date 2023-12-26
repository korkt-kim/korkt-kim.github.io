import './sanityCode.css'

import { CodeInputValue } from '@sanity/code-input/lib'
import { uniqueId } from 'lodash-es'
import Refractor, { hasLanguage, registerLanguage } from 'react-refractor'
import basic from 'refractor/lang/basic'
import batch from 'refractor/lang/batch'
import js from 'refractor/lang/javascript'
import ts from 'refractor/lang/typescript'

registerLanguage(basic)
registerLanguage(js)
registerLanguage(ts)
registerLanguage(batch)

export type SanityCodeProps = CodeInputValue

export const SanityCode = (props: SanityCodeProps) => {
  if (!props.language || !props.code) {
    return null
  }

  return (
    <Refractor
      key={uniqueId()}
      language={hasLanguage(props.language) ? props.language : 'basic'}
      value={props.code}
      markers={props.highlightedLines}
    />
  )
}
