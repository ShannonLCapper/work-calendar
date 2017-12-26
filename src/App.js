import React, { Component } from 'react';
import './App.css';
import Calendar from './components/CalendarWrapper';

class App extends Component {
    render() {
        return (
            <div className='app'>
                <Calendar />
            </div>
        );
    }
}

export default App;
