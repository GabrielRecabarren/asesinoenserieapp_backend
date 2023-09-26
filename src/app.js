import express from "express";
import { config } from "./configs/configEnvs.js";
import databaseConnection from '../src/bootstrap/setupDatabase.bootstrap.js'
import { AsesinoEnSerieServer } from "./bootstrap/setupServer.bootstrap.js";

class Application{
     initialize() {
        this.loadConfig();
        databaseConnection();
        const app = express();
        const server= new AsesinoEnSerieServer(app);
        server.start();
      }
    
      loadConfig() {
        config.validateConfig();
      }
    }
    
    const application = new Application();
    application.initialize();
