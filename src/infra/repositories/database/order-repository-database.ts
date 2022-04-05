import Coupon from '../../../domain/entities/coupon'
import Dimension from '../../../domain/entities/dimension'
import Item from '../../../domain/entities/item'
import Order from '../../../domain/entities/order'
import OrderRepository from '../../../domain/repositories/order.repository'
import Connection from '../../database/connection'

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor (private readonly connection: Connection) { }

  async clean (): Promise<void> {
    await this.connection.query('DELETE FROM ccca.order;', [])
    await this.connection.query('DELETE FROM ccca.order_item;', [])
  }

  async save (order: Order): Promise<void> {
    const params = [order.getCoupon()?.code, order.getCode(), order.cpf.getValue(), order.issueDate, order.getFreight().getValue(), order.sequence, order.getTotal()]
    const result = await this.connection.query('INSERT INTO ccca.order (coupon, code, cpf, issue_date, freight, sequence, total) values ($1, $2, $3, $4, $5, $6, $7) returning *;', params)
    const [orderDate] = result.rows
    for (const { idItem, price, quantity } of order.orderItems) {
      await this.connection.query('INSERT INTO ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4);', [orderDate.id_order, idItem, price, quantity])
    }
  }

  async count (): Promise<number> {
    const result = await this.connection.query('SELECT COUNT(*)::int FROM ccca.order;', [])
    const [{ count }] = result.rows
    return count
  }

  async getByCode (code: string): Promise<Order | undefined> {
    const orderResult = await this.connection.query('SELECT * FROM ccca.order o WHERE o.code = $1;', [code])
    const [orderData] = orderResult.rows
    if (!orderData) return undefined
    return await this.getOrder(orderData)
  }

  private async getOrder (orderData: { id_order: number, cpf: string, issue_date: Date, sequence: number, coupon: string }): Promise<Order> {
    const orderItemsResult = await this.connection.query('SELECT * FROM ccca.order_item oi WHERE oi.id_order = $1;', [orderData.id_order])
    const orderItemsData = orderItemsResult.rows
    const order = new Order(orderData.cpf, orderData.issue_date, orderData.sequence)
    for (const { id_item, quantity } of orderItemsData) {
      const itemResult = await this.connection.query('SELECT * FROM ccca.item i WHERE i.id_item = $1;', [id_item])
      const [itemData] = itemResult.rows
      order.addItem(new Item(itemData.id_item, itemData.category, itemData.description, itemData.price, new Dimension(itemData.height, itemData.width, itemData.length), itemData.weight), quantity)
    }
    if (orderData.coupon) {
      const couponResult = await this.connection.query('SELECT * FROM ccca.coupon c WHERE c.code = $1;', [orderData.coupon])
      const [couponData] = couponResult.rows
      order.addCoupon(new Coupon(couponData.code, couponData.percentage, couponData.expire_date))
    }
    return order
  }

  async getAll (): Promise<Order[]> {
    const orderResult = await this.connection.query('SELECT * FROM ccca.order', [])
    const ordersData: any[] = orderResult.rows
    if (!ordersData.length) return []
    const orders = []
    for (const orderData of ordersData) {
      orders.push(await this.getOrder(orderData))
    }
    return orders
  }
}
