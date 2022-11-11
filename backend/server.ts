import express from 'express';
import cors from 'cors';
import router from './src/routes'
import * as dotenv from 'dotenv'
import { MysqlDataSource } from './src/config/ormconfig';
dotenv.config()
// const result = dotenv.config({path: __dirname + '/.env'})

const startServer = async () => {
    try {

        const app = express();
        app.options('*', cors())
        app.use(cors());

        app.use(express.json({ limit: '500mb' }));
        app.use(express.urlencoded({ limit: '500mb' }));

        const port: string | number = process.env.PORT || 9000;

        app.use('/v1', router)

        await MysqlDataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            })



        app.listen(port, () => {
            console.log(`Server is listening on ${port}`);
        });

    } catch (error) {
        console.log('Server Error :', error);
    }
};
startServer();