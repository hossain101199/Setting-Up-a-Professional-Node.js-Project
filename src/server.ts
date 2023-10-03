import { Server } from 'http';
import app from './app';
import config from './config/index';
import { errorLogger, infoLogger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      infoLogger.info(
        `app listening on port ${config.port} | http://localhost:${config.port}`,
      );
    });
  } catch (error) {
    errorLogger.error(error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
