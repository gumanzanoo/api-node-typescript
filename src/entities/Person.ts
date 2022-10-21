import {Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn} from "typeorm";

@Entity()
class Person {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    cpf: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(firstName: string, lastName: string, phone: string, email: string, cpf: string) {
        this.setProperties(firstName, lastName, phone, email, cpf);
    }

    setProperties(firstName: string, lastName: string, phone: string, email: string, cpf: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.cpf = cpf;
    }
}

export { Person }
