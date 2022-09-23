$(document).ready(function(){
    var data_cart = localStorage.getItem("info_product")
    if(data_cart){
        data_cart = JSON.parse(data_cart)
    }
    var html = "";
    var sum= 0
    var total = 0;
    var getSum= $(this).find("span#total").text().replace("$",'')
    Object.keys(data_cart).map(function(key,value){
        var price = data_cart[key]['price'].replace('$','')
        var qty = data_cart[key]['qty']
        total = price * qty;
        sum= sum + total
        html += "<tr>" +
                    "<td class='cart_product'>"+
                        "<a href=''>" + '<img src ='+ data_cart[key]['img']+'>'+ "</a>" +
                    "</td>"+
                    "<td class='cart_description'>" +
                        "<h4>" + "<a href=''>" +data_cart[key]['name']+ "</a>"+ "</h4>" +
                        "<p>" +data_cart[key]['id']+ "</p>" +
                    "</td>" +
                    "<td class='cart_price'>" +
                    "<p>" +price+"</p>" +
                    "</td>" +
                    "<td class='cart_quantity'>" +
                        "<div class='cart_quantity_button'>" +
                            "<a class='cart_quantity_up' style='cursor:pointer' >" + "+" + "</a>" +
                            '<input class="cart_quantity_input" type="text" name="quantity" value='+data_cart[key]['qty'] +' autocomplete="off" size="2">' +
                            "<a class='cart_quantity_down' >"+ "-" +"</a>" +
                       "</div>" +
                    "</td>" +
                    "<td class='cart_total'>" +
                        "<p class='cart_total_price'>"+'$'+ total + "</p>" +
                    "</td>" +
                    "<td class='cart_delete'>" +
                        "<a class='cart_quantity_delete' >" + "<i class='fa fa-times'>" + "</i>" + "</a>" +
                    "</td>" +
                "</tr>";
    })
    $("table tbody").append(html)

    $(".cart_quantity_up").click(function(){
        var up_product =  $(this).closest(".cart_quantity").find(".cart_quantity_input").val()
        var up_total =  $(this).closest("tr").find("p.cart_total_price").text().replace('$','')
        var get_price = $(this).closest("tr").find(".cart_price p").text().replace('$','')
        var get_id =$(this).closest("tr").find(".cart_description p").text()
        if(up_product){
            up_product++
            $(this).closest(".cart_quantity").find(".cart_quantity_input").val(up_product)
            up_total = get_price * up_product
            $(this).closest("tr").find("p.cart_total_price").text('$'+up_total)
            sum = sum + up_total
            Object.keys(data_cart).map(function(key,value){
                if(key === get_id ){
                    data_cart[key]['qty'] +=1
                }
            })
        }
        localStorage.setItem("info_product",JSON.stringify(data_cart))
    })
    
    $(".cart_quantity_down").click(function(){
        var down_product =  $(this).closest(".cart_quantity").find(".cart_quantity_input").val()
        var down_total =  $(this).closest("tr").find("p.cart_total_price").text().replace('$','')
        var get_price = $(this).closest("tr").find(".cart_price p").text().replace('$','')
        var get_id =$(this).closest("tr").find(".cart_description p").text()
        if(down_product >1){
            down_product--
            $(this).closest(".cart_quantity").find(".cart_quantity_input").val(down_product)
            down_total = get_price * down_product
            $(this).closest("tr").find("p.cart_total_price").text('$'+down_total)
            sum = sum - down_total
            Object.keys(data_cart).map(function(key,value){
                if(key === get_id ){
                    data_cart[key]['qty'] --
                }
            })
        }
        localStorage.setItem("info_product",JSON.stringify(data_cart))
    })

    $(".cart_quantity_delete").click(function(){
        var get_id =$(this).closest("tr").find(".cart_description p").text()
        var get_tr =$(this).closest("tr").remove()
        Object.keys(data_cart).map(function(key,value){
            if(get_id === key){
                $(this).closest("tr").remove(get_tr)
                delete data_cart[get_id] 
            }
        })
        localStorage.setItem("info_product",JSON.stringify(data_cart))
    })

    $(this).find("span#total").text("$"+sum)
    
})