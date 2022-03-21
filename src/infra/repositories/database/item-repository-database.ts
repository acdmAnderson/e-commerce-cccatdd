import Dimension from '../../../domain/entities/dimension';
import Item from '../../../domain/entities/item';
import ItemRepository from '../../../domain/repositories/item.repository';
import Connection from '../../database/connection';

export default class ItemRepositoryDatabase implements ItemRepository {

    constructor(private readonly connection: Connection) {}

    async getById(id: number): Promise<Item | undefined> {
        const result = await this.connection.query(`SELECT * FROM ccca.item i where i.id_item = ${id}`, []);
        const [data] = result.rows;
        return new Item(data.id_item, data.category, data.description, data.price, new Dimension(data.height, data.width, data.length), data.weight);
    }
    
}