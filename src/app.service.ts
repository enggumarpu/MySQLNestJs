import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Post } from './posts/post.entity';
import { Seed } from './seed.class';
import { User } from './users/user.entity';


@Injectable()
export class AppService extends Seed {
  constructor(entityManager: EntityManager){
    super(entityManager);
    this.fakeData();
  }
  getHello(): string {
    return 'Hello World!';
  }


  private async fakeData() : Promise<void>{
    await  this.fakeIt(User);
    await  this.fakeIt(Post);
  }
}
