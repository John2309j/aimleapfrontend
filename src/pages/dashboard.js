



import { useEffect, useState } from "react"
import AddTask from "../components/AddTask"
import axios from "axios"
import toast from "react-hot-toast"
import Header from "../components/Header"
const Dashboard=()=>{

    const [ShowPopup,SetShowPopup]=useState(false)

    const [ListShow,SetListShow]=useState([])

    const [EditId,SetEditId]=useState('')

   const GetTasks=async()=>{
    SetListShow([])
    
    axios.get('/task/list', 
        
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


   const DeleteTask=(e)=>{

    const Id=e.target.getAttribute('data-id')
  
    axios.delete('/task/delete/'+Id+'', 
        
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((data) => {
            toast.success(data.data.msg);
            GetTasks()
          
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
        });

   }

   const Handleedit=(e)=>{

    const Id=e.target.getAttribute('data-id')

    SetEditId(Id)
    SetShowPopup(true) 

   }


    return (<>

    <Header/>
    {
        ShowPopup===true ? <AddTask SetShowPopup={SetShowPopup} GetTasks={GetTasks} EditId={EditId}  /> : null
    }
    
    <section className="task-body">
    <div className="task-container">
        <div className="top_class_list_head">      <h1>Task List</h1><i className="fa fa-plus" onClick={()=>{
            SetEditId('')
            SetShowPopup(!ShowPopup)
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
        
        <i className="fa fa-edit" aria-hidden="true" data-id={element.id} onClick={(e)=>{
           Handleedit(e)
        }}></i>
    
        <i className="fa fa-trash" aria-hidden="true" data-id={element.id} onClick={DeleteTask}></i>
    </div>
            </div>
            ))
        }
  
     
    
   
    </div>
    </section>
    </>)

}

export default Dashboard