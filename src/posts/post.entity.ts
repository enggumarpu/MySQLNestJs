import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from '../users/user.entity';
import { File } from './../files/file.entity';

@Entity({ name: 'posts' })
export class Post extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    Title: string

    @Column('text')
    Body: string

    // @ManyToOne( () => User, user => user.PostsOfUser)
    // @JoinColumn({name: 'user_id'})
    // UserOfPost: User
    
    @ManyToOne(
        () => User,
        (user: User) => user.posts,
        { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      )
      @JoinColumn({ name: 'user_id' })
      user: User;

      @OneToMany(
        () => File,
        (file: File) => file.post,
        { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      )
      files: File[];

}


