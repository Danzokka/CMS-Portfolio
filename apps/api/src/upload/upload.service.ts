import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface UploadedFile {
  url: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
}

@Injectable()
export class UploadService {
  private readonly uploadPath: string;
  private readonly staticUrl: string;

  constructor(private configService: ConfigService) {
    this.uploadPath = this.configService.get<string>(
      'UPLOAD_PATH',
      '/app/uploads',
    );
    this.staticUrl = this.configService.get<string>(
      'STATIC_URL',
      'http://localhost:8080/uploads',
    );

    // Ensure upload directory exists
    this.ensureUploadDir();
  }

  private ensureUploadDir(): void {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  private ensureFolderExists(folder: string): void {
    const folderPath = path.join(this.uploadPath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }

  private generateFilename(originalName: string): string {
    const extension = path.extname(originalName);
    const name = path.basename(originalName, extension);
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const uniqueId = uuidv4().slice(0, 8);
    const timestamp = Date.now();

    return `${sanitizedName}-${timestamp}-${uniqueId}${extension}`;
  }

  private validateFile(file: Express.Multer.File): void {
    // Validate file type
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`,
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new BadRequestException(
        `File too large. Maximum size is ${maxSize / (1024 * 1024)}MB`,
      );
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string = '',
  ): Promise<UploadedFile> {
    this.validateFile(file);

    if (folder) {
      this.ensureFolderExists(folder);
    }

    const filename = this.generateFilename(file.originalname);
    const relativePath = folder ? path.join(folder, filename) : filename;
    const fullPath = path.join(this.uploadPath, relativePath);

    // Write file to disk
    await fs.promises.writeFile(fullPath, file.buffer);

    const url = `${this.staticUrl}/${relativePath.replace(/\\/g, '/')}`;

    return {
      url,
      filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: relativePath,
    };
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    folder: string = '',
  ): Promise<UploadedFile[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }

  async deleteFile(filepath: string): Promise<boolean> {
    try {
      const fullPath = path.join(this.uploadPath, filepath);

      if (fs.existsSync(fullPath)) {
        await fs.promises.unlink(fullPath);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  getFileUrl(filepath: string): string {
    return `${this.staticUrl}/${filepath.replace(/\\/g, '/')}`;
  }
}
