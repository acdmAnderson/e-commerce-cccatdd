import PlaceOrder from '../../../application/usecases/place-order/place-order'
import PlaceOrderInput from '../../../application/usecases/place-order/place-order.input'
import PlaceOrderOutput from '../../../application/usecases/place-order/place-order.output'
import RepositoryFactory from '../../../domain/factories/repository-factory'

export default class PlaceOrderController {
  constructor (private readonly repositoryFactory: RepositoryFactory) { }

  async create (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const placeOrder = new PlaceOrder(this.repositoryFactory)
    return await placeOrder.execute({ ...input, issueDate: new Date(input.issueDate) })
  }
}
