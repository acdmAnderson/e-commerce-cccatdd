export default interface Connection {

    connect(): Promise<void>

    query(stmp: string, params: any): Promise<any>;

    isAlive(): Promise<boolean>;

    close(): Promise<void>;
}