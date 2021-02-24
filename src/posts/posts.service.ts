import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostRepository) private postRepo: PostRepository){}

    async getPostById(id: number): Promise<Post>{
        return this.postRepo.getPostById(id);
    }
    async getAllPosts(){
        return this.postRepo.getAllPosts();
    }
    // async getPostsOfUser(id: number): Promise<Post>{
    //     return this.postRepo.getPostsOfUser(id);
    // }
}
