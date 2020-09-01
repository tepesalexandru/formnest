import {combineReducers} from 'redux';
import {formSlice, questionsSlice, answersSlice, currentSlice} from '../features';

export default combineReducers({
    form: formSlice.reducer,
    questions: questionsSlice.reducer,
    answers: answersSlice.reducer,
    current: currentSlice.reducer
});