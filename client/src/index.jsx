import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import 'airbnb-browser-shims';
import DataProvider from './components/SharedContexts/DataProvider';

ReactDOM.render(<DataProvider><App /></DataProvider>, document.getElementById('app'));
