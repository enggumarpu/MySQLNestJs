import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from './../posts/post.entity';

export enum Roles {
    user = 'User',
    admin = 'Admin',
  }

@Entity({ name: 'users' })
export class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column({length: 50, unique: true})
    Email: string

    @Column({type: 'enum', enum: Roles, default: Roles.user })
    Role: Roles

    // @OneToMany(() => Post, post => post.UserOfPost)
    // PostsOfUser: Post[]

    @OneToMany(
      type => Post,
      (post: Post) => post.user,
      { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
    )
    posts: Post[];
    
}