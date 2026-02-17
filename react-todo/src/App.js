import React from 'react'
// import Cart from './components/Cart'
// import Diceroller from './components/Diceroller'
// import Slider from './components/Slider'
import Todo from './components/Todo'
import Usercard from './components/Usercard'
import Role from './components/Role'
import Post from './components/nested/Post'
import { sampleComments } from './components/nested/sampleComments'
import Products from './components/Products'
import State from './components/State'

function App() {
  return (
    <div>
      {/* <Cart/> */}
      {/* <Diceroller/> */}
      {/* <Slider/> */}
      <Todo/>
    {/* <Usercard name="het" age="20" email="het@gmail.com" aavtar="https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"/>
    <Role/>
    <Post
      title="Nested Components in React"
      content="This shows how components can be nested."
      author="John Doe"
      comments={sampleComments}
    /> */}
    <Products/>
    <State/>
    </div>
  )
}

export default App