import Item from '../entities/item';

export default interface ItemRepository {
    getById(id: number): Item | undefined;
}