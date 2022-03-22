import Order from '../entities/order';

export default interface OrderRepository {
    save(order: Order): Promise<void>;

    count(): Promise<number>;

    clean(): Promise<void>;
}