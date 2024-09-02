import { Link,useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useState } from "react"
import axios from "axios"
const LoginLayout=()=>{

    const [Email,SetEmail]=useState('')
    const [Password,SetPassword]=useState('')
    const navigate=useNavigate()

 
    const HandleLogin=()=>{
        var Err=0;
 
      
        if(Email==='')
         {
          toast.error('Please enter your email')
          Err=1;
         }
         if(Password==='')
         {
              toast.error('Please enter your password')
              Err=1;
         }
         if(Email!=='')
         {
             if(!validateEmail(Email))
             {
                 toast.error('Please enter a valid email address') 
                 Err=1;
             }
         }
     
 
             if(Err===0)
             {
 
                 axios.post('/user/login',{
                     email:Email,
                     password:Password
                 }).then((data)=>{

                    if(data.data.token)
                    {
                        localStorage.setItem('token',data.data.token)
                        if(data.data.user.role==='user')
                        {
                        navigate('/dashboard')
                        }
                        else if(data.data.user.role==='admin')
                        {
                        navigate('/admin-dashboard')
                        }
                   
                        
                    }
                  
                     console.log(data)
                 }).catch((err)=>{
                   
                     toast.error(err.response.data.msg)
                 })
 
             }
     }

     function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }
  

    return (
        <>
        <section className="login_layout">
        <div className="container">
        <div className="login-box">
            <h1>Login</h1>
            <form action="#" method="POST">
            <div className="textbox">
                    <label for="email">Email<span className="astriekred">*</span></label>
                    <input type="email" id="email" name="email" placeholder="Enter your email"  onChange={(e)=>{SetEmail(e.target.value)}}  />
                </div>
                <div className="textbox">
                    <label for="password">Password<span className="astriekred">*</span></label>
                    <input type="password" id="password" name="password" placeholder="Enter your password"  onChange={(e)=>{SetPassword(e.target.value)}}  />
                </div>
                <button type="button" className="btn" onClick={HandleLogin}>Login</button>
              
                <div className="btm_log_link"><Link to={'/signup'}>Sign Up</Link></div>
             
            </form>
        </div>
    </div>
        </section>
      
        </>
    )

}
export default LoginLayout