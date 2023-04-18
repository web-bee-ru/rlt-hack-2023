import Router from "@koa/router";

const fs = require("fs");
const path = require("node:path");

export default function registerRouteUploads(router: Router) {
  router.get("/csv", (ctx) => {
    const filePath = path.join(__dirname, "..", "..", "uploads", "main.csv");
    ctx.body = fs.createReadStream(filePath);
    ctx.set("Content-disposition", "attachment; filename=upload.csv");
    ctx.set("Content-type", "text/csv");
  });
}
