import { Service, Value } from "../core/core.ts";
import type Person from "./model/person.ts";
import type { Collection } from "https://deno.land/x/mongo/mod.ts";

@Service()
export default class PeopleService {
  @Value("peopleCollection")
  private people!: Collection<Person>;

  async getAll(): Promise<Person[]> {
    return await this.people.find();
  }

  async createPerson(person: Person) {
    return await this.people.insertOne(person);
  }
}
