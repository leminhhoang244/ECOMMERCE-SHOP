import axios from "axios"
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
function MyProduct(){
    const [data ,setData]=useState("")
    useEffect(()=>{
        let userData = localStorage.getItem("auth")
        userData = JSON.parse(userData)
        let token = localStorage.getItem("token")
        token = JSON.parse(token)
        if(userData){
            let url = "http://localhost:8080/laravel/laravel/public/api/user/my-product" 
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };
            axios.get(url,config)
                .then((res)=>{
                    // console.log(res.data.data);
                    setData(res.data.data)
                })
                .catch((err)=>{console.log(err);})
        }
    },[])
    function checkId(e){
        let getId = e.target.value
        console.log(getId);
        let urlDelete = "http://localhost:8080/laravel/laravel/public/api/user/delete-product/" + getId
        let token = localStorage.getItem("token")
        token = JSON.parse(token)
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };
        
            axios.get(urlDelete,config)
                .then((res)=>{
                    console.log(res.data.data);
                    setData(res.data.data)
                })
                .catch((err)=>console.log(err))
    }
    function renderData(){
        return  Object.keys(data).map((value,key)=>{
            // Lấy hình ảnh dưới dạng mả hóa
            // let a = JSON.parse(data[value].image) 
            // console.log(a);
            return(
                <tr key={data[value].id}>
                    <td>
                        {data[value].id}
                    </td>
                    <td>
                        {data[value].name}
                    </td>
                    <td>
                        <img  className="image_product1" src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + data[value].id_user +"/" + (JSON.parse(data[value].image))[0]} alt="" />
                    </td>
                    <td>
                        {data[value].price}
                    </td>
                    <td className="addmore">
                        <Link to={"/account/editProduct/" + data[value].id}>Edit</Link> 
                        <button value={data[value].id} onClick={checkId}>X</button>
                    </td>
                </tr>
            )
        })}
    return(
        <>
        <div className="col-sm-9">
        <div className="table-responsive cart_info">
                <table className="table table-condensed ">
                    <thead className="tb1">
                        <tr className="cart_menu">
                            <td className="id">ID</td>   
                            <td className="name">Name</td>  
                            <td className="image">Image</td>                       
                            <td className="price">Price</td>
                            <td className="action">Action</td>
                            <td />
                        </tr>
                    </thead>
                    <tbody>
                        {renderData()}
                    </tbody>
                    <tfoot>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="addmore"> <Link to = "/account/addProduct" >Add New</Link> </td>
          </tfoot>
                </table>
        </div>
       
        </div>
        </>
    )
}
export default MyProduct