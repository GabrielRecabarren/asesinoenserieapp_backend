import mongoose from 'mongoose';
import { config } from '../configs/configEnvs.js';
import { logger } from '../configs/configLogs.js';

const log = logger.createLogger('setupDatabase');

//Design Pattern: Singleton.
export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Succesfully connected to Database.');
      })
      .catch(error => {
        log.error('Error connecting to database.', error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};