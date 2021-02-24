import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Post } from "./post.entity";


@EntityRepository(Post)
export class PostRepository extends Repository<Post>{

    async getUserById(id: number): Promise<Post> {

        const userFound = await this.findOne(id);
        if(!userFound){
            throw new NotFoundException(`User with given ${id} was not found`)
        }
        return userFound;
    }

    async getAllPosts(){
        return this.find();
    }
}