const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderModel = new Schema({
    nomClient: {
        required: [true, "Type is a required field"],
        type: String,
    },
    nomRestaurant: {
        required: [true, "Type is a required field"],
        type: String,
    },
    nomLivreur: {
        type: String,
    },
    status: {
        required: [true, "Type is a required field"],
        type: String,
    },
    deliveryAdresse: {
        required: [true, "Type is a required field"],
        type: String,
    },
    prixTotal: {
        required: [true, "Type is a required field"],
        type: Number,
    },
    detailsCommande: {
        required: [true, "Type is a required field"],
        type: String,
    },
})

module.exports = mongoose.model("Order", orderModel)