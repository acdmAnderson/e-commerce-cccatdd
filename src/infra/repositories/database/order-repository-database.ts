import Order from '../../../domain/entities/order';
import OrderRepository from '../../../domain/repositories/order.repository';
import Connection from '../../database/connection';

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor(private readonly connection: Connection) { }

    async clean(): Promise<void> {
        await this.connection.query('DELETE FROM ccca.order;', []);
        await this.connection.query('DELETE FROM ccca.order_item;', [])
    }

    async save(order: Order): Promise<void> {
        const params = [order.getCoupon(), order.getCode(), order.cpf.getValue(), order.issueDate, order.getFreight().getValue(), order.sequence, order.getTotal()];
        const result = await this.connection.query('INSERT INTO ccca.order (coupon, code, cpf, issue_date, freight, sequence, total) values ($1, $2, $3, $4, $5, $6, $7) returning *;', params);
        const [orderDate] = result.rows;
        for (const { idItem, price, quantity } of order.orderItems) {
            await this.connection.query('INSERT INTO ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)', [orderDate.id_order, idItem, price, quantity]);
        }
    }

    async count(): Promise<number> {
        const result = await this.connection.query('SELECT COUNT(*)::int FROM ccca.order;', []);
        const [{ count }] = result.rows;
        return count;
    }

}