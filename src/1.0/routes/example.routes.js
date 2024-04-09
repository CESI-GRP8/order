const express = require("express")
const router = express.Router();

const exampleController = require("../controllers/example.controllers")

router.get("/check", (req, res) => {
    res.status(200).json({ message: "API is up!" })
})

router.post("/create", exampleController.createExamples)

router.get("/all", exampleController.readAll)
router.get("/all/:id", exampleController.readAll)
router.get("/exmaples", exampleController.readExmaples)
router.get("/exmaples/:id", exampleController.readExmaples)

router.patch("/exmaples/:id", exampleController.updateExmaples)

router.delete("/exmaples/:id", exampleController.deleteExmaples)

module.exports = router