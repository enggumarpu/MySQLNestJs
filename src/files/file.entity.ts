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



    @ManyToOne(
        () => PostEntity,
        (post: PostEntity) => post.files,
        { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      )
      @JoinColumn({ name: 'Post_id' })
      post: PostEntity;

}


