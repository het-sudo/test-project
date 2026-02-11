// import { useState, useEffect, useCallback } from "react";
// import "./App.css";

// function App() {
//   const [images, setImages] = useState([
//     { id: 1, url: "https://picsum.photos/id/1015/800/600", folder: "All" },
//     { id: 2, url: "https://picsum.photos/id/1016/800/600", folder: "All" },
//     { id: 3, url: "https://picsum.photos/id/1025/800/600", folder: "All" },
//   ]);

//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [currentFolder, setCurrentFolder] = useState("All");


//   const filteredImages =
//     currentFolder === "All"
//       ? images
//       : images.filter((img) => img.folder === currentFolder);

 

//   const closeImage = () => setCurrentIndex(null);

//   const nextImage = useCallback(() => {
//     setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
//   }, [filteredImages.length]);

//   const prevImage = useCallback(() => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? filteredImages.length - 1 : prev - 1
//     );
//   }, [filteredImages.length]);



//   useEffect(() => {
//     if (currentIndex === null) return;

//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") closeImage();
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "ArrowLeft") prevImage();
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [currentIndex, nextImage, prevImage]);

//   const addImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const newImage = {
//       id: Date.now(),
//       url: URL.createObjectURL(file),
//       folder: "All",
//     };

//     setImages((prev) => [...prev, newImage]);
//     e.target.value=""

//   };

//   const deleteImage = (id) => {
//     setImages((prev) => prev.filter((img) => img.id !== id));
//     closeImage();
//   };


//   const moveToFolder = (id, folder) => {
//     setImages((prev) =>
//       prev.map((img) =>
//         img.id === id ? { ...img, folder } : img
//       )
//     );
//     closeImage();
//   };

//   return (
//     <div className="app">
//       <h1>React Gallery</h1>


//       <input type="file" onChange={addImage} />
      
     
//       <div className="folders">
//         {["All", "Favorites", "Travel"].map((folder) => (
//           <button
//             key={folder}
//             className={currentFolder === folder ? "active" : ""}
//             onClick={() => setCurrentFolder(folder)}
//           >
//             {folder}
//           </button>
//         ))}
//       </div>


//       <div className="gallery">
//         {filteredImages.map((img, index) => (
//           <img
//             key={img.id}
//             src={img.url}
//             alt=""
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>

//       {currentIndex !== null && (
//         <div className="modal">
//           <span className="close" onClick={closeImage}>✕</span>
//           <span className="prev" onClick={prevImage}>❮</span>

//           <img src={filteredImages[currentIndex].url} alt="" />

//           <div className="modal-actions">
//             <button
//               onClick={() =>
//                 deleteImage(filteredImages[currentIndex].id)
//               }
//             >
//               Delete
//             </button>

//             <button
//               onClick={() =>
//                 moveToFolder(
//                   filteredImages[currentIndex].id,
//                   "Favorites"
//                 )
//               }
//             >
//               Move to Favorites
//             </button>
//           </div>

//           <span className="next" onClick={nextImage}>❯</span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
// import { useState } from "react";
// import "./App.css";

// const faces = [1, 2, 3, 4, 5, 6];

// function App() {
//   const [current, setCurrent] = useState(0);

//   const rollDice = () => {
//     const randomIndex = Math.floor(Math.random() * faces.length);
//     setCurrent(randomIndex);
//   };

//   return (
//     <div className="app-container">
//       <h1>Dice Roller 🎲</h1>

//       {/* Dice window */}
//       <div className="dice-window">
//         <div
//           className="dice-strip"
//           style={{ transform: `translateY(-${current * 60}px)` }}
//         >
//           {faces.map((face) => (
//             <div className="dice-face" key={face}>
//               {face}
//             </div>
//           ))}
//         </div>
//       </div>
  
//       {/* Roll button */}
//       <button className="roll-button" onClick={rollDice}>
//         Roll Dice
//       </button>
//     </div>
//   );
// }

// export default App;
// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [input, setInput] = useState("");

//   const addTodo = () => {
//     if (input.trim() === "") return;

//     setTodos([
//       ...todos,
//       { id: Date.now(), text: input, completed: false }
//     ]);
//     setInput("");
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   return (
//     <div className="container">
//       <h2>Todo List</h2>

//       <div className="input-section">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Add a task..."
//         />
//         <button onClick={addTodo}>Add</button>
//       </div>

//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <span
//               onClick={() => toggleTodo(todo.id)}
//               className={todo.completed ? "completed" : ""}
//             >
//               {todo.text}
//             </span>
//             <button onClick={() => deleteTodo(todo.id)}>delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import "./App.css";

function App() {
  const products = [
    { id: 1, name: "Shirt", price: 500 },
    { id: 2, name: "Shoes", price: 1200 },
    { id: 3, name: "Watch", price: 2000 }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h2>Products</h2>

      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>
                {item.name} (₹{item.price})
              </span>

              <div>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{totalPrice}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
