import { useState } from 'react'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { InputBox } from './components/index.js'

function App() {
  const [amount , setAmount] = useState(0)
  const [from , setFrom] = useState('usd')
  const [to , setTo] = useState('inr')
  const [convertedAmount , setConvertedAmount] = useState(0)

  const currencyData = useCurrencyInfo(from)
  const options = Object.keys(currencyData)


  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyData[to])
  }

  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat' style={{backgroundImage: 'url(https://png.pngtree.com/background/20231031/original/pngtree-illustration-of-3d-rendered-graph-with-declining-dollar-banknotes-picture-image_5819641.jpg)'}}>

     <h1 className='text-3xl font-extrabold text-white bg-blue-400 rounded-lg p-3'>Currency Converter Using React js</h1>
      <div className='w-full content-center'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}>

            <div className='mb-5 '>
              <InputBox 
              Lable = "From"
              amount = {amount}
              onAmountChange={(amount) => setAmount(amount)}
              onCurrencyChange={(currency) => setFrom(currency)}
              currencyOptions = {options}
              selectedCurrency = {from}
               />
            </div>

            <div className='relative w-full h-0.5'>
              <button className='bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50' onClick={() => swap()}>Swap</button>
            </div>
            <div className='mt-14'>
              <InputBox 
              Lable = "To"
              amount = {convertedAmount}
              onAmountChange={(amount) => setAmount(amount)}
              amountDisable = {true}
              onCurrencyChange={(currency) => setTo(currency)}
              currencyOptions = {options}
              selectedCurrency = {to}
               />
            </div>
             <div className='relative w-full h-0.5 mt-12 '>
              <button class="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50">
                Convert {from.toUpperCase() + " To " + to.toUpperCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
