import fs from "node:fs";

export function log(event: string) {
  const logFilePath = "../events.log";
  const logMessage = `${new Date().toISOString()} - ${event}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(event);
    }
  });
}
