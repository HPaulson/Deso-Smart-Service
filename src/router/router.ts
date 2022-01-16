import { Request, Response, Router, RouterContext } from "../deps.ts";
import { handleGetAddress } from "./getAddress.ts";
import { handleGetInfo } from "./getInfo.ts";

class Routes {
  req: Request;
  res: Response;

  constructor(
    // @ts-ignore -- RouterContext doesn't like the use of any or string for the endpoint name, since R is an ext of string.
    // This value will always be a string, and won't cause any other issues, so we can ignore the ts check for convience.
    // deno-fmt-ignore
    // deno-lint-ignore no-explicit-any
    ctx: RouterContext<any, Record<string | number, string | undefined>, Record<string, any>>,
  ) {
    this.req = ctx.request;
    this.res = ctx.response;
  }

  Root() {
    this.res.status = 200;
  }

  getAddress() {
    handleGetAddress(this.req, this.res);
  }

  getInfo() {
    handleGetInfo(this.req, this.res);
  }
}

const router = new Router();
router
  .get("/", (context) => {
    new Routes(context).Root();
  })
  .get("/get-address", (context) => {
    new Routes(context).getAddress();
  })
  .get("get-info", (context) => {
    new Routes(context).getInfo();
  });

export { router };
