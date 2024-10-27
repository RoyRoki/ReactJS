import React , {useState} from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import UserService from '../../services/UserService';


function DetailsFillCard() {

  const user = useSelector((state) => state.authslice.user);
  const {register, handleSubmit, watch} = useForm();
  const [message, setMessage] = useState("");
  const [editable, setEditable] = useState(false);

    function isMobileNo(number) {
        return number.length === 10
    } 
    const onSubmit = async (data) => {
        try {
          const response =await UserService.updateUserDetails(data, user.id);
          console.log(response + " from DetailsFill");
          setMessage("saved");
          hideMessage();
          setEditable(false);
        } catch (error) {
          setMessage(error.message);
        }
    }
    const hideMessage = () => {
      setTimeout(() => {
        setMessage("");
      },5000);
    }


  return (
    <div className={"border p-5  h-auto absolute "}>
        <div className='info'>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" defaultValue={user.mobileNo} placeholder='Mobile Number' {...register("mobileNo", {required: true, validate: (value) => isMobileNo(value), disabled: !editable})} />
            <input type='number' placeholder='age' defaultValue={user.age} {...register("age", {validate: age => age>12 && age<90, disabled: !editable})}/>
            <span>Gender</span>
            <section>
               <select defaultValue={user.gender} {...register('gender', { required: true , disabled: !editable})}>
                 <option value="M">M</option>
                 <option value="F">F</option>
               </select>
            </section>

            <input type="text" defaultValue={user.address1} placeholder='Address 1' {...register("address1", {disabled: !editable})}/>
            <input type="text" defaultValue={user.address2} placeholder='Address 2' {...register("address2", {disabled: !editable})}/>
            <input type="text" defaultValue={user.postalCode} placeholder='postalCode' {...register("postalCode", {disabled: !editable})}/>

            <button type="button" onClick={() => setEditable(!editable)}>{editable?"X" : "Edit"}</button>
            <button type="submit" className={editable?'block' : 'hidden'}>Save</button>

            <p>{message}</p>
        </form>
    </div>
  )
}

export default DetailsFillCard
