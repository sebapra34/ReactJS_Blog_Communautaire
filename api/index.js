const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth"); // indique mon router d'auth
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config({ path: './.env' });
app.use(express.json()); // permettre a l'app d'envoyer des objets json
app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URI, {
    // useMongClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connecté jusqu'ici !"))
    .catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name); //////// NOM du fichier / req.body.name
    },
});

const upload = multer({ storage:storage }); // celui defini ci-dessus
app.post("/api/upload", upload.single("file"), (req,res) =>{    // Key = file
    res.status(200).json("le fichier a été téléchargé");
});

app.use("/api/auth", authRoute); // utiliser le router d'auth
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// app.use("/",(req,res)=>{
//     console.log("hey this is main url")
// })

app.listen("5030", () =>{
    console.log("backend écoute");
});