import Update from "./Update"
import {Link} from "react-router-dom"
function Account(){
    return(
        <div>
            <div className="col-sm-3">
                <div className="left-sidebar">
                    <h2>Account</h2>
                        <div className="panel-group category-products" id="accordian">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <Link to="/account/update">Account</Link>
                                    </h4>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <Link to="/account/myProduct">My Product</Link>
                                    </h4>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            {/* <Update/> */}
        </div>
    )
}
export default Account