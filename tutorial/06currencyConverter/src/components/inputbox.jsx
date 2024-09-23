import React, { useId } from 'react'
//rfce
function InputBox({
    Lable,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) { 
    const id = useId()
  return (
    <div className={`bg-white p-3 rounded-lg text-sm   flex ${className}`}>
        <div className='w-1-2'>
            <lable htmlFor={id} className='text-black/40 mb-2 inline-block'> {Lable} </lable>
            <input id={id} type="number" className='outline-none w-full bg-transparent py-1.5' placeholder='Amount' disabled={amountDisable} value={amount} onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}></input>
        </div>

        <div className='w-1/2 flex flex-wrap justify-end text-right'>
        <p className='text-black/40 mb-2 w-full'>Currency Type</p>
        <select className='rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none' value={selectedCurrency} onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} disabled={currencyDisable}> 

          {currencyOptions.map((currency) => ( // dont use {{}}}{{}} here
            <option key={currency} value={currency}> {currency} </option>
          ))}

        </select>
        </div>

    </div>
  )
}

export default InputBox