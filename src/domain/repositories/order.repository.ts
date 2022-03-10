import Order from '../entities/order';

export default interface OrderRepository {
    save(order: Order): void;

    count(): number;
}