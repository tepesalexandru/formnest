import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../server";

const INITIAL_STATE = {
  forms: [],
  selectedForm: "",
  title: ""
};

export const fetchForms = createAsyncThunk("form/fetchForms", async () => {
  const forms = await server.get("/forms");
  return forms.data;
});

export const fetchForm = createAsyncThunk("form/fetchForm", async (information) => {
  const {formId} = information;
  const form = await server.get(`/forms/${formId}`);
  return form.data;
})

export const createForm = createAsyncThunk(
  "form/createForm",
  async (information) => {
    console.log(information);
    await server.post(`/forms`, {
      formId: information.formId,
      title: information.title,
    });
    return {
      formId: information.formId,
      title: information.title,
    };
  }
);

export const updateForm = createAsyncThunk(
  "form/updateForm",
  async (information) => {
    const { formId, title } = information;
    await server.patch(`/forms/${formId}`, {
      title,
    });
    return {
      title,
    };
  }
);

export const deleteForm = createAsyncThunk(
  "form/deleteForm",
  async (information) => {
    const { formId } = information;
    await server.delete(`/forms/${formId}`);
    return {
      formId,
    };
  }
);

export const formSlice = createSlice({
  name: "form",
  initialState: INITIAL_STATE,
  reducers: {
    selectForm: (state, action) => {
      state.selectedForm = action.payload.formId;
      state.title = action.payload.title
    },
    exitForm: (state, action) => {
      state.selectedForm = '';
      state.title = ''
    }
  },
  extraReducers: {
    [fetchForms.fulfilled]: (state, action) => {
      state.forms = action.payload;
    },
    [fetchForm.fulfilled]: (state, action) => {
      state.title = action.payload.title
    },
    [createForm.fulfilled]: (state, action) => {
      state.forms.push({ ...action.payload });
    },
    [deleteForm.fulfilled]: (state, action) => {
      state.forms = state.forms.filter(
        (form) => form.formId !== action.payload.formId
      );
    },
  },
});

export const { selectForm } = formSlice.actions;
