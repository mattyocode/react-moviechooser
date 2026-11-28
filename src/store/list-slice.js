import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/axios-refresh";
import relativeUrl from "../utils/relative-url";

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
    const response = await client.get(relativeUrl(nextPageUrl));
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

export const updateListItem = createAsyncThunk(
  "list/updateListItem",
  async ({ movieSlug, updatedFieldData }) => {
    const response = await client.patch(
      `/list/${movieSlug}/`,
      updatedFieldData
    );
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchListItems.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchListItems.fulfilled, (state, action) => {
        state.list_items = action.payload.results;
        state.totalCount = action.payload.count;
        state.nextPageUrl = action.payload.next;
        state.status = "succeeded";
      })
      .addCase(fetchListItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addListItems.pending, (state, action) => {
        state.status = "updating";
      })
      .addCase(addListItems.fulfilled, (state, action) => {
        state.list_items = state.list_items.concat(action.payload.results);
        state.nextPageUrl = action.payload.next;
        state.status = "succeeded";
      })
      .addCase(addListItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewListItem.pending, (state, action) => {
        state.status = "updating";
      })
      .addCase(addNewListItem.fulfilled, (state, action) => {
        if (action.payload) {
          state.list_items.push(action.payload);
        }
        state.status = "succeeded";
      })
      .addCase(addNewListItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteListItem.pending, (state, action) => {
        state.status = "updating";
      })
      .addCase(deleteListItem.fulfilled, (state, action) => {
        const { deleted } = action.payload;
        const updatedItems = state.list_items.filter(
          (item) => item.uid !== deleted
        );
        state.list_items = updatedItems;
        state.status = "succeeded";
      })
      .addCase(deleteListItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateListItem.pending, (state, action) => {
        state.status = "updating";
      })
      .addCase(updateListItem.fulfilled, (state, action) => {
        let existingItem = state.list_items.find(
          (item) => item.uid === action.payload.uid
        );
        if (existingItem) {
          existingItem.watched = action.payload.watched;
        }
        state.status = "succeeded";
      })
      .addCase(updateListItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default listSlice.reducer;
