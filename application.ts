import HealthController from "./api/health.ts";
import MainController from "./api/main.ts";
import DatabaseConfig from "./config/database.ts";
import boot from "./core/boot.ts";
import { EnableConfigurations } from "./core/core.ts";

@EnableConfigurations([DatabaseConfig])
class Application {
  run() {
    boot({ port: 8000 }, MainController, HealthController);
  }
}

new Application().run();
