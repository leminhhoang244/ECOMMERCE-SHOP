$(document).ready(function () {
  var cartQtyAll = 0;
  $(".add-to-cart").click(function () {
    var id_product = $(this).closest(".single-products").attr("id");
    var src_img = $(this)
      .closest(".single-products")
      .find(".productinfo img")
      .attr("src");
    var price = $(this)
      .closest(".single-products")
      .find(".product-overlay h2")
      .text();
    var name_product = $(this)
      .closest(".single-products")
      .find(".product-overlay p")
      .text();
    var objCon = {
      id: id_product,
      img: src_img,
      price: price,
      name: name_product,
      qty: 1,
    };
    var objCha = {};
    var check = 1;
    var cartqtylocal = 0;
    var getList = localStorage.getItem("info_product");
    if (getList) {
      objCha = JSON.parse(getList);
      Object.keys(objCha).map(function (key, index) {
        if (key === id_product) {
          objCha[key]["qty"] += 1;
          check = 2;
        }
      });
    }
    if (check == 1) {
      objCha[id_product] = objCon;
    }
    localStorage.setItem("info_product", JSON.stringify(objCha));
  });
  var down = localStorage.getItem("info_product");
  if (down) {
    var cartqtylocal = 0;
    objCha = JSON.parse(down);
    Object.keys(objCha).map(function (key, index) {
      cartqtylocal = cartqtylocal + objCha[key]["qty"];
      console.log(cartqtylocal)
    });
    cartQtyAll = cartqtylocal;
  }
  $(this)
    .find("#cart-qty-all")
    .text("cart :" + cartQtyAll);
});
