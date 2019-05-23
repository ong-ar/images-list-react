import React from 'react';

import './index.scss';
import Buttons from './Buttons';
import List from './List';

// https://github.com/airbnb/javascript/tree/master/react#class-vs-reactcreateclass-vs-stateless
// state 관리가 없을 경우 순수 함수로 사용하는 것이 좋습니다.
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>
          wanted-
          <code>CODE</code>
          -test
        </h3>
      </header>
      <Buttons />
      <List />
    </div>
  );
}

export default App;
