import { useEffect, useState } from "react"
import FormErrors from "../Member/FormErrors"
import axios from "axios";

function Update(){
    const [getFile,setFile]= useState("")
    const [avata, setAvata] = useState("")
    const [errors,setErrors]=useState("")
    const [input,setInput]= useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    })
    useEffect(()=>{
        let userData=localStorage.getItem("auth")
        userData = JSON.parse(userData)
        // console.log(userData);
        if(userData){
            setInput({
                name:userData.name,
                email:userData.email,
                phone:userData.phone,
                address:userData.address
            })
        }
    },[])
    function handleInput(e){
        let keyName = e.target.name;
        let valueName = e.target.value;
        setInput(state => ({...state, [keyName]: valueName }))
    }
    function handleFile(e){
        let files = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvata(e.target.result); //Cái này để gởi qua api
            setFile(files[0]);
        };
        reader.readAsDataURL(files[0]);
    }
    function handleSubmit(e){
        e.preventDefault()
        let objErrors = {};
        let check = 1;
        let formatEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        // minh se tao 1 array chứa danh sach những đuôi file hình anh để kiểm tra
        let fileImg = ["png", "jpg", "jpeg", "PNG", "JPG"];

        if (input.name === "") {
            check = 2;
            objErrors.name = "Bạn chưa nhập thông tin Tên"
        }
        if (input.email === "") {
            check = 2;
            objErrors.email = "Bạn chưa nhập vào Email"
        } else {
            if (!formatEmail.test(input.email)) {
                check = 2;
                objErrors.email("Nhập Email sai định dạng")
            }
        }
        if (input.password === "") {
            check = 2;
            objErrors.password = "Bạn chưa nhập mật khẩu"
        }
        if (input.phone === "") {
            check = 2;
            objErrors.phone = "Bạn chưa nhập số điện thoại"
        }
        if (input.address === "") {
            check = 2;
            objErrors.address = "Bạn chưa nhập thông tin địa chỉ"
        }

        if (getFile) {
            let nameFile = getFile.name;
            // console.log(nameFile);
            let nameTail = nameFile.split(".");
            // console.log(nameTail);
            if (getFile.size > (1024 * 1024)) {
                check = 2;
                objErrors.avata = "Dung lượn file quá lớn"
            }
            if (!fileImg.includes(nameTail[1])) {
                check = 2;
                objErrors.avata = "File ảnh không tồn tại"
            }
        } else {
            check = 2;
            objErrors.avata = "Không có tệp nào được chọn "
        }

        if(check ===1){
            let token = localStorage.getItem("token")
            token= JSON.parse(token)
            let userData=localStorage.getItem("auth")
            userData = JSON.parse(userData)
            let url = "http://localhost:8080/laravel/laravel/public/api/user/update/" +userData.id
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };
            const formData = new FormData();
            formData.append('id' , userData.id)
            formData.append('email' , input.email)
            formData.append('name' , input.name)
            formData.append('password' , input.password)
            formData.append('phone', input.phone)
            formData.append('address' , input.address)
            formData.append('avatar' , avata)
            formData.append('level' , 0);

            axios.post(url, formData, config)
            .then(res => {
                console.log(res.data)
                if (res.data.errors) {
                    console.log(res.data.errors);
                    setErrors(res.data.errors)
                } else {
                    setErrors({})
                   alert("Cập nhật thành công");
                }
            })
            .catch(errors => console.log(errors))
        }

    }
    return(
        <div className="col-sm-9" >
                 <div className = "signup-form " > 
                 { /*login form*/ } 
                 <h2 className = "text-center" > update your account </h2> 
                 <form  onSubmit={handleSubmit} enctype = "multipart/form-data" >
                     <input type = "text" placeholder = "Enter Name"
                         name='name' value={input.name}
                         onChange={handleInput}
                     />
                     <input type = "email" readOnly
                         placeholder = "Enter Email Address"
                         name = 'email' value={input.email}
                         onChange ={handleInput}/>
                     <input type = "text" 
                         placeholder = "Password "
                         name = 'password' 
                         onChange = {handleInput}/>
                     <input type = "phone"
                         placeholder = "Enter Phone "
                         name = 'phone' value={input.phone}
                         onChange = {handleInput}/>
                     <input type = "address"
                         placeholder = "Enter Address"
                         name = 'address' value={input.address}
                         onChange ={handleInput}/> 
                     <input type = "file"
                         placeholder = "Fhile"
                         name = 'avata'
                         onChange = {handleFile}/>
                     <FormErrors errors={errors}/>
                     <button type = "submit" className = "btn btn-default" >Login</button> 
                 </form> 
            </div>
        </div>
    )
}
export default Update