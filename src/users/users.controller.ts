import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';


@Controller('users')
export class UsersController {
    constructor( private userService: UsersService ){}

    @Get(':id')
    getUserById(@Param('id') id: number): Promise<User>{
        return this.userService.getUserById(id);
    }
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }
    
}
