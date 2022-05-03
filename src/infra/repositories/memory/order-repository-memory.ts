import Order from '../../../domain/entities/order'
import OrderRepository from '../../../domain/repositories/order.repository'

export default class OrderRepositoryMemory implements OrderRepository {
  private orders: Order[]
  constructor () {
    this.orders = []
  }

  async getByCode (code: string): Promise<Order | undefined> {
    return this.orders.find((order) => order.getCode() === code)
  }

  async save (order: Order): Promise<void> {
    this.orders.push(order)
  }

  async count (): Promise<number> {
    return this.orders.length
  }

  async clean (): Promise<void> {
    this.orders = []
  }

  async getAll (): Promise<Order[]> {
    return this.orders
  }
}
