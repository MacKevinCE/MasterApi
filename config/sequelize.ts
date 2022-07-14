import {Sequelize} from 'sequelize';
import fs from 'fs'

const options = JSON.parse(fs.readFileSync('./config/configPostgres.json', 'utf-8'))
const sequelize = new Sequelize(options)

export default sequelize;

// sequelize-auto
// --output ./models
// --config ./config/configPostgres.json
// --lang ts
// --views false
// --caseProp c
// --caseModel p
// --caseFile c

