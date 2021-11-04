import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
        const res = await axios.post("/auth/register", {
            username,
            email,
            password,
        });
        res.data && window.location.replace("/login");
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="register">
            <span className="registerTitle">S'inscrire</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Nom d'utilisateur</label>
                <input
                 type="text"
                 onChange={(e)=>setUsername(e.target.value)}
                 className="registerInput"
                 placeholder="Saisir votre pseudo"
                 />
                <label>Adresse e-mail</label>
                <input
                type="text"
                onChange={(e)=>setEmail(e.target.value)}
                className="registerInput"
                placeholder="Saisir votre e-mail"
                />
                <label>Mot de passe</label>
                <input
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                className="registerInput"
                placeholder="Saisir votre mot de passe"
                />
                <button className="registerBtn" type="submit">S'inscrire</button>
            </form>
            
            <button className="loginBtn">
                <Link className="link" to= "/login" >Se connecter</Link>
            </button>
            {error && <span 
            style={{color: "white", fontWeight: "bold", marginTop:"10px"}}>
            Quelque chose ne va pas...</span>}
        </div>
    );
};

export default Register;