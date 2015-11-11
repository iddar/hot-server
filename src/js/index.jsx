const React = require('react');
const ReactDOM = require("react-dom");
const App = require('./app.jsx');

require('!style!css!less!../css/main.less');

ReactDOM.render(<App />, document.getElementById('app'));
