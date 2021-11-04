import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "../styles/topbar.css";

const TopBar = () => {

    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5030/images/";

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    
 

    return (
        <div className="topbar">
           <div className="topLeft">
                <a href="https://www.instagram.com/sebp_fenrix/"><i className="topIcone fab fa-instagram"></i></a>
                <a href="https://discord.gg/4rfagRnF"><i className="topIcone fab fa-discord"></i></a>
               <a href="https://github.com/sebapra34"><i className="topIcone fab fa-github"></i></a>
            </div> 
           <div className="topCenter">
               <ul className="topList">
                   <li className="topListItem">
                       <Link className="link" to= "/">Accueil</Link>
                    </li>
                   <li className="topListItem">
                       <Link className="link" to= "" >A Propos</Link>
                    </li>
                   <li className="topListItem">
                       <Link className="link" to= "" >Contact</Link>
                    </li>
                   <li className="topListItem">
                       <Link className="link" to= "/write" >Ecrire</Link>
                    </li>
                   <li className="topListItem" onClick={handleLogout}>
                       {/* la li n'apparait dans la bar que si user est log (TRUE) */}
                       {user && "Se déconnecter"}
                    </li>
               </ul>
            </div> 
           <div className="topRight">
               {/* si l'user est log (TRUE): affiche img SINON affiche liens vers register/login */}
               { 
               user ? (
                <Link to="/settings">
                <img className="topImg" src={PF + user.profilPic} alt="imgprofil"/>
                </Link>

               ) : (
                   <ul className="topList">
                       <li className="topListItem">
                            <Link className="link" to="/login">Se connecter</Link>
                       </li>
                       <li className="topListItem">
                            <Link className="link" to="/register">S'inscrire</Link>
                        </li>
                   </ul>
               )}
               <i className="topSearchIcone fas fa-search"></i>
           </div> 
        </div>
    );
};

export default TopBar;