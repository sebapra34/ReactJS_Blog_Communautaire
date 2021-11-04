import "../styles/post.css";
import {Link} from "react-router-dom";

const Post = ({ post }) => {
    const PF = "http://localhost:5030/images/";
    return (
        <div className="post">
            {post.photo && (
                <img
                 className="postImg"
                 src={PF + post.photo}
                 alt="photoarticle"/>
            )}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c, k)=> (
                        <span className="postCat" key={k}>{c.name}</span>
                    ))}
                </div>
                <Link to= {`/post/${post._id}`} className="link" key={post._id}>
                <span className="postTittle" key={post._id}>{post.title}</span>
                </Link>
                <hr/>
                <span className="postDate">{new Date(post.createdAt).toLocaleString()}
                </span>
            </div>
            <p className="postDesc">{post.desc}</p>
        </div>
    );
};

export default Post;