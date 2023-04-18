// import * as dotenv from "dotenv";

import Koa from "koa";
import cors from "@koa/cors";
import { koaBody } from "koa-body";
import logger from "koa-logger";
import { registerRoutes } from "./routes";

// dotenv.config(); // Load the environment variables

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function (): number {
  return this.toString();
};

async function main() {
  const app = new Koa();
  const PORT = process.env.PORT || 3000;

  /** Middlewares */
  // app.use(json());
  app.use(logger());
  app.use(koaBody());
  // app.use(KoaSend());
  app.use(cors());

  /** Routes */
  registerRoutes(app);

  await app.listen(PORT);
  console.info(`Server started: http://localhost:${PORT}`);
  await new Promise((resolve) => process.on("SIGINT", resolve));
  return 0;
}

main()
  .then((code) => {
    process.exit(code);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
