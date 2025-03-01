/************************************************ Node modules needed *************************************************/
/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    wine: { type: mongoose.Schema.Types.ObjectId, ref: "Wine", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Consumer", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false },
    date: { type: Date, default: Date.now },
}, { timestamps: true })

const ReviewModel = mongoose.model("Review", ReviewSchema)

/*************************************************** Module export ****************************************************/
module.exports = { ReviewModel, ReviewSchema }
