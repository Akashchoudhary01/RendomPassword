import { useCallback, useEffect, useState , useRef } from "react";

function App() {
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (includeNumbers) str += "0123456789";
    if (includeSymbols) str += "!@#$%^&*()_";

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, includeNumbers, includeSymbols]);

  useEffect(()=>{
    passwordGenerator();

  } , [passwordGenerator])

 const passwordRef = useRef(null);

  return (
    <div className="h-screen w-full bg-zinc-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-800 text-white rounded-2xl p-6 shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-cyan-400">
          🔐 Password Generator
        </h1>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={password}
            placeholder="Your Password"
            readOnly
            className="flex-grow p-2 outline-none rounded bg-zinc-700 text-cyan-300 font-mono placeholder:text-gray-400"
          />
          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded font-semibold"
            onClick={passwordGenerator}
          >
            Change
          </button>
          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 active:bg-blue-400 rounded font-semibold"
            onClick={() => {
              window.navigator.clipboard.writeText(password);
              passwordRef.current?.select();
            }}
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-sm">
              Length: {length}
            </label>
            <input
              id="length"
              type="range"
              min={8}
              max={23}
              value={length}
              className="w-2/3 cursor-pointer accent-cyan-500"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numbers" className="text-sm">
              Include Numbers
            </label>
            <input
              id="numbers"
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((prev) => !prev)}
              className="accent-cyan-500 w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="symbols" className="text-sm">
              Include Symbols
            </label>
            <input
              id="symbols"
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols((prev) => !prev)}
              className="accent-cyan-500 w-4 h-4"
            />
          </div>
        </div>
      </div>
      <p className="absolute text-white text-sm bottom-4 right-5">
        Made with ❤️ by{" "}
        <a
          href="https://www.linkedin.com/in/akashchoudhary007/"
          className="text-cyan-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Akash
        </a>
      </p>
    </div>
  );
}

export default App;
