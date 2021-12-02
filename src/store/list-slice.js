import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/axios-refresh";

const initialListState = {
  list_items: [],
  status: "idle",
  error: null,
  totalCount: 0,
  nextPageUrl: null,
};

export const fetchListItems = createAsyncThunk(
  "list/fetchListItems",
  async () => {
    const response = await client.get(`/list/`);
    return response;
  }
);

export const addListItems = createAsyncThunk(
  "list/addListItems",
  async (nextPageUrl) => {
    const response = await client.get(`${nextPageUrl}`, {});
    return response;
  }
);

export const addNewListItem = createAsyncThunk(
  "list/addNewListItem",
  async (movieSlug) => {
    const response = await client.post(`/list/`, {
      movie_slug: movieSlug,
    });
    return response;
  }
);

export const deleteListItem = createAsyncThunk(
  "list/deleteListItem",
  async (movieSlug) => {
    const response = await client.delete(`/list/${movieSlug}/`);
    return response;
  }
);

const listSlice = createSlice({
  name: "list",
  initialState: initialListState,
  reducers: {},
  extraReducers: {
    [fetchListItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchListItems.fulfilled]: (state, action) => {
      state.list_items = action.payload.results;
      state.totalCount = action.payload.count;
      state.nextPageUrl = action.payload.next;
      state.status = "succeeded";
    },
    [fetchListItems.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addListItems.pending]: (state, action) => {
      state.status = "updating";
    },
    [addListItems.fulfilled]: (state, action) => {
      state.list_items = state.list_items.concat(action.payload.results);
      state.nextPageUrl = action.payload.next;
      state.status = "succeeded";
    },
    [addListItems.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewListItem.pending]: (state, action) => {
      state.status = "updating";
    },
    [addNewListItem.fulfilled]: (state, action) => {
      console.log("action.payload in fulfilled", action.payload);
      if (action.payload) {
        state.list_items.push(action.payload);
      }
      state.status = "succeeded";
    },
    [addNewListItem.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deleteListItem.pending]: (state, action) => {
      state.status = "updating";
    },
    [deleteListItem.fulfilled]: (state, action) => {
      const { deleted } = action.payload;
      console.log("deleted >>", action);
      console.log("deleted >>", deleted);
      const updatedItems = state.list_items.filter(
        (item) => item.uid !== deleted
      );
      console.log("updatedItems >>", updatedItems);
      state.list_items = updatedItems;
      state.status = "succeeded";
    },
    [deleteListItem.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default listSlice.reducer;
