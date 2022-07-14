import Server from "./server";
import {port} from './environment'
import sequelize from './config/sequelize';
import {initModels} from "./models/init-models";

console.clear()

console.info("[[-START TEST-]]")
sequelize.authenticate().then(() => {
    console.info("[Database online]")
    initModels(sequelize)
    new Server(port).start();
}).catch((err) => {
    console.error("[Error connection Database]: ", err.message);
    console.assert();
}).finally(() => {
    console.info("[[-END TEST-]]")
})