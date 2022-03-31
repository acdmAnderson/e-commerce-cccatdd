import ExpressHttp from './infra/api/express.http';
import Router from './infra/api/router';
import PostgreSQLConnectionAdapter from './infra/database/postgres-connection';
import DatabaseRepositoryFactory from './infra/factories/database-repository-factory';

const main = async (): Promise<void> => {
    const http = new ExpressHttp();
    const connection = new PostgreSQLConnectionAdapter();
    await connection.connect()
    const repository = new DatabaseRepositoryFactory(connection);
    const router = new Router(http, repository);
    router.init();
    http.listen(9001);
    process.on('SIGINT', async () => {
        await connection.close();
        console.log('Process is finishing');
        process.exit();
    })
}

main();