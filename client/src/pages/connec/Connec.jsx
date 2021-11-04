import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./connec.css";

const Connec = () => {

    const userRef = useRef();
    const passwordRef = useRef();
    const { user, dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try{
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({type:"LOGIN_SUCCESS", payload:res.data});
        }catch(err){
            dispatch({type:"LOGIN_FAILURE"});
        }
    };
    // console.log(user);
    // console.log(isFetching);
    return (
        <div className="connec">
            <span className="loginTitle">Se connecter</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Nom d'utilisateur</label>
                <input type="text"
                className="loginInput"
                placeholder="Saisir votre pseudo"
                ref={userRef}/>
                <label>Mot de passe</label>
                <input type="password"
                className="loginInput"
                placeholder="Saisir votre mot de passe"
                ref={passwordRef}/>
                <button className="loginButton" type="submit" disabled={isFetching}>Se connecter</button>
            </form>
            <button className="registerButton">
                <Link className="link" to= "/register" >S'inscrire</Link></button>
        </div>
    );
};

export default Connec;