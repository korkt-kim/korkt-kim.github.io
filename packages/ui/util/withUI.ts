import { merge } from 'lodash-es'

export const withUI = (asdf: any) => {
  return merge({}, asdf, {
    content: [],
    theme: {
      extend: {},
    },
    plugins: [],
  })
}
