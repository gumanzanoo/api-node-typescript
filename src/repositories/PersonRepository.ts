import {AppDataSource} from "../database/AppDataSource";
import {Person} from "../entities/Person";

const personRepository = AppDataSource.getMongoRepository(Person).extend({})

export {personRepository}