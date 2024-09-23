import React, { useEffect} from 'react'
import { useLoaderData } from 'react-router-dom'

export default function Github() {
    // const [data , setData] = React.useState([])
    // useEffect(() => {
    //  fetch('https://api.github.com/users/royroki')
    //       .then((response) => response.json())
    //       .then(data => {
    //         console.log(data);
    //         setData(data);
    //       })
    // }, [])
    const data = useLoaderData()
  return (
    
    <div  className='bg-orange-500'>
        <h2  className='text-center font-mono text-6xl'>Name: {data.name}</h2>
        <img src={data.avatar_url} alt="photo" />
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30773826.5103148!2d61.010447358121404!3d19.688315932838698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1724055522980!5m2!1sen!2sin" ></iframe>
    </div>
  )
}

export const GitHubInfoLoder = async () => {
    const response = fetch('https://api.github.com/users/royroki')
    .then((res) => res.json())

    return response
}
