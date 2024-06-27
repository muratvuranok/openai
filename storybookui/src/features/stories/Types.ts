import React from "react";
import Story from "../../network/models/story";

export interface StoryState {
  list: Story[] | any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selected: Story | null;
}

export interface StoryType {
  key: string;
  id: string;
  imageUrl: string;
  description: string;
  storyId: number;
  userId: number;
}
