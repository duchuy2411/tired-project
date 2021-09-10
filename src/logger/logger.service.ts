import { LoggerService, LogLevel  } from '@nestjs/common';

export class AppLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
  }
  error(message: any, ...optionalParams: any[]) {
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
  debug?(message: any, ...optionalParams: any[]) {
  }
  verbose?(message: any, ...optionalParams: any[]) {
  }
  setLogLevels?(levels: LogLevel[]) {
  }
}