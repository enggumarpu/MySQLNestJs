import { NotFoundException } from "@nestjs/common";
import { User } from "./../users/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Post } from "./post.entity";
import { PostsService } from "./posts.service";


@EntityRepository(Post)
export class PostRepository extends Repository<Post>{

    async getPostById(id: number): Promise<Post> {

        const postFound = await this.findOne(id);
        if(!postFound){
            throw new NotFoundException(`User with given ${id} was not found`)
        }
        return postFound;
    }

    async getAllPosts(){
        return this.find();
    }

    
}