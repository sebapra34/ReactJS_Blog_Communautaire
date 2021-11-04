import Post from "./Post";
import "../styles/posts.css";

const Posts = ({ posts }) => {
    return (
        <div className="posts">
            {posts.map((p) => (
                <Post key={p._id} post={p}/>
            ))}
        </div>
    );
};

export default Posts;