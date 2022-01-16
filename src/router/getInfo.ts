import { Request, Response } from "../deps.ts";
import { Constants } from "../global/constants.ts";

function handleGetInfo(_req: Request, res: Response) {
  res.status = 200;
  res.body = {
    service: Constants.NAME,
    description: Constants.DESCRIPTION,
    entry: Constants.URL,
    deso: Constants.DESO_ADDRESS,
    eth: Constants.ETH_ADDRESS,
    version: Constants.VERSION,
  };
  res.type = "json";
  // Respond with the Service's Deso & Address's, along with a version number
}

export { handleGetInfo };
