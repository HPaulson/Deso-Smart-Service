import { Application } from "./deps.ts";
import { router } from "./router/router.ts";
import { DataBase } from "./db/connect.ts";
import { Events } from "./events/events.ts";

const dbClient = DataBase.connect();
// We're not going to utilize mongo in this example, but it's here if needed

const app = new Application();
app.use(router.routes(), router.allowedMethods());
Events.listen(app);

await app.listen({ port: 17002 });

export { dbClient };
