import Router from "@koa/router";
import Koa from "koa";
import registerRouteApi from "./main";
import registerRouteUploads from "./uploads";

// @NOTE: тут прописывать все роуты
export function registerRoutes(app: Koa) {
  const router = new Router();
  if (process.env.API_PREFIX) {
    router.prefix(process.env.API_PREFIX);
  }

  registerRouteApi(router);
  registerRouteUploads(router);

  app.use(router.routes());
}
