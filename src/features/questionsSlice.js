import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../server";

const INITIAL_STATE = {
  questions: [],
};

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (information) => {
    const { formId } = information;
    const questions = await server.get(`/questions/${formId}`);
    console.log("data", questions.data.questions);
    return {
      questions: questions.data.questions
    }
  }
);

export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (information) => {
    const { formId, id, title, type, position } = information;
    /*await server.post(`/questions/${formId}`, {
      title,
      type,
      position,
    });*/
    return {
      id,
      title,
      type,
      position,
    };
  }
);



export const saveQuestions = createAsyncThunk(
  "questions/saveQuestions",
  async (information) => {
    const {formId, questions} = information;
    await server.patch(`/questions/${formId}`, {
      questions
    });
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState: INITIAL_STATE,
  reducers: {
    updateQuestion: (state, action) => {
      console.log(action);
      for (let i = 0; i < state.questions.length; i++) {
        if (state.questions[i].id === action.payload.id) {
          state.questions[i].title = action.payload.value;
        }
      }
    },
    resetQuestions: (state, action) => {
      state.questions = []
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(question => question.id !== action.payload.id);
      for (let i = 0; i < state.questions.length; i++) {
        state.questions[i].position = '' + (i + 1);
      }
    },
    swapQuestions: (state, action) => {
      let i1, i2;
      console.log(action.payload)
      i1 = action.payload.position - 1;
      if (action.payload.direction === "up") {
        i2 = i1 - 1;
        if (i2 === -1) i2 = 0;
      }
      else {
        i2 = i1 + 1;
        if (i2 === state.questions.length) i2 = state.questions.length - 1
      }
      let aux = state.questions[i1];
      state.questions[i1] = state.questions[i2];
      state.questions[i2] = aux;
      state.questions[i1].position = i1 + 1;
      state.questions[i2].position = i2 + 1;
      state.questions = state.questions.sort((a,b) => {
        return a.position - b.position
      })
    }
  },
  extraReducers: {
    [fetchQuestions.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.questions = action.payload.questions;
    },
    [createQuestion.fulfilled]: (state, action) => {
      state.questions.push({ ...action.payload });
    }
  },
});

export const {updateQuestion, resetQuestions, deleteQuestion, swapQuestions} = questionsSlice.actions;