const Order = require('../models/order.models');

exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order({
            nomClient: req.body.nomClient,
            nomRestaurant: req.body.nomRestaurant,
            nomLivreur: req.body.nomLivreur,
            status: req.body.status,
            deliveryAdresse: req.body.deliveryAdresse,
            prixTotal: req.body.prixTotal,
            detailsCommande: req.body.detailsCommande
        });
        await newOrder.save();
        return res.status(200).json(newOrder);
    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json(errors);
        }
        return res.status(500).json({ message: "Something went wrong!" });
    }
}

exports.readAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}

exports.readOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(order);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}

exports.getOrdersParRestaurant = async (req, res) => {
    const restaurantNom = req.params.restaurantNom;
    try {
        const orders = await Order.find({ nomRestaurant: restaurantNom });
        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

exports.getOrdersParLivreur = async (req, res) => {
    const livreurNom = req.params.livreurNom;
    try {
        const commandes = await Order.find({ nomLivreur: livreurNom });
        return res.status(200).json(commandes);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}
