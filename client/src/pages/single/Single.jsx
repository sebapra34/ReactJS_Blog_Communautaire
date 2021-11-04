import SideBar from "../../components/SideBar";
import SinglePost from "../../components/SinglePost";
import "./single.css";


const Single = () => {
    return (
        <div className="single">
            {/* Page article individuel */}
            <SinglePost />
            <SideBar />
        </div>
    );
};

export default Single;