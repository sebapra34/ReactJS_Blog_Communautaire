import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const SideBar = () => {
    const [cats, setCats] = useState([]);
    useEffect(()=>{
        const getCats = async () =>{
            const res = await axios.get("/categories")
            setCats(res.data)
        }
        getCats();
    },[])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <div className="sidebarTittle">A PROPOS</div>
                <img className="ImgAbout" src="https://zupimages.net/up/21/23/d4h7.jpg" alt="self" />
                <p>Bienvenue sur mon projet de blog photographique communautaire développé en MERN (mongo/express/react/node).
                    Il reste beaucoup à faire mais j'espère que vous le trouverez intéressant, bonne visite ! 
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTittle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c)=>(
                        <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
                            <li className="sidebarListItem" key={c._id}>{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
            <span className="sidebarTittle">FOLLOW US</span>
            <div className="sidebarSocial">
                <a href="https://www.instagram.com/sebp_fenrix/"><i className="sidebarIcone fab fa-instagram"></i></a>
               <a href="https://discord.gg/4rfagRnF"><i className="sidebarIcone fab fa-discord"></i></a>
               <a href="https://github.com/sebapra34"><i className="sidebarIcone fab fa-github"></i></a>
            </div>
            </div>
        </div>
    );
};

export default SideBar;