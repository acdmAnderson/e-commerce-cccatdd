import GetOrderInput from '../../application/usecases/get-order/get-order.input'
import RepositoryFactory from '../../domain/factories/repository-factory'
import GetOrderController from '../controllers/orders/get-order.controller'
import PlaceOrderController from '../controllers/orders/place-order.controller'
import Http from './http'

export default class Router {
  constructor (private readonly http: Http, private readonly repositoryFactory: RepositoryFactory) { }

  init () {
    this.http.route('post', '/orders', async (_params: any, body: any) => {
      const controller = new PlaceOrderController(this.repositoryFactory)
      return await controller.create(body)
    })

    this.http.route('get', '/orders/:code', async (params: any) => {
      const controller = new GetOrderController(this.repositoryFactory)
      return await controller.get(new GetOrderInput(params.code))
    })
  }
}
