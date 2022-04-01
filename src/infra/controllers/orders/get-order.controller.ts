import GetOrder from '../../../application/usecases/get-order/get-order';
import GetOrderInput from '../../../application/usecases/get-order/get-order.input';
import GetOrderOutput from '../../../application/usecases/get-order/get-order.output';
import RepositoryFactory from '../../../domain/factories/repository-factory';

export default class GetOrderController {

    constructor(private readonly repositoryFactory: RepositoryFactory) { }

    async get(input: GetOrderInput): Promise<GetOrderOutput> {
        const getOrder = new GetOrder(this.repositoryFactory.createOrderRepository());
        return await getOrder.execute(input);
    }
}