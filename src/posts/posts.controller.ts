import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/createpost.dto';
import  { PostEntity }  from './post.entity';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
    constructor( private postService: PostsService ){}

    @Get(':id')
    async getPostById(@Param('id') id: number){
        return this.postService.getPostById(id);
    }
    @Get()
    getAllPosts(){
        return this.postService.getAllPosts();
    }
    @Post('create')
    async createPost(@Body() createDto: CreatePostDto){
        return this.postService.createPost(createDto);
    }
    @Delete()
    async deletePostById(@Param('id') id: number): Promise<void>{
        return this.postService.deletePost(id);
    }
   
    // @Get(':id')
    // getPostsOfUser(@Param('id') id: number): Promise<Post>{
    //     return this.postService.getPostsOfUser(id);
    // }
    
    
}
