import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from './user.entity';
import { PostEntity } from './../posts/post.entity';

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
    async getPostsOfUser(id: number): Promise<PostEntity[]>{
        // const allUserPosts  =  await Post.findOne({ id: id });
        // if(!allUserPosts){
        //     throw new NotFoundException(`User with given ${id} was not found`);   
        // }
        // return allUserPosts;  
        // const allUserPosts = await this.createQueryBuilder("user")
        //     .leftJoinAndSelect("user.posts", "post")
        //     .where("user.id = :id", { id: id })
        //     .getMany();

        // return allUserPosts;
        const allUserPosts = await PostEntity.createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user")
            .where("user.id = :id", { id: id })
            .getMany();

        return allUserPosts;
        
    }
}