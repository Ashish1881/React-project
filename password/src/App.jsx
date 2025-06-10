import  {useState, useEffect, useRef, useCallback} from 'react'

import './App.css'

function App() {
  const [Password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [chartar, setChartar] = useState(false)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789" 
    if (chartar) str += "!'()*+,-./:;<=>?@[\]^_`{|}~"

    for (let i = 1; i <=length; i++){
      
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
  
    }
    setPassword(pass)
    
  }, [length, number, chartar, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, chartar, passwordGenerator])
  
  // useRef hook
  const passwordRfe = useRef(null)

  const copyPassword = useCallback(()=> {
    passwordRfe.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8  text-black bg-[#B33791]'>
      <h1 className='text-white text-center my-3'>passwordGenerator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        placeholder='password'
        value={Password}
        readOnly
        className='w-full outline-none py-1 px-3'
        ref={passwordRfe}

        />
        <button 
        onClick={copyPassword}
        className='bg-[#A7C1A8] outline-none text-[#B33791] px-3 py-0.5 font-bold hover:bg-green-800 '>Copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 '>
              <input 
              type="range" 
              min={8}
              max={100}
              value={length}
              className='cursor-pointer '
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label  >Lenght: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox"
                defaultChecked={number}
                id='numberInput'
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
                 />
                 <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox" 
                id="chartarInput" 
                onChange={()=> {
                  setChartar((prev) => !prev);
                }}
                />
                <label htmlFor="chartarInput">Characters</label>
          </div>
     </div>
    </div>
    </> 
  )
}

export default App
