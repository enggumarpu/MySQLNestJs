import { EntityManager } from "typeorm";
import { User, Roles } from './users/user.entity';
import { PostEntity } from './posts/post.entity';
import * as bcrypt from 'bcrypt';


import { internet, name, random, lorem } from 'faker';



export class Seed{

  private users: Array<User>;
    private posts: Array<Partial<PostEntity>>;
    constructor(
        private readonly entityManager: EntityManager){
            this.users = []
            this.posts = []
        }


async fakeIt<T>(entity: any): Promise<void> {
    switch (entity) {
        case User:
          return this.addData(
            this.userData(),
            entity,
            (savedData: Array<User>) => (this.users = savedData),
          );
        case PostEntity:
          return this.addData(
            this.postData(),
            entity,
            (savedData: Array<Partial<PostEntity>>) => (this.posts = savedData),
          );
        default:
            break;
    }
 }
 
private userData (): Array<Partial<User>>{

     return Array.from({length: 5}).map<Partial<User>>(() => {
        return{
            FirstName: name.firstName(),
            Password: '$2y$12$hn3EFddyW9w.hSFUWJDvd.Du/blzqB4Aq5FU0GhNNNsZu2j5uFMV.', 
            Role: random.arrayElement([Roles.user, Roles.admin, Roles.user, Roles.user, Roles.user]),
            LastName: name.lastName(),
            Email: internet.email()
        }
     });
}
private postData(): Array<Partial<PostEntity>> {
    return Array.from({length: 5}).map<Partial<PostEntity>>(() => ({
      Body: lorem.paragraphs(),
      Title: lorem.words(),
      user: random.arrayElement(this.users)
      //user: random.arrayElement(this.users)

      //user: random.arrayElement(this.users),
    }));
  }


//  private addData<T>(data: Array<Partial<T>>, entity: any,  ): void{
//     this.entityManager.save<T, T>(entity, data as any).then((saveData: Array<Partial<T>> ) => {        
//     }).catch(console.error);
//     //this.entityManager.save(entity, data);
//  }
private async addData<T>(
    data: Array<Partial<T>>,
    entity: any,
    fun?: (savedData: Array<Partial<T>>) => void,
  ): Promise<void> {
    return this.entityManager
    .save<T, T>(entity, data as any)
    .then((savedData: Array<T>) => {
        if (fun) {
          fun(savedData);
        }
        //console.log(savedData);
      })
      .catch(console.error);
  }



 } /* Class Ending */