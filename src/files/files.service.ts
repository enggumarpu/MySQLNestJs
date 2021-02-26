import { Injectable } from '@nestjs/common';
import {File }from './file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';


// import { CreateFileDto } from './dto/create-file.dto';
// import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  // create(createFileDto: CreateFileDto) {
  //   return 'This action adds a new file';
  // }
  constructor(@InjectRepository(File)
  private readonly fileRepo: Repository<File>){}

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  // update(id: number, updateFileDto: UpdateFileDto) {
  //   return `This action updates a #${id} file`;
  // }
  async dbSave(
    file: any,
    newFileName: string,
  ): Promise<File> {
    return this.fileRepo.save(this.mapUploadFile(file, newFileName));
  }
  
  private mapUploadFile(
    { originalname, mimetype, size }: Express.Multer.File,
    newFileName: string,
  ): Partial<File> {
    // const { originalname, mimetype, size } = file;
    return {
      FileName: originalname,
      Size: size,
      ModifiedFileName: newFileName,
      Extension: mimetype.split('/')[1], // mimetype: 'image/jpeg'
    };
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
