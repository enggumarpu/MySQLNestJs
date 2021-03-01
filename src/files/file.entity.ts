import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { User } from './../users/user.entity';
import { PostEntity } from './../posts/post.entity';

@Entity({ name: 'files' })
export class File extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    FileName: string

    @Column()
    ModifiedFileName: string

    @Column()
    Extension: string

    @Column()
    Size: number

    @ManyToOne(
        () => User,
        (user: User) => user.files,
        { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      )
      @JoinColumn({ name: 'User_id' })
      user: User;

<<<<<<< HEAD
      @ManyToOne(
        () => PostEntity,
        (post: PostEntity) => post.files,
=======
    @ManyToOne(
        () => Post,
        (post: Post) => post.files,
>>>>>>> 819e1f1f80d9fed57e07176858157600a29b62e9
        { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      )
      @JoinColumn({ name: 'Post_id' })
      post: PostEntity;

}


