import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Landing from './Landing/index';
import AnswerForm from './Answer/index';
import EditForm from './Edit/index';

export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="/" exact component={Landing} />
                        <Route path="/edit" component={EditForm} />
                        <Route path="/answer" component={AnswerForm} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
