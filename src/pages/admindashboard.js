import axios from "axios"
import { useEffect, useState } from "react"
import ViewAllUserTasks from "../components/ViewUserTasks"
import Header from "../components/Header"
import toast from "react-hot-toast"

const AdminDashboard=()=>{

    const [UserList,SetUserList]=useState([])
    const [ViewTask,SetViewTask]=useState(false)
    const [ViewId,SetViewId]=useState('')

    const GetAllUser=async()=>{

        axios.get('/user/get-all',{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then((data)=>{
            SetUserList(data.data.list)
        }).catch((err)=>{
            
            if(err)
            {
             toast.error(err.response.data.msg);
            }
            else{
                toast.error('Something went wrong'); 
            }
           
        })

    }

    useEffect(()=>{
        GetAllUser()
    },[])

    const HandleViewTasks=(e)=>{
        const userid=e.target.getAttribute('data-userid')
        SetViewId(userid)
        SetViewTask(true)
    }

    return (<>
<Header/>
    {
        ViewTask===false ? <section className="task-body">
        <div className="task-container">
            <div className="top_class_list_head">      <h1>User List</h1><i className="fa fa-plus"></i></div>
    
            {
                UserList.map((element)=>(
                    <div className="task-card">
                    <div className="task-header">
                        <h2>Name:{element.name}</h2>
                      
                 
                    </div>
                    <div className="task-header">
                      
                        <h2>Email:{element.email}</h2>
                      
                 
                    </div>
                    <div className="task-header">
                     
                        <h2>Role:{element.role}</h2>
                 
                    </div>
                    <div>
                        <button className="tasks_view_button" data-userid={element.id} onClick={HandleViewTasks}>View tasks</button>
                    </div>
                 
                   
                </div>
                ))
            }
      
         
        
       
        </div>
        </section> : null
    }
        

    {
        ViewTask===true? <ViewAllUserTasks userid={ViewId} SetViewTask={SetViewTask}/> : null
    }
    </>
    )
}
export default AdminDashboard