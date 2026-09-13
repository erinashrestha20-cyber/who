import { useState } from 'react';

function App() {
  let [count, setCount] = useState(0);

  const addCount = () => {
    // Only increase if count is less than 21
    if (count < 20) {
      setCount(count + 1);
    } else {
      console.log("Count cannot exceed over 20");
    }
  };

  const subCount = () => {
    // Only decrease if count is greater than 0
    if (count > 0) {
      setCount(count - 1);
    } else {
      console.log("Count cannot go below 0");
    }
  };

  return (
    <>
      <h1>Counter App</h1>
      <h2>Count : {count}</h2>
      <button onClick={addCount}>Increase Count</button>
      <br />
      <button onClick={subCount}>Decrease Count</button>
    </>
  );
}

export default App;