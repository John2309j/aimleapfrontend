import { useState,useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const ViewAllUserTasks=(props)=>{

    const [ListShow,SetListShow]=useState([])

    const GetTasks=async()=>{
        SetListShow([])
        
        axios.get('/task/list-by-user?id='+props.userid+'', 
            
            {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            })
            .then((data) => {
                SetListShow(data.data.list) 
            })
            .catch((err) => {
              toast.error(err.response.data.msg);
            });
    
       }
        

    useEffect(()=>{
        GetTasks()
       },[])

    return (
        <>
          <section className="task-body">
    <div className="task-container">
        <div className="top_class_list_head">      <h1>Task Lists</h1><i className="fa fa-close" onClick={()=>{
          props.SetViewTask(false)
        }}></i></div>

        {
            ListShow.map((element)=>(
                <div className="task-card">
                <div className="task-header">
                    <h2>{element.name}</h2>
                    <span className="due-date">Due: {element.due_date}</span>
                </div>
                <p className="task-desc">{element.desc}</p>
                <div class="icon-container">
    
    </div>
            </div>
            ))
        }
  
     
    
   
    </div>
    </section>
        </>
    )
}
export default ViewAllUserTasks