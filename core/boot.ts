import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import { lookup } from "./core.ts";
import type { Component } from "./core.ts";
import type Endpoint from "./Endpoint.ts";

export default async function boot(
  config: { port: number },
  ...availableControllers: Component[]
) {
  const app = new Application();
  const router = new Router();
  app.use(router.routes());
  app.use(router.allowedMethods());

  for (let controller of availableControllers) {
    const api = lookup(controller);
    api.endpoints.forEach((endpoint: Endpoint) => {
      router[endpoint.method.toLowerCase()](
        endpoint.path,
        async (context: Context) => {
          context.response.body = await api[endpoint.handler](context);
        },
      );
    });
  }

  console.log(`🌐 Server started at http://locahost:${config.port}`);
  await app.listen({ port: config.port });
}
