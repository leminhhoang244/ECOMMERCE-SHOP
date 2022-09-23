import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";
function Detail(props) {
  let params = useParams();
  // console.log(params);
  const [comment ,setComment]= useState("")
  const [data, setData] = useState("")
  const [IdReply,setIdReply]=useState("")

  function getComment(data){
    let JoinComment = comment.concat(data)
    // console.log(JoinComment);
    setComment(JoinComment)
  }
  function getIdReply(getIdCmtCha){
    setIdReply(getIdCmtCha)
  }
  useEffect(() => {
    axios.get("http://localhost:8080/laravel/laravel/public/api/blog/detail/" + params.id)
    .then((res) => {
      setData(res.data.data)
      // console.log(res.data.data);
      setComment(res.data.data.comment)
      // console.log(res.data.data.comment);
    })
    .catch((errors) => {
        console.log(errors)
    });
  },[]);
  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          <div className="single-blog-post">
            <h3>{data.title}</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user" /> Mac Doe
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              {/* <span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span> */}
            </div>
            <a href>
              <img src="images/blog/blog-one.jpg" alt="" />
            </a>
            <p>
              {data.content}
            </p>{" "}
            <br />
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>{" "}
            <br />
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>{" "}
            <br />
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </p>
            <div className="pager-area">
              <ul className="pager pull-right">
                <li>
                  <a href="#">Pre</a>
                </li>
                <li>
                  <a href="#">Next</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*/blog-post-area*/}
        <div className="rating-area">
          <ul className="ratings">
            <li className="rate-this">Rate this item:</li>
            <Rate/>
            <li className="color">(6 votes)</li>
          </ul>
          <ul className="tag">
            <li>TAG:</li>
            <li>
              <a className="color" href>
                Pink <span>/</span>
              </a>
            </li>
            <li>
              <a className="color" href>
                T-Shirt <span>/</span>
              </a>
            </li>
            <li>
              <a className="color" href>
                Girls
              </a>
            </li>
          </ul>
        </div>
        {/*/rating-area*/}
        <div className="socials-share">
          <a href>
            <img src="images/blog/socials.png" alt="" />
          </a>
        </div>
        <h2>{comment.length} Reponse</h2>
        <ListComment data={comment} cmtCon={getIdReply}/>
        {/*/Response-area*/}
        <Comment getCmt={getComment} getCmtCon={IdReply}/>
        {/*/Repaly Box*/}
      </div>
    </>
  );
}
export default Detail;
