import {
  Collection,
  Database,
  MongoClient,
} from "https://deno.land/x/mongo/mod.ts";
import { Configuration } from "../core/core.ts";

@Configuration()
export default class DatabaseConfig {
  dbName() {
    return Deno.env.get("DB_NAME") || "people-data";
  }

  url() {
    return Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";
  }

  dbClient() {
    const client = new MongoClient();
    client.connectWithUri(this.url());
    return client;
  }

  public database(): Database {
    return this.dbClient().database(this.dbName());
  }

  public peopleCollection<T>(): Collection<T> {
    return this.database().collection("people");
  }
}
