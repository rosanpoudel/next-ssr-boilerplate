/* eslint-disable no-console */
enum COLORS {
  red = "\x1b[31m%s\x1b[0m",
  green = "\x1b[32m%s\x1b[0m",
  yellow = "\x1b[33m%s\x1b[0m",
  magenta = "\x1b[35m%s\x1b[0m",
  blue = "\x1b[34m%s\x1b[0m",
  grey = "\x1b[90m%s\x1b[0m",
  cyan = "\x1b[36m%s\x1b[0m",
}
export class Logger {
  static colors = {
    error: COLORS.red,
    debug: COLORS.blue,
    warn: COLORS.yellow,
    data: COLORS.grey,
    info: COLORS.green,
    verbose: COLORS.cyan,
    silly: COLORS.magenta,
    custom: COLORS.yellow,
  };
  private static log(level: string, message: string, error?: Error): void {
    const timestamp = new Date().toISOString();
    let logMessage = `[${level}] | ${message} | ${timestamp}`;

    if (error && level === "ERROR") {
      logMessage += `\n${error?.cause || 500}:${error.message}`;
    }

    switch (level) {
      case "INFO":
        console.info(this.colors.info, logMessage);
        break;
      case "WARN":
        console.warn(this.colors.warn, logMessage);
        break;
      case "ERROR":
        console.error(this.colors.error, logMessage);
        break;
      default:
        console.log(this.colors.custom, logMessage);
        break;
    }
  }

  static info(message: string): void {
    this.log("INFO", message);
  }

  static warn(message: string): void {
    this.log("WARN", message);
  }

  static error(message: string, error?: Error): void {
    this.log("ERROR", message, error);
  }
}
