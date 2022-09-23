import axios from "axios"
import { useEffect, useState } from "react"
import { useParams ,Link} from "react-router-dom"

function ProductDetail(){
    const params = useParams()
    const [getData,setData]=useState("")
    const [getImage,setImage]=useState("")
    useEffect(()=>{
        axios.get("http://localhost:8080/laravel/laravel/public/api/product/detail/" +params.id)
            .then((res)=>{
                console.log(res.data.data);
                setData(res.data.data);
                const image = res.data.data.image;
                console.log(image);
                const type = JSON.parse(image)
                console.log(type);
                setImage(type[0])
            })
            .catch((err)=>console.log(err))
    },[])
    function renderImage(){
        if(Object.keys(getData).length>0){
            let renderImagess = getData.image
            console.log(renderImagess);
            return renderImagess.map((value,key)=>{
                return(
                    <div className="item active xx">
                        <a href="">
                            <img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + getData.id_user + "/" + value} alt="" />
                        </a>
                    </div>
                )
            })
        }
    }
    // function onClickChangeImage(e){
    //     let 
    // }
    return(
        <>
        <div className="col-sm-9 padding-right">
            <div className="product-details">
            {/*product-details*/}
            <div className="col-sm-5">
                <div className="view-product">
                <img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + getData.id_user + "/" + getImage} alt=""/>
                <Link to="images/product-details/1.jpg" rel="prettyPhoto">
                    <h3>ZOOM</h3>
                </Link>
                </div>
                <div id="similar-product" className="carousel slide" data-ride="carousel">
                {/* Wrapper for slides */}
                <div className="carousel-inner">
                    {/* {renderImage()} */}
                </div>
                {/* Controls */}
                <Link
                    className="left item-control"
                    to="#similar-product"
                    data-slide="prev"
                >
                    <i className="fa fa-angle-left" />
                </Link>
                <Link
                    className="right item-control"
                    to="#similar-product"
                    data-slide="next"
                >
                    <i className="fa fa-angle-right" />
                </Link>
                </div>
            </div>
            <div className="col-sm-7">
                <div className="product-information">
                {/*/product-information*/}
                <img
                    src="images/product-details/new.jpg"
                    className="newarrival"
                    alt=""
                />
                <h2>{getData.name}</h2>
                <p>{getData.id}</p>
                <img src="images/product-details/rating.png" alt="" />
                <span>
                    <span>US ${getData.price}</span>
                    <label>Quantity:</label>
                    <input type="text" defaultValue={3} />
                    <button type="button" className="btn btn-fefault cart">
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                    </button>
                </span>
                <p>
                    <b>Availability:</b> In Stock
                </p>
                <p>
                    <b>Condition:</b> New
                </p>
                <p>
                    <b>Brand:</b> {getData.id_brand}
                </p>
                <Link to="">
                    <img
                    src="images/product-details/share.png"
                    className="share img-responsive"
                    alt=""
                    />
                </Link>
                </div>
                {/*/product-information*/}
            </div>
            </div>
        </div>
        
        
        </>
    )
}
export default ProductDetail