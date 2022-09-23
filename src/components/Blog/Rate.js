import StarRatings from 'react-star-ratings';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Rate(){
    const [rating, setRating] = useState(0)
    const params = useParams()
    useEffect(()=>{
        axios.get("http://localhost:8080/laravel/laravel/public/api/blog/rate/" +params.id)
            .then((res)=>{
                const getDataRate = res.data.data
                let lengthdata = Object.keys(getDataRate).length
                // console.log(getDataRate);
                // console.log(lengthdata);
                let sum = 0
                if(Object.keys(getDataRate).length >0){
                    Object.keys(getDataRate).map((key,index)=>{
                        return (
                                sum += getDataRate[key]["rate"]
                        )
                    })
                    // console.log(sum);
                }
                const save = sum / lengthdata
                console.log(save);
                setRating(save)
            })
            .catch(errors=>console.log(errors));
    },[])
    function changeRating(newRating, name){
        const getLocal = localStorage.getItem("login");
        if(!getLocal){
            alert("bạn chưa đăng nhập");
        }else{
            let userData = localStorage.getItem("auth");
            userData = JSON.parse(userData);
            let getToken= localStorage.getItem("token")
            getToken = JSON.parse(getToken)
            let url ="http://localhost:8080/laravel/laravel/public/api/blog/rate/" + params.id;
            let config = {
                headers: {
                  'Authorization': "Bearer " + getToken,
                  "Content-Type": "application/x-www-form-urlencoded",
                  'Accept': "application/json",
                },
            }
            const formData = new FormData()
            formData.append('blog_id', params.id);
            formData.append('user_id', userData.id);          
            formData.append('rate', newRating);
        axios.post(url,formData,config)
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })     
        }
}
    return(
        <StarRatings
              rating={rating}
              starRatedColor="blue"
              changeRating={changeRating}
              numberOfStars={6}
              name='rating'
            />
    )
}
export default Rate

 
    
