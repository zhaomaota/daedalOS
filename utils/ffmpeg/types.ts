export type IFFmpegInstance = {
  FS: (
    command: string,
    fileName: string,
    fileData?: Buffer
  ) => Uint8Array | void;
  load: () => Promise<void>;
  run: (...commandArgs: string[]) => void;
};

export type IFFmpegLog = {
  type: string;
  message: string;
};

type FFmpegConfig = {
  corePath: string;
  log: boolean;
  logger: (log: IFFmpegLog) => void;
  mainName: string;
  workerPath: string;
};

export type FFmpegTranscodeFile = [string, Buffer];

declare global {
  interface Window {
    FFmpeg: {
      createFFmpeg: (config: FFmpegConfig) => IFFmpegInstance;
    };
    FFmpegInstance: IFFmpegInstance;
  }
}