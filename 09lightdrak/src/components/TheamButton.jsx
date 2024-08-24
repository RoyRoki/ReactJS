import React from 'react'
import useThem from '../context/theam'

function TheamButton() {

    const {themMode , darkTheam , lightTheam} = useThem()

    const onChangeButton = (e) => {
      const darkMStatus = e.currentTarget.checked
      if(darkMStatus) {
        darkTheam()
      } else {
        lightTheam()
      }
    }

  return (
<div className="flex items-center justify-between p-4 bg-slate-200 dark:bg-lime-950 rounded-lg shadow-md">
  <label className="flex items-center space-x-3">
    <input
      type="checkbox"
      className="scale-150 accent-lime-500 dark:accent-lime-400"
      onChange={onChangeButton}
      checked={themMode === 'dark'}
    />
    <span className="text-slate-700 dark:text-white font-medium">Theme Changer</span>
  </label>
</div>

  )
}

export default TheamButton
