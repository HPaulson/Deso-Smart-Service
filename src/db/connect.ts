import { MongoClient } from "../deps.ts";

class DataBase {
  static connect = () => {
    const client = new MongoClient();
    const mongoEnv = Deno.env.get("MONGO_CONNECTION_STRING");
    typeof mongoEnv != "string"
      ? (console.error("MONGO_CONNECTION_STRING REQUIERED"), Deno.exit(1))
      : async () => {
        await client.connect(mongoEnv).catch((e) => {
          console.error("FAILED TO CONNECT MONGODB CLIENT:", e);
          Deno.exit(1); // For this example, a mongo connection will be required for the Smart Service to operate at runtime
        });
      };
    return client;
  };
}

export { DataBase };
