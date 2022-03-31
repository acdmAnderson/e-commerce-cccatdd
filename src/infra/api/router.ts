import RepositoryFactory from '../../domain/factories/repository-factory';
import PlaceOrderController from '../controllers/orders/place-order.controller';
import Http from './http';

export default class Router {

    constructor(private readonly http: Http, private readonly repositoryFactory: RepositoryFactory) { }

    init() {
        this.http.route('post', '/orders', async (_params: any, body: any) => {
            const controller = new PlaceOrderController(this.repositoryFactory);
            return await controller.create(body);
        })
    }
}