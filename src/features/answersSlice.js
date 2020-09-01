import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../server";

const INITIAL_STATE = {
  answers: [],
};

export const fetchAnswers = createAsyncThunk(
  "answers/fetchAnswers",
  async (information) => {
    const { formId } = information;
    console.log(formId);
    const answers = await server.get(`/answers/${formId}`);
    console.log("ans", answers.data);
    return {answers: answers.data};
  }
);

export const postAnswers = createAsyncThunk(
  'answers/postAnswers',
  async (information) => {
    const {formId, answers} = information;
    await server.post(`/answers/${formId}`, {answers});
  }
)

export const answersSlice = createSlice({
  name: "answers",
  initialState: INITIAL_STATE,
  reducers: {
    resetAnswers: (state) => {
      state.answers = []
    }
  },
  extraReducers: {
    [fetchAnswers.fulfilled]: (state, action) => {
      state.answers = action.payload.answers.answers;
    },
  },
});

export const {resetAnswers} = answersSlice.actions;