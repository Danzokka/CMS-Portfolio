import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Body,
  BadRequestException,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  UploadService,
  UploadedFile as UploadedFileResponse,
} from './upload.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ): Promise<UploadedFileResponse> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return this.uploadService.uploadFile(file, uploadFileDto.folder);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() uploadFileDto: UploadFileDto,
  ): Promise<UploadedFileResponse[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    return this.uploadService.uploadMultipleFiles(files, uploadFileDto.folder);
  }

  @Delete(':filepath(*)')
  async deleteFile(
    @Param('filepath') filepath: string,
  ): Promise<{ success: boolean }> {
    const success = await this.uploadService.deleteFile(filepath);
    return { success };
  }

  @Get('url/:filepath(*)')
  getFileUrl(@Param('filepath') filepath: string): { url: string } {
    const url = this.uploadService.getFileUrl(filepath);
    return { url };
  }
}
