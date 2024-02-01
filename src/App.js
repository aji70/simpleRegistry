import { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import contractABI from "./abi.json";

function App() {
  const contractAddress = "0x7Ffe41574fB691ae157e242a20A81927fEdc2640";
  const [message, setMessage] = useState([]);
  const [newName, setnewName] = useState(" ");
  const [newAge, setnewAge] = useState(" ");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  async function setName() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.updateName(newName);
        await transaction.wait();
        alert("Successful");
        setnewName(" ");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  async function setAge() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.updateAge(newAge);
        await transaction.wait();
        alert("Successful");
        setnewAge(" ");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  async function getMessage() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getEntityDetails();

        const { name, age } = transaction;

        const name1 = [`${name}  is ${age}  years old`];

        setMessage(name1);

        console.log(name1);

        // setnewName(transaction);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  function handleMessageChange(e) {
    setnewName(e.target.value);
  }

  // function handleClearAge(e) {
  //   setAge(" ");
  // }
  function handleAgeChange(e) {
    setnewAge(e.target.value);
  }

  function handleClearMessage(e) {
    setnewAge(" ");
    setnewName(" ");
  }

  return (
    <div className="App">
      <h1>Simple Registery dApp</h1>
      <h2>Blockchain and Frontend integration</h2>
      <h3>
        <i>Name and Age update funstion with a update Function call</i>
      </h3>
      <input
        type="text"
        placeholder="Set Message"
        value={newName}
        onChange={handleMessageChange}
      />
      <br /> <br />
      <button onClick={setName}>Set Name</button>
      <br /> <br />
      <input
        type="text"
        placeholder="Set age"
        value={newAge}
        onChange={handleAgeChange}
      />
      <br /> <br />
      <button onClick={setAge}>Set Age</button>
      <br /> <br />
      <button onClick={getMessage}>Get Message</button>
      <h2>{message}</h2>
      <br /> <br />
      <button onClick={handleClearMessage}>Clear Message</button>
    </div>
  );
}

export default App;
