import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { PostEntity } from "./post.entity";
import { CreatePostDto } from './dto/createpost.dto';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostEntity) private postRepo: Repository<PostEntity>){}

   
    // async getPostsOfUser(id: number): Promise<Post>{
    //     return this.postRepo.getPostsOfUser(id);
    // }

    async getPostById(id: number): Promise<PostEntity> {
        const postFound = await this.postRepo.findOne(id)
        if(!postFound){
            throw new NotFoundException(`User with given ${id} was not found`)
        }
        return postFound;
    }

    async createPost(createPostDto: CreatePostDto): Promise<PostEntity>{
        const { title, description} = createPostDto;
        const newPost = new PostEntity();

        newPost.Title = title;
        newPost.Body = description;

        return await this.postRepo.save(newPost);
    }
    async deletePost(id: number): Promise<void>{
        const postFound = await this.postRepo.findOne(id);
        if(!postFound){
            throw new NotFoundException('Item to be deleted does not exists anymor');    
        }
        await this.postRepo.delete(id);
    }

    async getAllPosts(){
        return this.postRepo.find();
    }

}
