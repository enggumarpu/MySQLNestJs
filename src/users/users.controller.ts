import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { PostEntity } from './../posts/post.entity';



@Controller('users')
export class UsersController {
    constructor( private userService: UsersService ){}

    // @Get(':id')
    // getUserById(@Param('id') id: number): Promise<User>{
    //     return this.userService.getUserById(id);
    // }
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }
    @Get(':id')
     getPostsOfUser(@Param('id') id: number): Promise<PostEntity[]>{
         return this.userService.getPostsOfUser(id);
     }
}
