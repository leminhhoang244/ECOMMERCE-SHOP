import axios from "axios";
import { useEffect, useState } from "react";
import FormErrors from "./FormErrors";

function Register() {
  const [input,setInput] =useState("");
  const [errors, setErrors] = useState({})
  const [getFile,setFile]= useState("")
  const [avarta,setAvarta] = useState("")
  
  function handleInput(e){
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput(state =>({...state,[nameInput]:value}))
  }
  function handleUsersInputFile(e) {
    const file = e.target.files
    let reader = new FileReader()
    reader.onload = (e)=>{
      // console.log(reader);
    setAvarta (e.target.result)
    // console.log(e.target.result);
    setFile(file)
    // console.log(file);
    }
    reader.readAsDataURL(file[0])
    // console.log(file[0]);

  }

  function handleSubmitForm(e){
    e.preventDefault()
    let errorSubmit ={}
    let flag = true
    let checkValiEmail= /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    let typeOfFile = ["png","jpg","jpeg","PNG","JPG"]
        if(input.name ===undefined){
            flag = false
            errorSubmit.name="vui lòng nhập tên"
        }
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
        if(input.address === undefined){
            flag = false
            errorSubmit.address = "vui long nhập address"
        }
        if(input.phone === undefined){
            flag = false
            errorSubmit.phone = "vui long nhập phone"
        }
        
        if(getFile){
            let getNameFile= getFile[0].name
            // console.log(getNameFile);
            let getTypeFile=getNameFile.split(".")
            // console.log(getTypeFile); 
            if(getFile.size > (1024*1024)){
                flag = false
                errorSubmit.avarta = "Qúa dung lượng File"
            }else{
              // console.log(typeOfFile.includes(getTypeFile[1]))
              // console.log(getTypeFile[1]);
              if(!typeOfFile.includes(getTypeFile[1])){
                flag = false
                errorSubmit.avarta="File không tồn tại"
              }
            }
        }else{
            flag = false
            errorSubmit.avarta = "Bạn chưa chọn ảnh"
        }
        if(!flag){
          setErrors(errorSubmit)
        }else{
          const data={
            name:input.name,
            email:input.email,
            password:input.password,
            phone:input.phone,
            address:input.address,
            avatar:avarta,
            level: 0
          }
          // console.log(avarta);
          axios.post("http://localhost:8080/laravel/laravel/public/api/register",data)
          .then((res)=>{
            // console.log(res);
            // - ket qua dung 
            // - ket qua sai
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
              alert("dk thanh cong")
            }
          })
        }
  }
  return (
    <>
     
            <div className="col-sm-4">
              <div className="signup-form">
                {/*sign up form*/}
                <h2>New User Signup!</h2>
                <form action="#" onSubmit={handleSubmitForm} enctype="multipart/form-data">
                  <input type="text" name ="name" placeholder="Name" onChange={handleInput}/>
                  <input type="email" name ="email" placeholder="Email Address" onChange={handleInput}/>
                  <input type="password" name ="password" placeholder="Password" onChange={handleInput}/>
                  <input type="text" name ="phone" placeholder="phone" onChange={handleInput}/>
                  <input type="text" name ="address" placeholder="address" onChange={handleInput}/>
                  <input type="file" name ="avarta" onChange={handleUsersInputFile} />
                  <button type="submit" className="btn btn-default">
                    Signup
                  </button>
                  {<FormErrors errors={errors}/>}
                </form>
              </div>
              {/*/sign up form*/}
            </div>
          
    </>
  );
}
export default Register;
