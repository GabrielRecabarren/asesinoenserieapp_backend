import bunyan from 'bunyan';
class LoggerConfig {
  createLogger(name){
    return bunyan.createLogger({ name, level: 'debug' });
  }
}

export const logger = new LoggerConfig();
