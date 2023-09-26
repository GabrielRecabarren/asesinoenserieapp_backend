import { json, urlencoded } from "express";
import { config } from "../configs/configEnvs.js";
import { logger } from "../configs/configLogs.js";
import http from "http";
import hpp from "hpp";
import helmet from "helmet";
import cookieSession from "cookie-session";
import cors from "cors";
import compression from "compression";
import HTTP_STATUS from 'http-status-codes';

import ApplicationRoutes from "../interfaces/http/routes.js";

const log = logger.createLogger("server");

export class AsesinoEnSerieServer {
  constructor(app) {
    this.app = app;
  }

  start() {
    this.securityMIddleware(this.app);
    this.standardWiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
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
  // Desing Pattern: Sicronizer Token Pattern
  securityMIddleware(app) {
    app.use(
      cookieSession({
        name: "session", // Nombre de la cookie
        keys: [config.SECRET_KEY_ONE, config.SECRET_KEY_TWO], // Credenciales de cookies. Primer bloque de seguridad.
        maxAge: 24 * 7 * 3600000, // Tiempo de vida de la cookie
        secure: config.NODE_ENV !== "development", // en qué contexto va a trabajar. Esta definición nos permite no pasarle el certificado que se usará en producción.
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        // Comunicación entre dominios
        origin: config.CLIENT_URL, // si quisiera dejarlo abierto podría dejarlo con '*', que es la opción por defecto;
        credentials: true, // Si quisiera que el cliente pueda usar el certificado que se le envía. Obligatoria en producción en ambientes cloud.
        optionsSuccessStatus: 200, // Está todo bien y responde con 200
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );
  }

  // Definiciones standard para el server
  standardWiddleware(app) {
    app.use(compression()); // Compresión para optimización de archivos enviados
    app.use(json({ limit: "50mb" })); // Habilitar transformación a json, sin bodyParser. Como buena práctica se pone un límite de la respuesta
    app.use(urlencoded({ extended: true, limit: "50mb" })); // Cuando venga la ruta la va a encodear, para que sea seguro el transporte de datos.
  }

  globalErrorHandler(app) {
    app.all("*", (req, res) => {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `${req.originalUrl} not found` });
    });
    app.use((error, _req, res, next) => {
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  }

  startHttpServer(httpServer) {
    log.info(`Server has started with process ${process.pid}.`);
    httpServer.listen(config.SERVER_PORT, () => {
      log.info(`Server running at ${config.SERVER_PORT}.`);
    });
  }

  //Manejo de rutas
  routesMiddleware(app) {
    ApplicationRoutes(app);
  }
}
export default AsesinoEnSerieServer;
