import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async getUserById(id: number): Promise<User> {

        const userFound = await this.findOne(id);
        if(!userFound){
            throw new NotFoundException(`User with given ${id} was not found`)
        }
        return userFound;
    }

    async getAllUsers(){
        return this.find();
    }
}