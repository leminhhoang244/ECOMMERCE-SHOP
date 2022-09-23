import { render } from "@testing-library/react";
import axios from "axios";
import Comment from "./Comment";
import { Link } from "react-router-dom";
function ListComment(props) {
  function getIDCha(e) {
    let getID = e.target.id;
    // console.log(getID);
    let dataIdReply = props.cmtCon;
    dataIdReply(getID);
  }
  function renderData() {
    const data = props.data;
    // console.log(data);
    if (data.length > 0) {
      return data.map((value, key) => {
        if (value.id_comment=== 0) {
          return (
            <>
                  <li key={key} className="media" >
                    <a className="pull-left img-listcomment" href="#">
                      <img
                        className="media-object"
                        src={
                          "http://localhost:8080/laravel/laravel/public/upload/user/avatar/" +
                          value.image_user
                        }
                        alt=""
                      />
                    </a>
                    <div className="media-body">
                      <ul className="sinlge-post-meta">
                        <li>
                          <i className="fa fa-user" />
                          {value.name_user}
                        </li>
                        <li>
                          <i className="fa fa-clock-o" /> {value.updated_at}
                        </li>
                        <li>
                          <i className="fa fa-calendar" /> {value.created_at}
                        </li>
                      </ul>
                      <p>{value.comment}</p>
                      <a
                        className="btn btn-primary"
                        href
                        id={value.id}
                        onClick={getIDCha}
                      >
                        <i className="fa fa-reply" />
                        Replay
                      </a>
                    </div>
                  </li>
                  {
                      data.map((value1, key1) => {
                      if ( parseInt(value1.id_comment) === parseInt(value.id))
                      {
                        return (
                          <li key={key1} className="media second-media">
                            <a className="pull-left img-listcomment" href>
                              <img
                                className="media-object"
                                src={
                                  "http://localhost:8080/laravel/laravel/public/upload/user/avatar/" +
                                  value1.image_user
                                }
                                alt=""
                              />
                            </a>
                            <div className="media-body">
                              <ul className="sinlge-post-meta">
                                <li>
                                  <i className="fa fa-user" />
                                  {value1.name_user}
                                </li>
                                <li>
                                  <i className="fa fa-clock-o" />
                                  {value1.updated_at}
                                </li>
                                <li>
                                  <i className="fa fa-calendar" />
                                  {value1.created_at}
                                </li>
                              </ul>
                              <p>{value1.comment}</p>
                              <a className="btn btn-primary" href>
                                <i className="fa fa-reply" />
                                Replay
                              </a>
                            </div>
                          </li>
                        );
                      }
                    })
                  }
            </>
          );
        }
      });
    }
  }

  return <>
  <div className="col-sm-9" >
    <div className="response-area">
      <ul className="media-list">
        {renderData()}
      </ul>
    </div>
  </div>

  </>;
}
export default ListComment;
