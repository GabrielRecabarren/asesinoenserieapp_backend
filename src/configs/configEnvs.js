import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
    constructor() {
        this.DATABASE_URL = process.env.DATABASE_URL;
        this.NODE_ENV = process.env.NODE_ENV;
        this.CLIENT_URL = process.env.CLIENT_URL;
        this.JWT_TOKEN = process.env.JWT_TOKEN;
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
        this.SERVER_PORT = process.env.SERVER_PORT;
        this.BASE_PATH = process.env.BASE_PATH;

      
        
    }
    createLogger(name) {
        return bunyan.createLogger({ name, level: 'debug' });
    }
    validateConfig() {
        console.log(this);
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined) {
                throw new Error(`Configuration ${key} is undefined`);
            }
        }
    }
}
export const config = new Config();
