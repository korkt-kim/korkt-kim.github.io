export interface Response<T> {
  items: Partial<T>[]
  totalCount: number
}
