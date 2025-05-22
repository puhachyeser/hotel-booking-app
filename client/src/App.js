import React, {useEffect} from 'react'

function App() {
  useEffect(() => {
  fetch('http://localhost:5000/api/hello')
    .then(res => res.json())
    .then(data => console.log(data));
  }, []);

  return (
    <>
    </>
  );
}

export default App;
