import { useState , useCallback , useEffect , useRef} from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [PassWord, setPassWord] = useState('')

  const generatePassWord = useCallback(() => { //chech the fn and optimize the work
    let pass = ''
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    if(numberAllow) str+="1234567890";
    if(charAllow) str+="/*-+~!@#$%^&*()=[]{};':,.<>?/";

    for(let i = 1; i<=length ; i++) {
      let x = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(x);
    }
    setPassWord(pass);
  } ,
  [length, numberAllow , charAllow]
) 
 const copyPassWord = () => {
  window.navigator.clipboard.writeText(PassWord)
  passWordRef.current?.select() // using ? if there are no pass then it have a option to select or not
 }

 const passWordRef = useRef(null)

  useEffect(() => {
     generatePassWord()
  },[length, numberAllow , charAllow])

  return (
    <div className='bg-blue-300 h-screen w-full'>
        <h1 className='text-5xl font-thin bg-orange-300 text-center'>Hello PassWord</h1>
        
        <div className='bg-white w-auto h-300 flix justify-center align-middle'>
          <input type="text" ref={passWordRef} value={PassWord} className='outline-none text-4xl p-2 m-5' placeholder='password' readOnly/>
          <button onClick={copyPassWord} className='bg-blue-500 text-4xl p-5 rounded-md'>Copy</button>
        </div>
        
        <div className='bg-green-400 w-500 h-300 flix justify-center align-middle'>
          <input type="range" className='p-5' value={length} min={4} max={32} onChange={(event) => {setLength(event.target.value)}} n/>
          <label htmlFor="length" className='text-3xl text-red-600 font-semibold mr-20 p-5'>Length: {length}</label>
          
          <input type="checkbox" defaultChecked={numberAllow} onChange={() => {setNumberAllow((p) =>!p)}} className='h-10 w-10 p-5 rounded-md' />
          <label htmlFor="number" className='text-3xl text-green-800 font-semibold mr-20 p-5'>Number</label>
          
          <input type="checkbox" defaultChecked={charAllow} onChange={() => {setCharAllow((p) =>!p)}} className='h-10 w-10 p-5 rounded-md' />
          <label htmlFor="char" className='text-3xl text-yellow-800 font-semibold mr-20 p-5'>Character</label>
        
        </div>
    </div>
  )
}

export default App
//3.38.00