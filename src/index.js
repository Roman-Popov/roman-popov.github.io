import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundaryPage from './components/ErrorBoundaryPage';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <ErrorBoundaryPage><App /></ErrorBoundaryPage>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

document.getElementById('root').style.minHeight = window.innerHeight + 'px'

window.addEventListener('resize', () => document.getElementById('root').style.minHeight = window.innerHeight + 'px')
