import { IBaseEntity } from "./core/IBaseEntity";

export interface StoryCreate extends IBaseEntity{
  petType: string;
  petName: string;
  petAge: number;
  storySetting: string;
  storyType: string;
  language: string;
  color: string;
}

interface Story extends IBaseEntity {
  description: string;
  imageUrl: string;
  storyId: number;
  userId: number;
}
export default Story;
