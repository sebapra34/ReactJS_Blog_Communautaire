const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// UPDATE USER modif par l'id
router.put("/:id", async (req, res)=> {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
            },
            { new: true}
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("Hey vous ne pouvez modifier que votre profil");    
    }
});


// DELET USER

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id){  // si le param userId en bdd et l'id en param correspondent
        try { // try general (remplacer par un if(user)cond ?)
            const user = await User.findById(req.params.id); // retrouver l'utilisateur en bdd via son id et le stocker dans cette const
            try { // try imbriqué
                // await Post.deleteMany({ username: user.username }); // delet les posts dont l'auteur (username) = à la prop username de l'user recupéré via l'id
                await User.findByIdAndDelete(req.params.id); // supprimer l'user dont l'id correspond a celle entrée en param
                res.status(200).json("L'utilisateur à été supprimé...");
            } catch (err) {
                res.status(500).json(err);
            }
        }catch (err){
            res.status(404).json("utilisateur non trouvé...");
        }
        } else {
        res.status(401).json("Hey vous ne pouvez supprimer que votre profil");    
    }
});


// GET USER

router.get("/:id", async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    }catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;