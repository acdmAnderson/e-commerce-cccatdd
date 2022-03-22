import OrderRepository from '../../../domain/repositories/order.repository';
import GetOrderInput from './get-order.input';
import GetOrderOutput from './get-order.output'

export default class GetOrder {
    
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(input: GetOrderInput): Promise<GetOrderOutput> {
        const order = await this.orderRepository.getByCode(input.code);
        return new GetOrderOutput(order.getCode(), order.getTotal());
    }
}