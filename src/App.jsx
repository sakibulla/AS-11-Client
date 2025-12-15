import { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.png';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* Header with your logo */}
      <header className="App-header">
        <img src={logo} className="logo" alt="Xdecor Logo" />
        <h1>Xdecor</h1>
      </header>

      {/* Main content */}
      <main className="App-main">
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </main>

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default App;
