import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import axios from 'axios'

const SignUpLayout=()=>{




    const [Name,SetName]=useState('')
    const [Email,SetEmail]=useState('')
    const [Password,SetPassword]=useState('')

    const HandleSubmit=()=>{
       var Err=0;

       if(Name==='')
       {
        toast.error('Please enter your name')
        Err=1;
       }
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
        if(Password!=='')
            {
                if(!validatePassword(Password))
                {
                    toast.error('Please enter a valid password \n Minimum 8 characters, One letter & One Number & One symbol must') 
                    Err=1;
                }
            }

            if(Err===0)
            {

                axios.post('/user/signup',{
                    name:Name,
                    email:Email,
                    password:Password
                }).then((data)=>{
                    toast.success(data.data.msg)
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
      function validatePassword(password) {
        // Regex: Minimum 8 characters, at least one letter, one number, and one special character
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
      }
    return (
        <>
     


        <section className="login_layout">
        <div className="container">
        <div className="login-box">
            <h1>Sign Up</h1>
            <form action="#" method="POST">
            <div className="textbox">
                    <label for="email">Name<span className="astriekred">*</span></label>
                    <input type="text" id="name" name="name" placeholder="Enter your name"  onChange={(e)=>{SetName(e.target.value)}} />
                </div>
                <div className="textbox">
                    <label for="email">Email<span className="astriekred">*</span></label>
                    <input type="email" id="email" name="email" placeholder="Enter your email"  onChange={(e)=>{SetEmail(e.target.value)}}  />
                </div>
                <div className="textbox">
                    <label for="password">Password<span className="astriekred">*</span></label>
                    <input type="password" id="password" name="password" placeholder="Enter your password"  onChange={(e)=>{SetPassword(e.target.value)}}  />
                </div>
                <button type="button" className="btn" onClick={HandleSubmit}>Sign Up</button>
                <div className="btm_log_link"><Link to={'/'}>Login</Link></div>
           
            </form>
        </div>
    </div>
        </section>
      
        </>
    )

}
export default SignUpLayout