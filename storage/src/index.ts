import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
    CopyObjectCommand,
    ListObjectsCommand,
  } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
  import { ReadStream } from "fs";
  
  interface S3Credentials {
    accessKeyId: string;
    secretAccessKey: string;
  }
  
  interface S3Config {
    credentials: S3Credentials;
    region: string;
    bucket: string;
  }
  
  export class Storage {
    private client: S3Client;
    private bucketName: string;
  
    constructor(config: S3Config) {
      const { credentials, region, bucket } = config;
  
      this.client = new S3Client({
        credentials,
        endpoint: "https://s3.velta.dev",
        region: region,
        forcePathStyle: true,
      });
  
      this.bucketName = bucket;
    }
    async uploadObject(
      fileKey: string,
      fileData: ReadStream,
      contentType: any
    ): Promise<string> {
      try {
        const uploadParams = {
          Bucket: this.bucketName,
          Key: fileKey,
          Body: fileData,
          ContentType: contentType,
        };
  
        await this.client.send(new PutObjectCommand(uploadParams));
        return fileKey;
      } catch (error) {
        throw error;
      }
    }
  
    async getSignedUrl(fileKey: string, expirationTime = 3600): Promise<string> {
      try {
        const command = new GetObjectCommand({
          Bucket: this.bucketName,
          Key: fileKey,
        });
  
        const signedUrl = await getSignedUrl(this.client, command, {
          expiresIn: expirationTime,
        });
  
        return signedUrl;
      } catch (error) {
        throw error;
      }
    }
  
    async deleteObject(fileKey: string): Promise<string> {
      try {
        const deleteParams = {
          Bucket: this.bucketName,
          Key: fileKey,
        };
  
        await this.client.send(new DeleteObjectCommand(deleteParams));
  
        return fileKey;
      } catch (error) {
        throw error;
      }
    }
  
    async listObjects(): Promise<string[] | any[]> {
      try {
        const listParams = {
          Bucket: this.bucketName,
        };
  
        const response = await this.client.send(
          new ListObjectsCommand(listParams)
        );
        const files = response.Contents?.map((file) => file.Key) || [];
        return files;
      } catch (error) {
        throw error;
      }
    }
  
    async updateObjectName(
      oldObjectKey: string,
      newObjectKey: string
    ): Promise<string> {
      try {
        const copyParams = {
          Bucket: this.bucketName,
          CopySource: `${this.bucketName}/${oldObjectKey}`,
          Key: newObjectKey,
        };
  
        await this.client.send(new CopyObjectCommand(copyParams));
        await this.deleteObject(oldObjectKey);
        return newObjectKey;
      } catch (error) {
        throw error;
      }
    }
  
    async createFolder(folderPath: string): Promise<string> {
      try {
        const folderKey = `${folderPath}/`;
        const uploadParams = {
          Bucket: this.bucketName,
          Key: folderKey,
          Body: "",
        };
  
        await this.client.send(new PutObjectCommand(uploadParams));
        return folderKey;
      } catch (error) {
        throw error;
      }
    }
  }
  