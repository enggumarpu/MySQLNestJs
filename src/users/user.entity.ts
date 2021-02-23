import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum Roles {
    user = 'User',
    admin = 'Admin',
  }

@Entity()
export class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({length: 50, unique: true})
    email: string

    @Column({type: 'enum', enum: Roles, default: Roles.user })
    role: Roles
    
}