const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require('bcrypt');


////////////// Register (methods: .post, put, delete, get)//////////////////////////
// requete asynchrone sur le post de cette page, essayer de recuperer les données du new User,
// si la réponse à un statut 200 > save ces données en json (depuis la const user) et les retourne
// sinon catch l'erreur 500 et renvoi son json

router.post("/register", async (req, res)=> {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

/////////////// Login ////////////////////////////

router.post("/login", async (req, res)=> {
    try {
        const user = await User.findOne({ username: req.body.username})
        !user && res.status(400).json("mauvais, mauvais...")

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(400).json("mauvais, mauvais, vraiment...")

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router