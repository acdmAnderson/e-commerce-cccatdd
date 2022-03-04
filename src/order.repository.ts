import Order from './order';

export default interface OrderRepository {
    save(order: Order): void;
}