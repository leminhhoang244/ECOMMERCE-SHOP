import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FormErrors from "../components/Member/FormErrors"

function EditProduct(){
    // Lấy id sản phẩm bên trang myproduct
    const prams = useParams()
    const [getNameImage,setNameImage] = useState("")
    const [getData,setData]= useState("")
    const [getFile,setFile]= useState("")
    const [input,setInput]=useState({
        status:"",
        name: "",
        price: "",
        detail: "",
        company_profile:"",
        category:"",
        brand:"",
        status:"",
        sale:""
    })
    const [getCategory, setCategory] = useState([])
    const [getBrand, setBrand] = useState([])
    const [errors,setErrors]=useState("")
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
        let token = localStorage.getItem("token")
        token = JSON.parse(token)
        let url = "http://localhost:8080/laravel/laravel/public/api/user/product/" + prams.id
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };
        axios.get(url,config)
            .then((res)=>{
                setData(res.data.data)
                // console.log(res.data.data);
                setInput({
                    name:res.data.data.name,
                    price:res.data.data.price,
                    company_profile:res.data.data.company_profile,
                    detail:res.data.data.detail,
                    category:res.data.data.id_category,
                    brand:res.data.data.id_brand,
                    status:res.data.data.status,
                    sale:res.data.data.sale
                })
                // console.log(res.data.data.sale);
            })
            .catch((err)=>console.log(err))
        axios.get("http://localhost:8080/laravel/laravel/public/api/category-brand")
            .then((res)=>{
                setCategory(res.data.category)
                setBrand(res.data.brand)
            })    
    },[])
    // console.log(input.name);
    function handleInput(e){
        let valueInput= e.target.value
        let keyInput = e.target.name
        setInput(state =>({...state,[keyInput]:valueInput}))
    }
    function handelFile(e){
        let File = e.target.files;
        setFile(File);
        // console.log(File)
    }
    function checKed(e){
        let name = e.target.value
        // console.log(name)
        let check = e.target.checked;
        // console.log(check);
        // Nếu check rồi thì bỏ cái tên của ảnh vào đây
        if(check){
            setNameImage(state => ([...state, name]))
        }
        else{
            let c = getNameImage.filter((item,i)=>{
                return (item != name)
            })
            // console.log(c);
            setNameImage(c)
        }
    }
    function renderImage(){
        if(Object.keys(getData).length> 0){
            let renderImage = getData.image
            // console.log(renderImage);
            return renderImage.map((value, key)=>{
                return(
                    <li>
                        <img  className="image_edit" src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + getData.id_user + "/" + value} alt=""  />
                        <input type="checkbox" value={value} name="avataCheckBox" onChange={checKed}/>
                    </li>
                )
            })
        }
    }
    function renderCategory(){
        if(getCategory.length>0){
            return getCategory.map((value,key)=>{
                return(
                    <option key={value.id} value={value.id}>{value.category}</option>
                )
            }) 
        }
    }
    function renderBrand(){
        if(getBrand.length>0){
            return getBrand.map((value,key)=>{
                return(
                    <option key={value.id} value={value.id}>{value.brand}</option>
                )
            }) 
        }
    }
    function renderStatus(){
        return status.map((value,key)=>{
            return(
                <option key={value.id} value={value.id}>{value.name}</option> 
            )
        })
    }
    function rederSale(){
        if(input.status == 0 ){
            return(
                <label>
                    <input type="sale" placeholder="0" value={input.sale} name='sale' onChange={handleInput}/>
                </label>
            )
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
                if(getFile[key].size > (1024 * 1024)) {
                    check = 2;
                    objErrors.avata = "Dung lượn file quá lớn"
                }
                if(getFile.length > 3){
                    check = 2;
                    objErrors.avata = "Tối đa upload 3 hình"
                }
                if(!fileImg.includes(nameTail[1])) {
                    check = 2;
                    objErrors.avata = "File ảnh không tồn tại"
                }
            })
        }
        else{
            check = 2;
            objErrors.name = "Bạn chưa chọn file"
        }
        if(check ===1){
            let token = localStorage.getItem("token")
            token= JSON.parse(token)
            
            let url = "http://localhost:8080/laravel/laravel/public/api/user/edit-product/" + prams.id
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
                return( 
                    formData.append('file[]' , getFile[item]) 
                )
            })
            Object.keys(getNameImage).map((item,i)=>{
                return(
                    formData.append('avatarCheckBox[]' , getNameImage[item])
                )
            })
            axios.post(url,formData,config)
                .then((res)=>{
                    console.log(res);
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        setErrors({})
                       alert("Cập nhật thành công");
                    }
                })
                .catch(errors => console.log(errors)) 
        }
        else{
            setErrors(objErrors)
        }
    }

    return(
        <>
    <div className="col-sm-6" >
            <div className = "signup-form " > 
                <h2 className = "text-center" > edit product </h2> 
                <form onSubmit={handleSubmit} enctype="multipart/form-data" >
                    {/** Name */}
                    <input type="text" placeholder="Name" name='name' value={input.name} onChange={handleInput}/>
                    {/** Price */}
                    <input type="price" placeholder="Price" name='price' value={input.price} onChange={handleInput}/>
                    <div className="form-group">
                        <select className="custom-select" value={input.category} name='category' onChange={handleInput} >   
                            <option>Please choose category</option>
                            {renderCategory()}
                        </select>
                    </div>
                    <div className="form-group">
                        <select value={input.brand} className="custom-select" name='brand' onChange={handleInput}>    
                        <option>Please choose brand</option>
                        {renderBrand()}
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" name='status' value={input.status} onChange={handleInput}>
                            {renderStatus()}
                        </select>
                    </div>
                    {rederSale()}
                    <input type="file" placeholder="Fhile" name='file' multiple onChange={handelFile}/>
                    <ul className="ul_image">
                        {renderImage()}
                    </ul>
                    {/** Company_profile */}
                    <input type="company_profile" placeholder="company_profile" name='company_profile' value={input.company_profile} onChange={handleInput}/>
                    {/** Detail */}
                    <textarea name="detail" placeholder="Detail" rows="10" cols="30" value={input.detail} onChange={handleInput}></textarea>
                    <FormErrors errors={errors}/>
                    <button type="submit" className="btn btn-default">Edit</button>
                </form> 
            </div> 
        </div>
        </>
    )
}
export default EditProduct