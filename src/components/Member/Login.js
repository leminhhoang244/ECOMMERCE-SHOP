import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormErrors from "./FormErrors"

function Login(){
  const [input,setInputs] = useState("")
  const [errors,setErrors] =useState("")
  const navigate = useNavigate()
  function handleInput(e){
    const nameInput=e.target.name
    const value = e.target.value
    setInputs(state =>({...state,[nameInput]:value}))
  }
  function handleSubmitForm(e){
    e.preventDefault()
    let errorSubmit ={}
    let flag =true
    let checkValiEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if(input.email === undefined){
            flag = false
            errorSubmit.email="vui lòng nhập email"
        }else{
            if(!checkValiEmail.test(input.email)){
                flag = false
                errorSubmit.email = "email không hop lệ"
            }
        }
        if(input.password === undefined){
            flag = false
            errorSubmit.password = "vui long nhập password"
        }
        if(!flag){
          setErrors(errorSubmit)
        }else{
          const data={
            email:input.email,
            password:input.password,
            level:0
          }
          // console.log(input.password);
          axios.post("http://localhost:8080/laravel/laravel/public/api/login",data)
            .then(res=>{
              console.log(res);
              if(res.data.errors){
                setErrors(res.data.errors)
              }else{
                alert("đăng nhập thành công")
                const check = true
                let token = res.data.success.token
                let auth= res.data.Auth
                // console.log(auth);
                localStorage.setItem("token",JSON.stringify(token))
                localStorage.setItem("auth",JSON.stringify(auth))
                localStorage.setItem("login",JSON.stringify(flag))
                navigate("/home")
              }
            })
          }
  }
    return(
        <>
        <section id="form">
        {/*form*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-1">
              <div className="login-form">
                {/*login form*/}
                <h2>Login to your account</h2>
                <form action="#" onSubmit={handleSubmitForm}>
                  <input type="email" name="email"placeholder="Email Address" onChange={handleInput} />
                  <input type="password"name="password" placeholder="password" onChange={handleInput}/>
                  <span>
                    <input type="checkbox" className="checkbox" />
                    Keep me signed in
                  </span>
                  <button type="submit" className="btn btn-default">
                    Login
                  </button>
                  {<FormErrors errors={errors}/>}
                </form>
              </div>
              {/*/login form*/}
            </div>
          </div>
        </div>
      </section>
        </>
    )
}
export default Login