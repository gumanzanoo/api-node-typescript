import {Router} from "express";
import {PersonController} from "../PersonController";

const personRouter = Router();
const personController = new PersonController();

personRouter.use(personController.validate);

personRouter.post('/', personController.create);
personRouter.get('/', personController.getAll);
personRouter.get('/:id', personController.getById);
personRouter.put('/:id', personController.update);
personRouter.delete('/:id', personController.delete);

export {personRouter}