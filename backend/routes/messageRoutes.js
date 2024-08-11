
const{addMessage, getMessage}= require("../controllers/messageControllers");

const router = require("express").Router();

router.post("/addMsg",addMessage);
router.post("/getMsg",getMessage);




module.exports= router;
