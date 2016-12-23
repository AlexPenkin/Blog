import React from 'react';
import ReactDOM from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';

// ...
class App extends React.Component {
  render () {
    return (
      <div>
        <p> </p>
        <AwesomeComponent />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('portWrap')
);
