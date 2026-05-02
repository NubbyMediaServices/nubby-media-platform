export type AuthResponse = {
  token?: string;
  jwt?: string;
  accessToken?: string;
  userId?: number;
  username?: string;
  email?: string;
};

export type CurrentUser = {
  userId?: number;
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
};

export type MediaFile = {
  fileId: number;
  userId: number;
  folderId: number;
  fileName: string;
  fileType: string;
  fileSizeMb: number;
  uploadDate: string;
  storagePath: string;
  checksumValue?: string;
  fileStatus: string;
  cloudObjectKey?: string;
  isEncrypted?: boolean;
  processingStatus?: string;
  visibilityLevel?: string;
  fileDescription?: string;
  tags?: string[];
};

export type AuditLog = {
  logId?: number;
  actionType?: string;
  actionTimestamp?: string;
  actionDetails?: string;
  ipAddress?: string;
  fileName?: string;
  firstName?: string;
  lastName?: string;
  resultStatus?: string;
  userAgent?: string;
};
