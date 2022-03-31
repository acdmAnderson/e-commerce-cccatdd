type Method = 'post' | 'get' | 'put' | 'delete' | 'patch';

export default interface Http {
    route(method: Method, url: string, callback: any): Promise<any>;
    listen(port: number): Promise<void>
}