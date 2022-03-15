export default interface Connection {
    query(stmp: string, params: any): Promise<any>;

    isAlive(): Promise<boolean>;

    close(): Promise<void>;
}