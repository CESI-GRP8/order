const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const exampleModel = new Schema({
    example: {
        required: [true, "Type is a required field"],
        type: String,
    },
})

module.exports = mongoose.model("Example", exampleModel)