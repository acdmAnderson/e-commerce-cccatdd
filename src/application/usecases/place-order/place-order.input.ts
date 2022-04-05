export default class PlaceOrderInput {
  constructor (
        readonly cpf: string,
        readonly items: { idItem: number, quantity: number }[],
        readonly issueDate: Date = new Date(),
        readonly coupon?: string
  ) { }
}
