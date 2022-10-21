import {NextFunction, Request, Response} from "express";
import {Person} from "./src/entities/Person";
import {personRepository} from "./src/repositories/PersonRepository";
import {ObjectID} from "mongodb";
import * as yup from 'yup';

class PersonController {

    async validate(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'POST' || req.method === 'PUT') {
            try {
                const schema = yup.object().shape({
                    firstName: yup.string().required(),
                    lastName: yup.string().required(),
                    phone: yup.string().required(),
                    email: yup.string().email().required(),
                    cpf: yup.string().required()
                });

                await schema.validate(req.body, {abortEarly: false});
            } catch (err) {
                return res.status(422).json({
                    message: "Invalid Data!",
                    error: err
                })
            }
        }
        next();
    }

    async create(req: Request, res: Response) {

        const {firstName, lastName, phone, email, cpf} = req.body;

        let person = new Person(firstName, lastName, phone, email, cpf);

        person = await personRepository.save(person);

        return res.status(201).json(person);
    }

    async getAll(req: Request, res: Response) {
        const persons = await personRepository.find();

        if (!persons) {
            return res.status(404).json({message: 'No persons founded'});
        }

        return res.status(200).json(persons);
    }

    async getById(req: Request, res: Response) {
        const id = ObjectID.createFromHexString(req.params.id);
        const person = await personRepository.findOneBy(id);

        if (!person) {
            return res.status(404).json({
                message: "Person not founded"
            });
        }

        return res.status(200).json(person);
    }

    async update(req: Request, res: Response) {
        const id = ObjectID.createFromHexString(req.params.id);
        const {firstName, lastName, phone, email, cpf} = req.body;

        let person = await personRepository.findOneBy(id);

        if (!person) {
            return res.status(404).json({
                message: "Person not founded"
            });
        }

        person.setProperties(firstName, lastName, phone, email, cpf);

        person = await personRepository.save(person);
        return res.status(200).json(person);
    }

    async delete(req: Request, res: Response) {
        const id = ObjectID.createFromHexString(req.params.id);

        const person = await personRepository.findOneBy(id);

        if (!person) {
            return res.status(404).json({
                message: "Person not founded"
            });
        }

        await personRepository.delete(id);

        return res.status(200).json({
            message: "Successfully Deleted!"
        });
    }
}

export {PersonController}