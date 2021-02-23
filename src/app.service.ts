import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Seed } from './seed.class';
import { User } from './users/user.entity';


@Injectable()
export class AppService extends Seed {
  constructor(entityManager: EntityManager){
    super(entityManager);
    //this.fakeIt(User)
  }
  getHello(): string {
    return 'Hello World!';
  }
}
