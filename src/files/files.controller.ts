import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor,  } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { Response } from 'express';
import { join } from 'path';



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
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0];
        const [, fileExtName] = file.mimetype.split('/');
        const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
          callback(null, `${name}-${randomName}.${fileExtName}`);
      }
    }),
    // fileFilter: () => (req, file, callback) => {
    //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    //     return callback(new Error('Only image files are allowed!'), false);
    //   }
    //   callback(null, true);
    // },
    limits: {
      //fileSize: 1e7, // the max file size in bytes, here it's 100MB,
      files: 1,
    }
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
// @Post('uploads/:imagename')
// async getImageFile(@Param('imagename') imagename: string, @Res() response: Response){
//   //return this.filesService.getImageFile(imagename, response);
//   return response.sendFile(join(process.cwd(), 'uploads/' + imagename));
// }

//'C:\Users\Umar\Documents\GitHub\MySQLNestJs\uploads\hello.txt
//this is the path the function is following. 
@Get('uploads/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads'});
  }

}
