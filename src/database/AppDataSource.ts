import {DataSource} from "typeorm";

const AppDataSource = new DataSource({
    type: 'mongodb',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    synchronize: true,
    entities: ['./src/entities/*.ts'],
    useUnifiedTopology: true
})

export {AppDataSource}