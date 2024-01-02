import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async createFile(fileData: any): Promise<string> {
    try {
      const fileExtension = fileData.originalname.split('.').pop();
      const fileName = v4() + '.' + fileExtension;

      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), fileData.buffer);

      return fileName;
    } catch (error) {
      throw new HttpException('File error', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(fileName: string) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        return;
      }

      fs.rmSync(path.join(filePath, fileName));
      return;
    } catch (error) {
      throw new HttpException('File error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
