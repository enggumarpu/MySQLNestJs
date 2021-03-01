import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './posts/post.entity';
import { File } from './files/file.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from './files/files.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      dropSchema: true,
      password: '030698',
      database: 'testnest',
      entities: [User, PostEntity, File],
      synchronize: true,
    }),
    MulterModule.register({
      dest:'./uploads'
    }),
    UsersModule,
    PostsModule,
    FilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
