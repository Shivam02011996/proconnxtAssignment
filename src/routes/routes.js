const express = require('express');
const router = express.Router();
const controller= require("../controllers/controllers")
const middleware= require("../Middleware/middleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/ration",controller.createRation)

router.post("/login",controller.loginUser)

router.post("/inventory",middleware.authorization,controller.createInventory)

router.get("/inventory",middleware.authorization,controller.getInventory)

router.put("/inventory/:inventoryId",middleware.authorization,controller.updateInventory)

router.delete("/deleteInventory/:inventoryId",middleware.authorization,controller.deleteInventory)



module.exports = router;
