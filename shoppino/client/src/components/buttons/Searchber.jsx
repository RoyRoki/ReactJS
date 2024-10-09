import React from 'react';

function Searchbar() {

  return (

         <div className='flex flex-grow'>
            <div className='bg-yellow-300 h-full w-10 flex items-center rounded-l-lg'>
                <svg className='scale-[0.7]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="white"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
            </div>

            <input className='outline-none rounded-r-lg w-full pl-4' type="text" placeholder='   Search Shoppino.in' />
            {/* <svg className='absolute scale-75  translate-x-[vw]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 20" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> */}
          </div>

  );
}

export default Searchbar;