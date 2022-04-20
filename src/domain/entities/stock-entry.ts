export default class StockEntry {
  constructor (
        readonly idItem: number,
        readonly operation: string,
        readonly quantity: number,
        readonly date = new Date()
  ) {
    if (!['in', 'out'].some((operation) => this.operation === operation)) throw new Error('Operation not exists')
  }
}
