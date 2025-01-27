import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import {
  S3Client,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const s3_region = this.configService.get('AWS_REGION');

    this.s3Client = new S3Client({
      region: s3_region,
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    key: string,
    folder: string,
  ): Promise<void> {
    const uploadParams = {
      Bucket: 'jobernify',
      Key: `${folder}/${key}`,
      Body: file.buffer,
    };

    const upload = new Upload({
      client: this.s3Client,
      params: uploadParams,
    });

    await upload.done();
  }

  async deleteFile(key: string, folder: string): Promise<void> {
    const deleteParams = {
      Bucket: 'jobernify',
      Key: `${folder}/${key}`,
    };
    const command = new DeleteObjectCommand(deleteParams);
    await this.s3Client.send(command);
  }

  async generatePresignedUrl(
    key: string,
    folder: string,
    expiresIn = 3600,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: 'jobernify',
      Key: `${folder}/${key}`,
      ResponseContentDisposition: 'inline',
      ResponseContentType: 'application/pdf',
      ResponseCacheControl: 'no-cache',
    });

    const url = await getSignedUrl(this.s3Client as any, command, {
      expiresIn,
    });
    return url;
  }
}
