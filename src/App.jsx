import { useState, useEffect } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [todo, settodo] = useState([])
  const [val, setValue] = useState('')
  const [deadline, setDeadline] = useState('')
  const add = (event) =>{
    console.log(event.target.value)
    setValue(event.target.value)
  }
  const append = ()=>{
    if(val.trim() == ""){
      toast.error("Empty task is not allowed")
      return
    }
    if(deadline.trim()== ""){
      toast.error("The data cannot be empty")
      return
    }
    settodo([...todo, {id:Date.now(),text:val, status:false, deadline:deadline}])
    console.log(todo)
  }

const [editId, setEditId] = useState(null)
const [editText, setEditText] = useState("")
const [editDeadline, setEditDeadline] = useState("")

const [num1, setNum1] = useState(0)
const [num2, setNum2] = useState(0)
const [ans, setAns] = useState(0)



useEffect(() => {
  const today =new Date().toISOString().split("T")[0]

  todo.forEach((item) => {
    if (
      item.deadline &&
      item.deadline < today &&
      !item.status
    ) {
      toast.error(`Task "${item.text}" is overdue!`)
    }
  })

}, [todo])

const clear = () => {
  settodo([])
}
  return (
   <>
  <ToastContainer />
   <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Welcome to your todo list...</h2>
      </div>
      <div className="input">
        <input onChange={add} type="text" placeholder=" Add item..." />
        <input
  type="date"
  onChange={(e) => setDeadline(e.target.value)}
/>
        <i onClick={append} className="fas fa-plus">+</i>
      </div>
      <div><button onClick={clear}>clear</button></div>
      {
        todo.map((x)=>{
          return(
            <div className="todos">
        <div className="todo">
          <div className="left">
            <input type="checkbox"checked={x.status}
                      onChange={(e) => {
                        console.log(e.target.checked)
                        settodo(
                          todo.map((obj2) => {
                            if (obj2.id === x.id) {
                              return {
                                ...obj2,
                                status: e.target.checked
                              }
                            }
                            return obj2
                          })
                        )
                      }}
                    />
            
            {
  editId === x.id
    ? (
        <input
          value={editText}
          onChange={(e) =>
            setEditText(e.target.value)
          }
        />
        
      )
    : (
        <p>{x.text}</p>
      )
}
          {
  editId === x.id
    ? (
        <input
  type="date"
  value={editDeadline}
  onChange={(e) =>
    setEditDeadline(e.target.value)
  }
/>
        
      )
    :<p>{x.deadline}</p>
}

{
  editId === x.id
  ?
  (
    <button onClick={()=>{

       if(editText.trim() == ""){
      toast.error("Empty task is not allowed")
      return
    }
    if(editDeadline.trim()== ""){
      toast.error("The data cannot be empty")
      return
    }
      settodo(todo.map((obj)=>{
       
    if(obj.id === x.id){
      return{...obj, text:editText, deadline:editDeadline}
    }return obj
  }))
  setEditId(null)
    }}>save</button>
  ): null
}
          </div>
          <div className="right">
            <i className="fas fa-times" onClick={()=>{
              return(
                settodo(todo.filter((obj)=>{
                  if(obj.id != x.id){
                    return true    
                  }return false
                }))
              )
            }}>*</i>
          </div>
          <button onClick={()=>{
            setEditId(x.id)
            setEditText(x.text)
            setEditDeadline(x.deadline)
          }}>edit</button>
        </div>
      </div>
          )
        })
      }
      
    </div>

    <input type="text" onChange={(e)=>{

      setNum1(e.target.value)

    }}/>
    <input type="text" onChange={(e)=>{
      setNum2(e.target.value)
    }}/>
    <button onClick={()=>{

      setAns(num1+num2)

    }}>add</button>

    <div>{ans}</div>
   </>
  )
}

export default App
