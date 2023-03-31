const pool = require("../config/db.config");
const query = require("../controllers/queries")
const counterImage = (req, res, next)=>{
    const id = parseInt(req.params.idapp)
    try {
        pool.query(query.select_image_app, [id])
           
            .then((reponse) => {
                req.counterImage = reponse.rowCount
            next()
        })
        .catch((error)=>{
            res.status(500).json(error)
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = {counterImage}