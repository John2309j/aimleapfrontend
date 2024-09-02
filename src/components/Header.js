import axios from "axios"
import { useNavigate } from "react-router-dom"

const Header =()=>{

    

    const navigate=useNavigate()
    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response && error.response.data) {
            navigate("/", { replace: true });
        }
        return Promise.reject(error.message);
    });
    const HandleLogout=()=>{
        
        axios.post('/user/logout',{},{
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }).then((data)=>{
            localStorage.removeItem('token')
            navigate('/')

        }).catch((err)=>{
              
            navigate('/')
        })


    }

    return (
        <>
          <div className="logout-container">
        <i className="fa fa-sign-out logout-icon" onClick={HandleLogout}></i>
    </div>
        </>
    )
}
export default Header