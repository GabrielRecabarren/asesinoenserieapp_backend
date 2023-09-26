import { config } from '../configs/configEnvs.js';
import { logger } from '../configs/configLogs.js';
import http from 'http'

const log = logger.createLogger('server');



export class AsesinoEnSerieServer {

    constructor(app){
        this.app=app;
    }

    start() {
        this.startServer(this.app);
    }
    async startServer(app) {
        try {
          const httpServer = new http.Server(app);
          this.startHttpServer(httpServer);
        } catch (error) {
          log.error(error);
        }
      }
    
      startHttpServer(httpServer) {
        log.info(`Server has started with process ${process.pid}.`);
        httpServer.listen(config.SERVER_PORT, () => {
          log.info(`Server running at ${config.SERVER_PORT}.`);
        });
      }  
}
export default AsesinoEnSerieServer;