import React, { useState} from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Cart from "./components/Cart";
// import Diceroller from './components/Diceroller'
// import Slider from './components/Slider'
import Todo from "./components/Todo";
import Usercard from "./components/Usercard";
import Role from "./components/Role";
import Post from "./components/nested/Post";
import { sampleComments } from "./components/nested/sampleComments";
import Products from "./components/Products";
import State from "./components/State";
import Header from "./components/nested2/Header";
import Productlist from "./components/nested2/Productlist";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Login from "./components/Login";
import Email from "./components/email/Email";
import ColorMixer from "./components/ColorMixer";
import Searchcomponent from "./components/Searchcomponent";

function App() {
  // const [user, setUser] = useState(null); 

  // if (!user) return <Login setUser={setUser} />;
  return (
    <BrowserRouter>
    <div>
      
      {/* <Cart/> */}
      {/* <Diceroller/> */}
      {/* <Slider/> */}
       {/* <Todo /> */}
      {/* <Usercard
        name="het"
        age="20"
        email="het@gmail.com"
        aavtar="https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"
      /> */}
      {/* <Role /> */}
      {/* <Post
      title="Nested Components in React"
      content="This shows how components can be nested."
      author="John Doe"
      comments={sampleComments}
    />   */}
      {/* <Products/> */} ¸
      {/* <State/> */}
      {/* <Header /> */}
      {/* <Productlist /> */}
      {/* <h1>Welcome, {user.name}</h1>

      {user.role === "admin" && <AdminDashboard />}
      {user.role === "user" && <UserDashboard />}  */}
     
      {/* <ColorMixer/> */}

      <Routes>

        <Route path="/search" element={<Searchcomponent/>} >
            <Route path="todo" element={<Todo/>}/>

        </Route>
        <Route path="/email" element={<Email/>}/>
      </Routes>
 
  
    </div>
    </BrowserRouter>
  );
}

export default App;
