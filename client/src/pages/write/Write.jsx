import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";

const Write = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };

        if(file){ // si data (img) on crée un un objet FormData et on y stock des clé/valeurs
            //on crée aussi un nom de fichier unique via date
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo = filename;
            try{
                await axios.post("/upload",data);
            }catch(err){}
        }
        try{
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        }catch(err){}
    };

    return (
        <div className="write">
            <div className="sectionImg"></div>
             { file &&
            <img src={URL.createObjectURL(file)} className="writeImg" alt="" />
             }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcone fas fa-folder-plus"></i>
                    </label>
                    <input
                    type="file"
                    id="fileInput"
                    style={{display:"none"}}
                    onChange={ e => setFile(e.target.files[0])}
                    />
                    <input
                    type="text"
                    className="writeTitle"
                    placeholder="Titre"
                    autoFocus={true}
                    onChange={ e => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                    type="text"
                    className="writeInput writeText"
                    placeholder="Il était une fois..."
                    onChange={ e => setDesc(e.target.value)}>
                    </textarea>
                </div>
                <button className="writeSubmit" type="submit">
                    Et c'est parti !
                </button>
            </form>
        </div>
    );
};

export default Write;