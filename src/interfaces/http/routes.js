import { config } from "../../configs/configEnvs.js";

export default (app) => {
  const routes = () => {
    app.use('/healtcheck', (_req, res) => res.send('Server is OK'));
  };

  routes();
};
