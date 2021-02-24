import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from './user.entity';
import { Post } from './../posts/post.entity';

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
    async getPostsOfUser(id: number): Promise<Post>{
        const allUserPosts  =  await Post.findOne({ id: id });
        if(!allUserPosts){
            throw new NotFoundException(`User with given ${id} was not found`);   
        }
        return allUserPosts;   
    }
}