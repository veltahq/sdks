# `@veltahq/storage`

## Documentation

### Installation

To use the Velta Object Storage package in your Node.js project, you need to install it via npm. Run the following command in your project directory:

```bash
npm install @veltahq/storage
```

### Usage

Once installed, you can import the package in your code using the following statement:

```typescript
import { Storage } from "@veltahq/storage";
```

To initialize the package, create a new instance of the `Storage` class with the required configuration options:

```typescript
const s3 = new Storage({
  credentials: {
    accessKeyId: "YOUR_ACCESS_KEY_ID",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  },
  region: "YOUR_REGION",
  bucket: "YOUR_BUCKET_NAME",
});
```

Replace the `YOUR_ACCESS_KEY_ID`, `YOUR_SECRET_ACCESS_KEY`, `YOUR_REGION`, and `YOUR_BUCKET_NAME` placeholders with your actual credentials and bucket information.

### Methods

The `s3` object (an instance of the `Storage` class) provides the following methods for interacting with the Velta Object Storage:

#### `uploadObject(fileKey: string, fileData: ReadStream, contentType: any): Promise<string>`

This method uploads a file to the Velta Object Storage with the specified file key, file data, and content type.

Parameters:

- `fileKey` (string): The key to assign to the uploaded file.
- `fileData` (ReadStream): The file data to be uploaded. It should be provided as a ReadStream.
- `contentType` (any): The content type of the file.
  Returns:
  A Promise that resolves to a string representing the uploaded file's key.

Example:

```typescript
import { ReadStream } from "fs";

const fileData: ReadStream = fs.createReadStream("path/to/file.jpg");
const contentType = "image/jpeg";
await s3.uploadObject("object.jpg", fileData, contentType);
```

#### `getSignedUrl(fileKey: string, expirationTime?: number): Promise<string>`

This method retrieves a signed URL for accessing the object with the specified file key in the Velta Object Storage.

Parameters:

- `fileKey` (string): The key of the object for which to generate the signed URL.
- `expirationTime` (optional, number): The expiration time in seconds for the signed URL. If not provided, a default expiration time will be used.

  Returns:
  A Promise that resolves to the signed URL as a string.

Example:

```typescript
const signedUrl = await s3.getSignedUrl("object.jpg");
```

#### `deleteObject(fileKey: string): Promise<string>`

This method deletes the object with the specified file key from the Velta Object Storage.

Parameters:

- `fileKey` (string): The key of the object to be deleted.
  Returns:
  A Promise that resolves to a string representing the key of the deleted object.

Example:

```typescript
await s3.deleteObject("object.jpg");
```

#### `listObjects(): Promise<string[] | any[]>`

This method retrieves a list of objects in the Velta Object Storage.

Returns:
A Promise that resolves to an array of strings representing the keys of the objects.

Example:

```typescript
const objects = await s3.listObjects();
console.log(objects);
```

#### `updateObjectName(oldObjectKey: string, newObjectKey: string): Promise<string>`

This method updates the key of an existing object in the Velta Object Storage.

Parameters:

- `oldObjectKey` (string): The current key of the object.
- `newObjectKey` (string): The new key to assign to the object.
  Returns:
  A Promise that resolves to a string representing the updated key of the object.

Example:

```typescript
await s3.updateObjectName("oldKey", "newKey");
```

#### `createFolder(folderPath: string): Promise<string>`

This method creates a new folder at the specified folder path in the Velta Object Storage.

Parameters:

- `folderPath` (string): The path of the folder to be created.
  Returns:
  A Promise that resolves to a string representing the path of the created folder.

Example:

```typescript
await s3.createFolder("path/to/folder");
```
