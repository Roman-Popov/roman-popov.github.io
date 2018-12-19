import React, { Component } from 'react';
import './App.scss';

import Intro from './components/Intro';
import About from './components/About';
import Projects from './components/Projects';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Intro />
                <main>
                    <About />
                    <Projects />
                    <Contacts />
                </main>
                <Footer />
            </div>
        );
    }
}

export default App;
