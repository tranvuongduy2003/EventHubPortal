export interface IFileStorage {
  id: string;
  fileName: string;
  fileContainer: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  createdAt: Date;
  updatedAt?: Date;
}
