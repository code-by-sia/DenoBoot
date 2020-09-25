import { Controller, Get, Inject, Post } from "../core/core.ts";
import PeopleService from "../service/peopleSevice.ts";
import type Person from "../service/model/person.ts";
import type { Context } from "https://deno.land/x/oak/mod.ts";

@Controller()
export default class MainController {
  @Inject(PeopleService)
  public peopleService!: PeopleService;

  @Get("/api/1/people")
  async all() {
    return await this.peopleService.getAll();
  }

  @Post("/api/1/people")
  async login(context: Context) {
    const person: Person = await context.request.body().value;

    return await this.peopleService.createPerson(person);
  }
}
