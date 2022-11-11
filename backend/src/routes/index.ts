import express from 'express';
import fs from 'fs'
// import user from "./user"

const router = express.Router()
const PATH_ROUTER = __dirname

const cleanFileName = (fileName) => {
    const clean = fileName.split('.').shift();
    return clean
}

fs.readdirSync(PATH_ROUTER).forEach(async filepath => {
    const prefixRoute = cleanFileName(filepath)
    if (prefixRoute !== 'index') {
        const dynamicImport = await import(`./${prefixRoute}.ts`)
        const typedDefaultImport = dynamicImport.default
        router.use(`/${prefixRoute}`, typedDefaultImport);
    }
})

// router.use('/user', user);

export default router;
