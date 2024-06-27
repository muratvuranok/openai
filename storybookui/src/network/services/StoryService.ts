import Story, { StoryCreate } from "../models/story";
import { BaseService } from "./core/BaseService";

export class StoryService extends BaseService<Story | StoryCreate> {
  constructor() {
    super("/stories");
  }
}
