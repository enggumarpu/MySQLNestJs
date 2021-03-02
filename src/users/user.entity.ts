import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from './../posts/post.entity';
import { File } from './../files/file.entity';

export enum Roles {
    user = 'User',
    admin = 'Admin',
  }

@Entity({ name: 'users' })
export class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    UserId: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    Password: string;

    @Column({length: 50, unique: true})
    Email: string

    @Column({type: 'enum', enum: Roles, default: Roles.user })
    Role: Roles

    // @OneToMany(() => Post, post => post.UserOfPost)
    // PostsOfUser: Post[]

    @OneToMany(
      () => PostEntity,
      (post: PostEntity) => post.user,
      { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
    )
    posts: PostEntity[];

    @OneToMany(
      () => File,
      (file: File) => file.user,
      { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
    )
    files: File[];
    
    
}