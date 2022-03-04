import Item from './item';

export default interface ItemRepository {
    getById(id: number): Item | undefined;
}