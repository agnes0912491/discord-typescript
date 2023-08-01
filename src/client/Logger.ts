import { blue, green, yellow, red } from "colorette";

type LogLevel = "debug" | "info" | "warn" | "error";

class Logger {
  private debugMode: boolean | string | string[];

  constructor(debugMode: boolean | string | string[] = false) {
    this.debugMode = debugMode;
  }

  private log(level: LogLevel, message: string) {
    const logFn = level === "debug" ? console.log : console[level];
    const colorFn = this.getColorFunction(level);

    if (typeof this.debugMode === "boolean") {
      if (this.debugMode) {
        const logMessage = `[${level.toUpperCase()}] ${message}`;
        logFn(colorFn(logMessage));
      }
    } else if (typeof this.debugMode === "string") {
      if (this.debugMode === level) {
        const logMessage = `[${level.toUpperCase()}] ${message}`;
        logFn(colorFn(logMessage));
      }
    } else if (Array.isArray(this.debugMode)) {
      if (this.debugMode.includes(level)) {
        const logMessage = `[${level.toUpperCase()}] ${message}`;
        logFn(colorFn(logMessage));
      }
    }
  }

  private getColorFunction(level: LogLevel) {
    switch (level) {
      case "debug":
        return blue;
      case "info":
        return green;
      case "warn":
        return yellow;
      case "error":
        return red;
      default:
        return (text: string) => text;
    }
  }

  public debug(message: string) {
    this.log("debug", message);
  }

  public info(message: string) {
    this.log("info", message);
  }

  public warn(message: string) {
    this.log("warn", message);
  }

  public error(message: string) {
    this.log("error", message);
  }
}

export default Logger;
