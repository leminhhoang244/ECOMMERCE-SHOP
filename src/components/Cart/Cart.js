import axios from "axios"
import { useEffect, useState } from "react"
import { Link} from "react-router-dom";
function Cart(){
    const [data,setData] = useState([]);
    useEffect(()=> {
        let getLocal = localStorage.getItem("item")
        if(getLocal){
            getLocal = JSON.parse(getLocal)
            // console.log(getLocal);
            axios.post("http://localhost:8080/laravel/laravel/public/api/product/cart", getLocal)
            .then(res=>{
                // console.log(res.data.data);
                setData(res.data.data)
            })
            .catch(error=> console.log(error))
        }
    },[])
    function clickCong(e){
        let getId = e.target.id
        let getLocal = localStorage.getItem("item")
        let newDataCong = [...data]
        // console.log(newDataCong);
        newDataCong.map((value,key)=>{
            // console.log(value);
            // console.log(key);
            if(getId == value.id){
                newDataCong[key].qty +=1
            }
        })
        // console.log(newDataCong);
        setData(newDataCong)
        if(getLocal){
            getLocal = JSON.parse(getLocal)
            Object.keys(getLocal).map((key,index)=>{
                if(getId == key){
                    getLocal[key] +=1
                }
            })
        }
        localStorage.setItem("item",JSON.stringify(getLocal))
    }
    function clickTru(e){
        let getId = e.target.id;
        let newDataTru = [...data]; 
        newDataTru.map((value,key)=>{
            if(getId == value.id){
                // console.log(value.qty)
                if(value.qty > 1){
                    newDataTru[key].qty -= 1;  
                }
                else{
                   delete newDataTru[key]
                }   
            }
        })
        // setData(newDataTru)
        //------------ xóa empty ------------//
        newDataTru = newDataTru.filter(n => n)
        //------------ xóa empty ------------//
        console.log(newDataTru)
        setData(newDataTru)
        let getLocal = localStorage.getItem("item") 
        if (getLocal) {
            getLocal = JSON.parse(getLocal)
            Object.keys(getLocal).map((key,index)=>{
                // console.log(index);
                if(getId == key){
                    if(index > 1){
                        getLocal[key] -= 1;
                    }
                    else{
                        delete getLocal[getId]
                    }
                }   
            }) 
        }
        localStorage.setItem("item", JSON.stringify(getLocal))
    }
    
    function rederTotal(){
        if(Object.keys(data).length > 0){
            let sumTotal = 0
            Object.keys(data).map((value,key)=>{
                let tong = data[value].qty * data[value].price
                sumTotal += tong
            })
            return(sumTotal)
        }
    }
    function rederCart(){
        if(data.length > 0){
            return data.map((value,key)=>{
                // let c = (JSON.parse(data[value].image))[0]
                // console.log(c)
                return(
                    <tbody>
                        <tr>
                            <td>
                                <img className="image_product img-1" src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + value.id_user +"/" + (JSON.parse(value.image))[0]} alt="" /> 
                            </td>
                            <td class="cart_description">
                                <h4>{value.name}</h4>
                                <p>ID : {value.id}</p>
                            </td>
                            <td>
                                <p>${value.price}</p>
                            </td>
                            <td>
                                <div >
                                    <button id={value.id} onClick={clickCong} >+</button>  
                                    <input type="text"  className="text-center" autocomplete="off" size={2} value={value.qty} />
                                    <button id={value.id} onClick={clickTru} > - </button>
                                </div>
                            </td>
                            <td>
                                <p className="cart_total_price">${value.qty*value.price}</p>
                            </td>
                            <td>
                                <button  id={value.id} className="cart_quantity_delete">
                                    X
                                </button>
                            </td>
                        </tr>
                    </tbody>
                )
            })
        }
    }
    return(
        <div >
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                            <td className="image">Item</td>
                            <td className="description" />
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td />
                        </tr>
                    </thead>
                    {rederCart()}
                </table>
            </div>
             
            <section id="do_action">
            <div className="container">
                <div className="heading">
                <h3>What would you like to do next?</h3>
                <p>
                    Choose if you have a discount code or reward points you want to use or
                    would like to estimate your delivery cost.
                </p>
                </div>
                <div className="row">
                <div className="col-sm-6">
                    <div className="chose_area">
                    <ul className="user_option">
                        <li>
                        <input type="checkbox" />
                        <label>Use Coupon Code</label>
                        </li>
                        <li>
                        <input type="checkbox" />
                        <label>Use Gift Voucher</label>
                        </li>
                        <li>
                        <input type="checkbox" />
                        <label>Estimate Shipping &amp; Taxes</label>
                        </li>
                    </ul>
                    <ul className="user_info">
                        <li className="single_field">
                        <label>Country:</label>
                        <select>
                            <option>United States</option>
                            <option>Bangladesh</option>
                            <option>UK</option>
                            <option>India</option>
                            <option>Pakistan</option>
                            <option>Ucrane</option>
                            <option>Canada</option>
                            <option>Dubai</option>
                        </select>
                        </li>
                        <li className="single_field">
                        <label>Region / State:</label>
                        <select>
                            <option>Select</option>
                            <option>Dhaka</option>
                            <option>London</option>
                            <option>Dillih</option>
                            <option>Lahore</option>
                            <option>Alaska</option>
                            <option>Canada</option>
                            <option>Dubai</option>
                        </select>
                        </li>
                        <li className="single_field zip-field">
                        <label>Zip Code:</label>
                        <input type="text" />
                        </li>
                    </ul>
                    <Link className="btn btn-default update" to="">
                        Get Quotes
                    </Link>
                    <Link className="btn btn-default check_out" to="">
                        Continue
                    </Link>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="total_area">
                    <ul>
                        <li>
                        Cart Sub Total <span>$59</span>
                        </li>
                        <li>
                        Eco Tax <span>$2</span>
                        </li>
                        <li>
                        Shipping Cost <span>Free</span>
                        </li>
                        <li>
                        ${rederTotal()}
                        <span className="total1" />
                        </li>
                    </ul>
                    <Link className="btn btn-default update" to="">
                        Update
                    </Link>
                    <Link className="btn btn-default check_out" to="">
                        Check Out
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>)
}
export default Cart