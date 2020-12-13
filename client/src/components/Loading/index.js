import { Fragment } from "react";
import imgLoading from "../../assets/img/icons/loading.gif";
const Loading = () => {
    return (
        <Fragment>
            <div className="d-flex justify-content-center align-items-centerr mt-5 pt-5">
                <img src={imgLoading} alt="loading"></img>
            </div>
        </Fragment>
    )
}

export default Loading
