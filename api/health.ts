import { Controller, Get } from "../core/core.ts";

@Controller()
export default class HealthController {
  @Get("/health")
  healthInfo() {
    return {
      up: true,
    };
  }
}
