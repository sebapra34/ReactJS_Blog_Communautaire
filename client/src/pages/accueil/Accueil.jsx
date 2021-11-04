import "./accueil.css"
import Header from "../../components/Header";
import Posts from "../../components/Posts";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";

const Accueil = () => {
    const [posts,setPosts] = useState([]); // initial state : [] car on a pas encore fetch de data
    const {search} = useLocation();
    // console.log(location);


    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res= await axios.get("/posts"+search) // on veux faire un get des posts (url viens s'ajouter a la suite du proxy déclaré dans le package.json)
            // console.log(res)
            setPosts(res.data)
        }
        fetchPosts()
    },[search])
    return (
        <>
            <Header />
        <div className="accueil">
            <Posts posts={posts}/>
            <SideBar />
        </div>
        </>
    );
};

export default Accueil;