import { Controller, Get, Param } from '@nestjs/common';
import { Post } from './post.entity';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
    constructor( private postService: PostsService ){}

    @Get(':id')
    getPostById(@Param('id') id: number): Promise<Post>{
        return this.postService.getPostById(id);
    }
    @Get()
    getAllPosts(){
        return this.postService.getAllPosts();
    }
    // @Get(':id')
    // getPostsOfUser(@Param('id') id: number): Promise<Post>{
    //     return this.postService.getPostsOfUser(id);
    // }
    
    
}
