import Http from './http';
import express, { Application, Request, Response } from 'express';

export default class ExpressHttp implements Http {
    readonly app: Application;

    constructor() {
        this.app = express();
        this.app.use(express.json())
    }

    async route(method: 'post' | 'get' | 'put' | 'delete' | 'patch', url: string, callback: any): Promise<any> {
        return this.app[method](url, async (req: Request, res: Response) => {
            try {
                const result = await callback(req.params, req.body);
                res.json(result);
            } catch (error: any) {
                console.error(error.message);
                res.json(error);
            }
        });
    }

    async listen(port: number): Promise<void> {
        this.app.listen(port, () => console.log(`Server running at http://locaslhost:${port}`));
    }

}