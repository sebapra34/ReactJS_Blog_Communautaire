import "./settings.css";
import Sidebar from "../../components/SideBar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const Settings = () => {

    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5030/images/";
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };

        if(file){ // si data (img) on crée un un objet FormData et on y stock des clé/valeurs
            //on crée aussi un nom de fichier unique via date
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUser.profilPic = filename;
            try{
                await axios.post("/upload",data);
            }catch(err){}
        }
        try{
            const res = await axios.put("/users/" + user._id, updatedUser); // id requise dans la methode(voir routes/users/update)
            setSuccess(true);
            dispatch({type: "UPDATE_SUCCESS", payload: res.data });
        }catch(err){
            dispatch({type: "UPDATE_FAILURE"});
        }
    };


    return (
        <div className="settings">
            <div className="settingsWrapper"> {/* container  */}
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Mettre à jour le compte</span>
                    <span className="settingsDeleteTitle">Supprimer le compte</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Image de profil</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilPic} className="PPicture" alt="photoprofil" />
                        <label htmlFor="fileInput">
                        <i className="settingsPPIcone fab fa-wolf-pack-battalion"></i>
                        </label>
                        <input
                         type="file"
                         id="fileInput"
                         style={{display:"none"}}
                         onChange={(e) => setFile(e.target.files[0])}
                         />
                    </div>
                    <label>Nom d'utilisateur</label>
                    <input
                    type="text"
                    required="required"
                    placeholder={user.username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                    type="text"
                    required="required"
                    placeholder={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Mot de passe</label>
                    <input
                    type="password"
                    required="required"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="settingsSubmit">Mettre à jour</button>
                    {success && 
                    <span
                    style={
                        {color: "green",
                        fontWeight: "bold",
                        marginTop: "10px",
                        textAlign: "center"}}>
                        Le profil a été mis à jour !
                    </span>}
                </form>
            </div> 
            <Sidebar />
        </div>
    );
};

export default Settings;