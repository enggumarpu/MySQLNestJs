import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Post } from './../posts/post.entity';



@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) private userRepo: UserRepository){}


    async getUserById(id: number): Promise<User>{
        return this.userRepo.getUserById(id);
    }
    async getAllUsers(){
        return this.userRepo.find();
    }
    // async getPostsOfUser(id: number): Promise<Post>{
    //     return this.userRepo.getPostsOfUser(id);
    // }
    async getPostsOfUser(id: number): Promise<Post[]>{
             return this.userRepo.getPostsOfUser(id);
        }




}
