import { EntityManager } from "typeorm";
import { User, Roles } from './users/user.entity';

import { internet, name, random, lorem } from 'faker';



export class Seed{
    constructor(private readonly entityManager: EntityManager){}


 fakeIt<T>(entity: any): void{
    switch (entity) {
        case User:
            this.addData(this.userData(), entity)
            break;
    
        default:
            break;
    }
 }
 
 private userData(): Array<Partial<User>>{

    // return Array.from({length: 5}).map<Partial<User>>(() => ({
        
    //     firstName: name.firstName(),
    //     role: random.arrayElement([Roles.user, Roles.admin, Roles.user, Roles.user, Roles.admin]),
    //     lastName: name.lastName(),
    //     email: internet.email()
    // }));

     return Array.from({length: 5}).map<Partial<User>>(() => {
        return{
            firstName: name.firstName(),
            role: random.arrayElement([Roles.user, Roles.admin, Roles.user, Roles.user, Roles.user]),
            lastName: name.lastName(),
            email: internet.email()
        }
     });
    



 }


 private addData<T>(data: Array<Partial<T>>, entity: any ): void{
    
    // this.entityManager.save<T, T>(entity, data as any).then((saveData: Array<Partial<T>> ) => {
    //     console.log(saveData);
    // }).catch(console.error);

    this.entityManager.save(entity, data);
 }

}