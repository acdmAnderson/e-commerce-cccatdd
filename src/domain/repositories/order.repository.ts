import Order from '../entities/order'

export default interface OrderRepository {

    getByCode(code: string): Promise<Order | undefined>;

    save(order: Order): Promise<void>;

    count(): Promise<number>;

    clean(): Promise<void>;

    getAll(): Promise<Order[]>;
}
