import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
    answers: [

    ]
}

export const currentSlice = createSlice({
    name: 'current',
    initialState: INITIAL_STATE,
    reducers: {
        startForm: (state, action) => {
            const {questions} = action.payload;
            for (let i = 0; i < questions.length; i++) {
                let ans;
                if (questions[i].type === "text") {
                    ans = '';
                } else ans = -1;
                state.answers.push({
                    type: questions[i].type,
                    question: questions[i].title,
                    answer: ans
                })
                
            }
        },
        updateReply: (state, action) => {
            const {index, reply} = action.payload;
            state.answers[index].answer = reply;
        }
    }
})

export const {startForm, updateReply} = currentSlice.actions;