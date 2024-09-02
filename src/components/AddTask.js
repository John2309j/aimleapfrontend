import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
const AddTask=(props)=>{
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [due, setdue] = useState('')


    const CreateTaskFn=()=>{
        var Err=0;
 
      
        if(name==='')
         {
          toast.error('Please enter your name')
          Err=1;
         }
         if(description==='')
         {
              toast.error('Please enter your description')
              Err=1;
         }
         if(due==='')
            {
                 toast.error('Please enter your due on')
                 Err=1;
            }

            if(Err===0)
                {

                    if(props.EditId==='')
                    {

                        axios.post('/task/create', 
                            {
                              name: name,
                              desc: description,
                              due_date: due,
                            }, 
                            {
                              headers: {
                                Authorization: localStorage.getItem('token'),
                              },
                            })
                            .then((data) => {
                                toast.success(data.data.msg);
                              props.GetTasks()
                              props.SetShowPopup(false)
                            })
                            .catch((err) => {
                              toast.error(err.response.data.msg);
                            });

                    }
                    else if (props.EditId!=='')
                    {
                        axios.put('/task/update', 
                            {
                              name: name,
                              desc: description,
                              due_date: due,
                              task_id:props.EditId
                            }, 
                            {
                              headers: {
                                Authorization: localStorage.getItem('token'),
                              },
                            })
                            .then((data) => {
                                toast.success(data.data.msg);
                              props.GetTasks()
                              props.SetShowPopup(false)
                            })
                            .catch((err) => {
                              toast.error(err.response.data.msg);
                            });
                    }
    
                 
                      
    
                }


    }

    useEffect(()=>{
       if(props.EditId!=='')
       {

        axios.get('/task/details/'+props.EditId+'', 
        
            {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            })
            .then((data) => {
               
              setname(data.data.list.name)
              setdescription(data.data.list.desc)
              setdue(data.data.list.due_date)
             })
            .catch((err) => {
              toast.error(err.response.data.msg);
            });

       }
    },[])



    return (
        <>
               <div className="popup">
            <div className="popup-inner">
                <h2>{props.EditId==='' ?'Add a New task' : 'Update a task' }</h2>
                <form >
                    <label>
                        Name:
                        <input type="text" value={name} defaultValue={name} onChange={e => setname(e.target.value)} />
                    </label>
                    <label>
                        Description:
                        <textarea  value={description} onChange={e => setdescription(e.target.value)} />
                    </label>
                    <label>
                        Due On:
                        <input type="text" value={due} onChange={e => setdue(e.target.value)} />
                    </label>
                    <button type="button" onClick={CreateTaskFn}>{props.EditId==='' ?'Create' : 'Update' }</button>
                    <button type="button" onClick={()=>{props.SetShowPopup(false)}}>Cancel</button>
                </form>
             
            </div>
        </div>
        </>
    )
}

export default AddTask