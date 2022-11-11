import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
dotenv.config()
// "sql10.freemysqlhosting.net",
// "sql10557372",
// "iLX7Eep4fh",
// "sql10557372",

console.log("Espere mientras se inicia la BD...")

export const MysqlDataSource = new DataSource({
    type: "mysql",
    port: 3306,
    host: process.env.HOST || "",
    username: process.env.USERDB || "",
    password: process.env.PASS || "",
    database: process.env.DB || "",
    synchronize: true,
    entities: [
        "dist/entities/**/*.js",
        "src/entities/**/*.ts"
    ],
})

