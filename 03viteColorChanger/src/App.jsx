import { useState , useEffect } from 'react'


function App() {

   function rgbToString (rgb) {
    return new String('rgb('+rgb.r.toString().padStart(2 , "0")+','+rgb.g.toString().padStart(2 , "0")+','+rgb.b.toString().padStart(2 , "0")+')');
   }
   function getInverseRGB(rgb) {
    return new String('rgb('+(255-parseInt(rgb.r))+','+(255-parseInt(rgb.g))+','+(255-parseInt(rgb.b))+')');
   }
   function rgbToHex(rgb) {
    return "#" + ToHex(rgb.r)  + ToHex(rgb.g)  + ToHex(rgb.b);
   }
   function ToHex(c) {
    var hex = (+c).toString(16).toUpperCase();
    return hex.length == 1 ? '0' + hex : hex;
   }
   function hexToRgb(hex) {
    let NewRGB = rgb;
    NewRGB.r = isNaN(parseInt(hex.slice(1,3) , 16))?rgb.r : parseInt(hex.slice(1,3) , 16); 
    NewRGB.g = isNaN(parseInt(hex.slice(3,5) , 16))?rgb.g : parseInt(hex.slice(3,5) , 16);
    NewRGB.b = isNaN(parseInt(hex.slice(5) , 16))?rgb.b : parseInt(hex.slice(5) , 16);
    return NewRGB;
   }

  const [color , setColor] = useState('gray')
  const [inverseColor , setInvers] = useState('green')
  const [rgb , setrgb] = useState({r:0,g:0,b:0})
  const [hex , setHex] = useState("#000000");
  const [randomColor , setRandomColor] = useState('black')

  const changeColor = (event,color) => {
    let newRGB = rgb;
    switch (color) {
      case 'r' : newRGB.r = event.target.value; break;
      case 'g' : newRGB.g = event.target.value; break;
      case 'b' : newRGB.b = event.target.value; break;
      case 'd': newRGB.r = 255 , newRGB.g = 0, newRGB.b = 0;break;
      case 'w': newRGB.r = 255 , newRGB.g = 255, newRGB.b = 0;break;
      case 'n': newRGB.r =0, newRGB.g = 255, newRGB.b = 0;break;
      case 'e':  newRGB.r = 0, newRGB.g = 255, newRGB.b =255;break;
    }
    setrgb(newRGB);
    setHex(rgbToHex(rgb));
    setColor(rgbToString(rgb));
    setInvers(getInverseRGB(rgb));
   
   
    
    
  }
  const changeColorHex = async (event) => {
  
         const newhex = event.currentTarget.value;
         if(newhex.length > 0 && newhex.length < 8) {
         setHex(newhex.toUpperCase());
         setrgb(hexToRgb(newhex));
         setColor(rgbToString(hexToRgb(newhex)));
         setInvers(getInverseRGB(hexToRgb(newhex)));
      
    }
  }

  const random = () => {
   
     {
      let r = Math.floor(Math.random() * 255 + 1);
      let g = Math.floor(Math.random() * 255 + 1);
      let b = Math.floor(Math.random() * 255 + 1);

      let newRGB = rgb;
      newRGB.r = r;
      newRGB.g = g;
      newRGB.b = b;
      setrgb(newRGB)
      setHex(rgbToHex(rgb));
      setColor(rgbToString(rgb));
      setInvers(getInverseRGB(rgb))
      setRandomColor(rgbToString(rgb))
    }
  }
  
  return (

     <div className='w-screen h-screen duration-1000 flex justify-center' style={{backgroundColor:color }}>
        <h1 className=' bg-white/20 p-5 rounded-md font-serif text-6xl top-4 mr-0 absolute shadow-2xl' style={{color: inverseColor}}>Background Changer Using React</h1>
        <div  className=' bg-white/10 p-10 rounded-md bottom-20 m-20 border-blue-500-5px  flex flex-wrap fixed justify-center gap-4 shadow-2xl'>
         <button className='bg-red-500   shadow-6xl' onClick={(event) => {changeColor(event,'d')}}>Red</button>
         <button className='bg-green-600 shadow-6xl' onClick={(event) => {changeColor(event,'n')}}>Green</button>
         <button className='bg-blue-500  shadow-6xl' onClick={(event) => {changeColor(event,'e')}}>Blue</button>
         <button className='bg-yellow-300 shadow-6xl' onClick={(event) => {changeColor(event,'w')}}>Yellow</button>
         <button className='bg-black    shadow-6xl ' onClick={() => random()} style={{backgroundColor:randomColor}}>Random</button>
         <button className='bg-black    shadow-6xl ' onClick={() => disco()}>Disco</button>
       </div>
       <div className='grid backdrop-blur-lg bg-white/20 p-2 rounded-md grid-rows-1 grid-flow-row gap-10 fixed  bottom-6 left-5 shadow-6xl'>
        <input type="text" className='bg-black/20 border font-serif shadow-2xl text-white text-3xl   rounded-lg focus:ring-0 focus:ring-offset-0 block w-full p-2.5 ' value={hex} onChange={(e) => {changeColorHex(e)}} />
       </div>
       <div className='grid backdrop-blur-lg bg-white/30 p-10 rounded-md grid-rows-1 grid-flow-row gap-10 fixed  bottom-20 right-5 shadow-6xl'>       
         <input type="range"  min={0} max={255} value={rgb.r} onChange={(event) => {changeColor(event,'r')}} />
         <input type="range"  min={0} max={255} value={rgb.g} onChange={(event) => {changeColor(event,'g')}} />
         <input type="range"  min={0} max={255} value={rgb.b} onChange={(event) => {changeColor(event,'b')}} />         
        </div>
       <p className=' bg-black/20 p-5 rounded-md font-serif text-6xl bottom-4 mr-0 absolute shadow-2xl'>{rgbToString(rgb)}</p>
     </div>
   
  )
}

export default App
