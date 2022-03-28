import OrderRepository from '../../../domain/repositories/order.repository';
import GetOrderOutput from '../get-order/get-order.output';

export default class GetAllOrders {
    constructor(private readonly orderRepository: OrderRepository) { }

    async execute(): Promise<GetOrderOutput[]> {
        const orders = await this.orderRepository.getAll();
        return orders.map((order) => new GetOrderOutput(order.getCode(), order.getTotal()));
    }
}