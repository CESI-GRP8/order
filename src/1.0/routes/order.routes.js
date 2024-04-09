const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controllers");

router.get("/check", (req, res) => {
    res.status(200).json({ message: "API is up!" });
});

router.post("/", orderController.createOrder);

router.get("/", orderController.readAllOrders);
router.get("/:id", orderController.readOrder);
router.get("/restaurant/:restaurantNom", orderController.getOrdersParRestaurant);
router.get("/livreur/:livreurNom", orderController.getOrdersParLivreur);
 


router.patch("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;
