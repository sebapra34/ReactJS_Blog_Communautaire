import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import "../styles/singlepost.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const SinglePost = () => {
    const location = useLocation();
    const path = (location.pathname.split("/")[2]);
    const [post, setPost] = useState({})
    const PF = "http://localhost:5030/images/";
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);


    useEffect(()=> {
        const getPost = async () => {
        const res = await axios.get("/posts/" + path);
        // console.log(res);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
    };
    getPost()
    }, [path]);


    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data : { username : user.username },
            });
            window.location.replace("/");
        } catch(err){}
    };


    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                     username : user.username,
                     title,
                     desc,
            });
            setUpdateMode(false);
            // window.location.reload();
        } catch(err){}
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper"> {/* container article */}
            {post.photo && (
                <img
                src={PF + post.photo}
                alt="articleimg" 
                className="singlePostImg"
                />
            )}
            { updateMode ? (
            <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            /> ) :  (

                <h1 className="singlePostTitle">{title}
                {post.username === user?.username && (
                    <div className="singlePostEdit">
                <i className="SinglePostIcone fas fa-highlighter" onClick={ () => setUpdateMode(true)}></i>
                <i className="SinglePostIcone fas fa-eraser" onClick={handleDelete}></i>
                </div>
                )}
                </h1>
                    )}

                <div className="singlePostInfo">
                    <span className="singlePostAuteur">
                        Auteur : 
                        <Link to={`/?user=${post.username}`} className="link">
                            <b> {post.username}</b>
                        </Link>
                    </span>
                    <div className="singlePostCateg">
                        <Link to={`/?cat=${post.categories}`} className="link">
                            <b> {post.categories}</b>
                        </Link>
                    </div>
                    <span className="singlePostDate">{new Date(post.createdAt).toLocaleString('fr-FR',{
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}</span>
                </div>
                { updateMode ? (
                <textarea
                className="singlePostDescInput"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                />) : (
                <p className="singlePostDesc">{desc}</p>
                )}
                { updateMode &&
                <button className="singlePostButton" onClick={handleUpdate}>Valider</button>
                }
            </div>
        </div>
    );
};

export default SinglePost;