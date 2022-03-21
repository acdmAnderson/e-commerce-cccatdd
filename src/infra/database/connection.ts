export default interface Connection {

    connect(): Promise<void>

    query(stmt: string, params: any): Promise<any>;

    isAlive(): Promise<boolean>;

    close(): Promise<void>;
}