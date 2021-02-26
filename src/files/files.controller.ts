import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor,  } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import * as mime from 'mime-types';





@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  //@Post()
  // create(@Body() createFileDto: CreateFileDto) {
  //   return this.filesService.create(createFileDto);
  // }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
  //   return this.filesService.update(+id, updateFileDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }

//   @Post('upload')
// @UseInterceptors(
//   FileInterceptor('image'),
// )
// uploadedFile(@UploadedFile() file) {
// const response = {
//     originalname: file.originalname,
//     filename: file.filename,
//   };
//   return response;
// }
@UseInterceptors(
  FileInterceptor('image', {
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          // Allow storage of file
          cb(null, true);
      } else {
          // Reject file
          //let ext = mime.extension(file.mimetype);
          
          cb(new HttpException(`Unsupported file type ${file.originalname}`, HttpStatus.BAD_REQUEST), false);
      }
  },
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0];
        const [, fileExtName] = file.mimetype.split('/');
        const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
          callback(null, `${name}-${randomName}.${fileExtName}`);
      }
    }),
    limits: {
      //fileSize: 1e7, // the max file size in bytes, here it's 100MB,
      files: 1,
    },
  }),
)
@Post('upload')
async uploadFile(@UploadedFile() file){
  this.filesService.dbSave(file, file.filename)
  const response = {
    originalname: file.originalname,
    filename: file.filename,
  };
  
  return response;
}

// async uploadMultipleFiles(@UploadedFile() files) {
//   const response = [];
//   files.forEach(file => {
//     const fileReponse = {
//       originalname: file.originalname,
//       filename: file.filename,
//     };
//     response.push(fileReponse);
//   });
//   return response;
// }




}
