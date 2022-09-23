import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FormErrors from "../Member/FormErrors";

function Comment(props) {
  const [comment, setComment] = useState("");
  const [error, setErrors] = useState("");
  let params = useParams();
  function handleInput(e) {
    setComment(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const getLocal = localStorage.getItem("login");
    // console.log(getLocal);
    let errorSubmit = {};
    if (!getLocal) {
      alert("bạn chưa đăng nhập");
    }
    if (getLocal) {
      if (comment === "") {
        errorSubmit.messenger = "bạn chưa nhập bình luận";
        setErrors(errorSubmit);
      } else {
        let userData = localStorage.getItem("auth");
        userData = JSON.parse(userData);
        // console.log(userData);
        let getToken= localStorage.getItem("token")
        getToken = JSON.parse(getToken)
        // let tokenData = userData.success.token;
        // console.log(tokenData);
        let url ="http://localhost:8080/laravel/laravel/public/api/blog/comment/" + params.id;
        let config = {
          headers: {
            'Authorization': "Bearer " + getToken,
            "Content-Type": "application/x-www-form-urlencoded",
            'Accept': "application/json",
          },
        };
        // console.log(params.id);
        const formData = new FormData();
          formData.append("id_blog", params.id);
          formData.append("id_user", userData.id);
          formData.append("id_comment", props.getCmtCon ? props.getCmtCon :0 );
          formData.append("comment", comment);
          formData.append("image_user", userData.avatar);
          formData.append("name_user", userData.name);
        axios.post(url, formData, config)
          .then((res) => {
            props.getCmt(res.data.data)
          console.log(res.data.data);
        });
      }
    }
  }
  return (
    <>
      <div className="col-sm-9">
        {/*/Response-area*/}
        <div className="replay-box">
          <div className="row">
            <div className="col-sm-12">
              <h2>Leave a replay</h2>
              <div className="text-area">
                <div className="blank-arrow">
                  <label>Your Name</label>
                </div>
                <span>*</span>
                <form onSubmit={handleSubmit}>
                  <textarea
                    name="message"
                    rows={11}
                    defaultValue={""}
                    onChange={handleInput}
                  />
                  <FormErrors errors={error}/>
                  <button className="btn btn-primary">post comment</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/*/Repaly Box*/}
      </div>
    </>
  );
}
export default Comment;
