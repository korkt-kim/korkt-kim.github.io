export const toReference = (id: string) => {
  return {
    _ref: id,
    _type: 'reference',
  }
}
