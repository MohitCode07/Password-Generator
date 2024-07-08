import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char); // password concatinate krto if + nhi use kela tr single letter yeta
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("passwod is copied");
      })
      .catch((err) => {
        alert("Failed to copy");
      });
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed.passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md px-4 mx-auto my-8 text-orange-500 bg-gray-700 rounded-lg shadow-md">
        <h1 className="my-3 text-center text-white">Password Generator</h1>
        <div className="flex mb-4 overflow-hidden rounded-lg shadow">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="w-full px-3 py-3 my-3 outline-none"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="px-3 text-white bg-blue-700 py-0.5 shrink-0 outline-none "
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gapx-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev); //true false reverse hot rahanar
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
