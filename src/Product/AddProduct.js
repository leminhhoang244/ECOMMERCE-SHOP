import axios from "axios"
import { useEffect, useState } from "react"
import FormErrors from "../components/Member/FormErrors"

function AddProduct(){
    const [input ,setInput]=useState({
        status:1
    })
    const [errors,setErrors]=useState("")
    const [getFile,setFile]=useState("")
    const [getCategory, setCategory] = useState([])//
    const [getBrand, setBrand] = useState([])
    const [getId,setId]= useState("")
    const status = [
    {
        "id": 0,
        "name":"Sale",
    },
    {
        "id": 1,
        "name":"New"
    }
    ];
    useEffect(()=>{
        axios.get("http://localhost:8080/laravel/laravel/public/api/category-brand")
        .then(res=>{
          setCategory(res.data.category)
        //   console.log(res.data.category);//Lấy thông tin của category và sét vào v
          setBrand(res.data.brand)
        //   console.log(res.data.brand);//Lấy thông tin của brand và sét vào  
        })
        .catch(errors=>console.log(errors));
    },[]);
    function handleInput(e){
       
        let keyInput= e.target.name
        let valueInput = e.target.value
       
        setInput(state =>({...state,[keyInput]:valueInput}))
    }
    function handleFile(e){
        let nameFile = e.target.files
        setFile(nameFile)
    }
    function rederStatus(){
       
        return status.map((value,key)=>{
            return(
                <option key={value.id} value={value.id}>{value.name}</option> 
            )
        })
    }
    // Hàm lấy dữ liệu từ API category
    function handleCategory(){
        if(getCategory.length>0){
            return getCategory.map((value,key)=>{
                return(
                    <option key={value.id} value={value.id}>{value.category}</option>
                )
            }) 
        }
    }
    function handerClick(e){
        let id = e.target.value;
        setId(id)
    }


    function renderSale(){
        if(input.status == 0){
            return(
                <label>
                    <input type="sale" placeholder="0" name='sale' onChange={handleInput}/>
                </label>
            )
        }
        
    }    
    // Hàm lấy dữ liệu từ API brand
    function handleBrand(){
        if(getBrand.length>0){
            return getBrand.map((value,key)=>{
                return(
                    <option key={value.id} value={value.id}>{value.brand}</option>
                )
            }) 
        }
    }
    function handleSubmit(e){
        e.preventDefault()
        let objErrors = {};
        let check = 1;
        let fileImg = ["png", "jpg", "jpeg", "PNG", "JPG"];

        if(input.name ===""){
            check = 2;
            objErrors.name = "Bạn chưa nhập tên";
        }

        if(input.price ===""){
            check = 2;
            objErrors.price = "Bạn chưa nhập price";
        }
        if(input.detail ===""){
            check = 2;
            objErrors.detail = "Bạn chưa nhập detail";
        }
        
        if(input.category === ""){
            check = 2;
            objErrors.category = "Bạn chưa nhập category";
        }
        if(input.brand === ""){
            check = 2;
            objErrors.brand = "Bạn chưa nhập brand";
        }
        if(input.status === undefined || input.status === ""){
            check = 2
            objErrors.status = "Bạn chưa nhap status";
        }
        if(getId === 3){
            check = 2
            objErrors.status = "Bạn chưa nhap status";
        }
        if(getId === 1){
            if(input.sale === undefined || input.sale === ""){
                check = 2
                objErrors.sale = "Bạn chưa nhap % sale";
            }
        }
        if(input.company === ""){
            check = 2;
            objErrors.company = "Bạn chưa nhập company";
        }
        if(Object.keys(getFile).length > 0){
            Object.keys(getFile).map((key,index)=>{
                let nameFile = getFile[key].name;
                let nameTail = nameFile.split(".");

                if (getFile[key].size > (1024 * 1024)) {
                    check = 2;
                    objErrors.avata = "Dung lượn file quá lớn"
                }
                if(getFile.length > 3){
                    check = 2
                    objErrors.avata = "Tối đa upload 3 hình"
                }
                if (!fileImg.includes(nameTail[1])) {
                    check = 2;
                    objErrors.avata = "File ảnh không tồn tại"
                }
            })
        }
        else{
            check = 2;
            objErrors.avata = "Không có tệp nào được chọn "
        }
        if(check ===1){
            let token = localStorage.getItem("token")
            token= JSON.parse(token)
            let userData=localStorage.getItem("auth")
            userData = JSON.parse(userData)
            let url = "http://localhost:8080/laravel/laravel/public/api/user/add-product"
            let config ={ 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };
            // console.log(input.name);
            // console.log(input.company);
            // console.log(getFile);
            const formData = new FormData();
            formData.append("name",input.name)
            formData.append("price",input.price)
            formData.append("category",input.category)
            formData.append("brand",input.brand)
            formData.append("company",input.company)
            formData.append('detail' , input.detail)
            formData.append('status' , input.status)
            formData.append('sale' , input.sale ? input.sale : 0)
            Object.keys(getFile).map((item,i)=>{
                formData.append('file[]' , getFile[item]) 
            })
            axios.post(url,formData,config)
                .then((res)=>{
                    console.log(res);
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        setErrors({})
                       alert("Thêm thành công");
                    }
                }) 
        }
        else{
            setErrors(objErrors)
        }
    }
    return(
        <>
        <div className="col-sm-6" >
            <div className = "signup-form " > 
                <h2 className = "text-center" > add product </h2> 
                <form onSubmit={handleSubmit} action = "#" enctype = "multipart/form-data" >
                    <input type="text" placeholder="Name" name='name' onChange={handleInput}/>
                    <input type="price" placeholder="Price" name='price' onChange={handleInput}/>
                    <div className="form-group">
                        <select className="custom-select" name='category' onChange={handleInput}>
                            <option>Please choose category</option>    
                            {handleCategory()}
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" name='brand' onChange={handleInput}>
                        <option>Please choose brand</option>
                            {handleBrand()}
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" value={input.status} name='status'  onChange={handleInput}>
                            {rederStatus()}
                        </select>
                    </div>
                    {/** kiểm tra chọn  
                            <option value={0}>Sale</option>    
                            <option value={1}>New</option>
                    */}
                    {renderSale()}
                     {/** kiểm tra chọn */}
                    <input type="profile" placeholder="Company profile" name='company' onChange={handleInput}/>
                    <input type="file" placeholder="Fhile" name='file' multiple onChange={handleFile}/>
                    <textarea name="detail" placeholder="Detail" rows="10" cols="30" onChange={handleInput}></textarea>
                    <FormErrors errors={errors} />
                    <button type="submit" className="btn btn-default">Add</button>
                </form> 
            </div> 
        </div>
        </>
    )
}
export default AddProduct