import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [numberToCall, setNumberToCall] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");

  const success = () =>
  toast(" 🎉 Congrats!!! Call has been made successfully", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
  });

const error = () =>
  toast.error("👻 An error has occured!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
  });

  const handleSubmit = async (e) => {
    await e.preventDefault();
  
    if (numberToCall === "" || displayName === "") {
      error();
    } else {
      const res = await fetch("http://localhost:5500/call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberToCall, displayName, message }),
      });
      const data = await res.json();
  
      if (data.success) {
        await success();
        await setNumberToCall("");
        await setDisplayName("");
        await setMessage("");
      } else {
        await error();
      }
    }
  };
  

  return (
    <div className="App">
      <div className="form">
        <h2>React & Twilio Programmable Voice </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            id="phone_number"
            placeholder="Number"
            name="phone_number"
            maxLength="15"
            required
            value={numberToCall}
            onChange={(e) => setNumberToCall(e.target.value)}
          />
          <input
            type="text"
            id="name"
            name="display-name"
            placeholder="Display Name"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <textarea
            placeholder="Voice Message (Optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input type="submit" value="Call" />
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        limit={1}
      />
    </div>
  );
}

export default App;
