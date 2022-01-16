import { Response } from "../deps.ts";

class Respond {
  static error = (res: Response, code: number, msg: string) => {
    res.status = code;
    res.body = msg + "\n";
  };
}

export { Respond };
