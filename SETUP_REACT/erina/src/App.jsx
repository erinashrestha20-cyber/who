import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
/// we need to import the Card1 component from the card.jsx file
import Template from './components/template.jsx'
import Features2 from './components/template.jsx'
import Card5 from './components/cards.jsx'
import ProgressBar from './components/card.jsx'

function App() {
  const [count, setCount] = useState(0);

  const myObj1 = {
    item: "Shoes",
    description: "A pair of running shoes",
    price: 1000,
  };

  const myObj2 = {
    item: "Slippers",
    description: "A pair of comfortable slippers",
    price: 500,
  };

  const myObj3 = {
    item: "High Heels",
    description: "A pair of stylish high heels",
    price: 10000,
  };

  return (
    <>
    <h1>Tailwind CSS + Props</h1>

   
    {/* <ProgressBar/>
    <Features2/>
    <Card5/> */}
    <Card5 myObj={myObj1} />
    <Card5 myObj={myObj2} />
    <Card5 myObj={myObj3} />
        </>
  )
}

export default App;
