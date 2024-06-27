import { createAsyncThunk } from "@reduxjs/toolkit";
import Story, { StoryCreate } from "../../network/models/story";
import createBaseSlice from "../../network/reducers/core/BaseSlice";
import { StoryState } from "./Types";
import { StoryService } from "../../network/services/StoryService"; 

const initialState: StoryState = {
  list: [],
  status: "idle",
  error: null,
  selected: null,
};

let storyService = new StoryService();

export const addstory = createAsyncThunk(
  "stories/addStory",
  async (story: StoryCreate) => {
    const response = await storyService.add(story);
    return response.data;
  }
);

export const fetchstories = createAsyncThunk(
  "stories/fetchstories",
  async () => {
    const response = await storyService.getAll('getallstories');
    return response.data;
  }
);

export const deletestory = createAsyncThunk(
  "stories/deletestory",
  async (id: number) => {
    const response = await storyService.delete(id);
    return response.data;
  }
);

export const fetchstory = createAsyncThunk(
  "stories/fetchstory",
  async (id: number) => {
    const response = await storyService.get(id);
    return response.data;
  }
);

export const updatestory = createAsyncThunk(
  "stories/updatestory",
  async (story: Story) => {
    const response = await storyService.update(story.id, story);
    return response.data;
  }
);

const StorySlice = createBaseSlice<StoryState>("Story", initialState, [
  {
    thunk: fetchstories,
    onFulfilled: (state, action) => {
      state.list = action.payload;
      state.status = "succeeded";
    },
    onPending: (state) => {
      state.status = "loading";
    },
  },
  {
    thunk: addstory,
    onFulfilled: (state, action) => {
      console.log(action.payload)
      state.list.push(action.payload);
      state.status = "succeeded";
    },
    onPending: (state) => {
      state.status = "loading";
    },
  },
  {
    thunk: deletestory,
    onFulfilled: (state, action) => {
      state.list = state.list.filter((story) => story.id !== action.payload);
    },
  },
  {
    thunk: fetchstory,
    onFulfilled: (state, action) => {
      state.selected = action.payload;
    },
  },
  {
    thunk: updatestory,
    onFulfilled: (state, action) => {
      state.list = state.list.map((story) =>
        story.id === action.payload.id ? action.payload : story
      );
    },
  },
]);

export default StorySlice.reducer;
