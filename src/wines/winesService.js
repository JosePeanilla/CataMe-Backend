const mongoose = require("mongoose")
const { WineModel } = require("./WineModel.js") 

/* Service which interacts with the 'wine' database */
const winesService = {
  createWine: async (providedWineArgs) => {
    try {
      ("Winery ID recibido en createWine:", providedWineArgs.winery);
      const newWine = await WineModel.create(providedWineArgs);
      if (!newWine) throw new Error("Failed to create wine");
      return newWine;
    } catch (error) {
      throw new Error(error.message);
    }
},

  deleteWine: async ({ id }) => {
    try {
      const deletedWine = await WineModel.findByIdAndDelete(id)
      if (!deletedWine) throw new Error(`No wine found with ID '${id}'`)
      return deletedWine
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getAllWines: async () => {
    try {
      const wines = await WineModel.find()
      .populate("region", "name")
      .populate("winery", "name")
      .populate({
        path: "reviews",
        model: "Review",  
        select: "rating comment user",
        populate: { path: "user", select: "name surname" } 
      })
      .sort({ createdAt: -1 })
      const winesWithRatings = wines.map((wine) => {
        const totalReviews = wine.reviews.length
        const avgRating =
          totalReviews > 0
            ? wine.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
            : 0;
        return { ...wine.toObject(), averageRating: avgRating.toFixed(1) }
      })
      return winesWithRatings
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getWineById: async ({ id }) => {
    try {
      const wine = await WineModel.findById(id)
      .populate("region", "name")
      .populate("winery", "name")
      .populate("reviews", "rating createdAt")
      .sort({ "reviews.createdAt": -1 })
      if (!wine) throw new Error(`No wine found with ID '${id}'`)
      const totalReviews = wine.reviews.length
      const avgRating = totalReviews
        ? wine.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0
      return { ...wine.toObject(), averageRating: avgRating.toFixed(1) };
    } catch (error) {
      throw new Error(error.message)
    }    
  },

  getWinesByWinery: async (wineryId) => {
    try {
      const wines = await WineModel.find({ winery: new mongoose.Types.ObjectId(wineryId) })
        .populate("region", "name")
        .populate("winery", "name")
        .populate("reviews", "rating createdAt")
        .sort({ "reviews.createdAt": -1 })
      const winesWithRatings = wines.map(wine => {
        const totalReviews = wine.reviews.length
        const avgRating =
          totalReviews > 0
            ? wine.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
            : 0;
        return { ...wine.toObject(), averageRating: avgRating.toFixed(1) }
      })
      return winesWithRatings
    } catch (error) {
      throw new Error(error.message)
    }
  },
  
  updateWine: async ({ id, ...wineArgs }) => {
    try {
      const updatedWine = await WineModel.findByIdAndUpdate(id, wineArgs, {
        new: true, 
      })
        .populate("region", "name")
        .populate("winery", "name")
        .populate("reviews", "rating createdAt")
        .sort({ "reviews.createdAt": -1 })
      if (!updatedWine) throw new Error(`No wine found with ID '${id}'`)
      const totalReviews = updatedWine.reviews.length
      const avgRating =
        totalReviews > 0
          ? updatedWine.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
          : 0
      return { ...updatedWine.toObject(), averageRating: avgRating.toFixed(1) }
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

/*************************************************** Module export ****************************************************/
module.exports = { winesService }