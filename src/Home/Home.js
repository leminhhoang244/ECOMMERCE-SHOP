import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [getProduct, setProduct] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/laravel/laravel/public/api/product")
      .then((res) => {
        setProduct(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function buyCart(e) {
    // lấy id củ cart đó
    let getId = e.target.id;
    // console.log(getId);
    let item = {};
    // console.log(item);
    let check = 1;
    let tongQty = 0;
    let getLocal = localStorage.getItem("item");
    if (getLocal) {
      item = JSON.parse(getLocal);
      Object.keys(item).map((value, key) => {
        console.log(value);
        if (getId == value) {
          check = 2;
          item[value] += 1;
        }
        tongQty+=item[value]
      });
      // console.log(tongQty);
    }
    if (check == 1) {
      item[getId] = 1;
      tongQty += 1;
    }
    // console.log(tongQty);
    localStorage.setItem("item", JSON.stringify(item));
  }
  function renderData() {
    if (getProduct.length > 0) {
      return getProduct.map((value, key) => {
        let a = value.image;
        let b = JSON.parse(a);
        let images = b[0];
        return (
          <div className="col-sm-4" key={key}>
            <div className="product-image-wrapper">
              <div className="single-products" id="product-0">
                <div className="productinfo text-center">
                  <img
                    src={
                      "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                      value.id_user +
                      "/" +
                      images
                    }
                    alt=""
                  />
                  <h2>{value.price}</h2>
                  <p>{value.name}</p>
                  <Link to className="btn btn-default add-to-cart">
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                  </Link>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>{value.price}</h2>
                    <p>{value.name}</p>
                    <Link
                      to
                      className="btn btn-default add-to-cart"
                      id={value.id}
                      onClick={buyCart}
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <Link to>
                      <i className="fa fa-plus-square" />
                      Add to wishlist
                    </Link>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-plus-square" />
                      Add to compare
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          {/*features_items*/}
          <h2 className="title text-center">Features Items</h2>
        </div>
        {renderData()}
        {/*features_items*/}
      </div>
    </>
  );
}
export default Home;
