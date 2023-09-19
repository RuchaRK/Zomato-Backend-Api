const express = require("express");

const restaurantRouter = express.Router();

const {
  createRestaurant,
  readRestaurant,
  readAllRestaurants,
  readRestaurantsByCuisine,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurantsByLocation,
  filterRestaurantsByRating,
  addDishToMenu,
  removeDishFromMenu,
  addRestaurantReviewAndRating,
  getUserReviewsForRestaurant,
} = require("../Services/restaurant.service.js");

restaurantRouter.post("/", async (req, res) => {
  const newDataToAdd = req.body;
  console.log({ newDataToAdd });
  try {
    const restaurant = await createRestaurant(newDataToAdd);
    console.log(restaurant);
    res.status(200).json({ message: "Success", restaurant });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while adding restaurant",
      error: error.message,
    });
  }
});

restaurantRouter.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const foundRestaurant = await readRestaurant(name);
    if (foundRestaurant === null || foundRestaurant.length === 0) {
      res
        .status(200)
        .json({ message: "Restaurant not found enter correct name." });
    } else {
      res.status(200).json({ message: "Success", foundRestaurant });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while retrieving restaurant data.",
      error: error.message,
    });
  }
});

restaurantRouter.get("/", async (req, res) => {
  try {
    const restaurants = await readAllRestaurants();
    res.status(200).json({ message: "Success", allRestroDetails: restaurants });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while retrieving restaurant data.",
      error: error.message,
    });
  }
});

restaurantRouter.get("/cuisine/:cuisineType", async (req, res) => {
  try {
    const { cuisineType } = req.params;
    const restaurantByCuisine = await readRestaurantsByCuisine(cuisineType);
    console.log(restaurantByCuisine, cuisineType);
    if (restaurantByCuisine === null || restaurantByCuisine.length === 0) {
      res
        .status(200)
        .json({ message: "Restaurant not found with the given cuisine." });
    } else {
      res.status(200).json({ message: "Success", restaurantByCuisine });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while retrieving restaurant data.",
      error: error.message,
    });
  }
});

restaurantRouter.post("/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const dataToBeupdated = req.body;
    const updatedRestaurant = await updateRestaurant(
      restaurantId,
      dataToBeupdated
    );
    if (updatedRestaurant === null) {
      res.status(200).json({ message: "Restaurant not able to update" });
    } else {
      res.status(200).json({ message: "Success", updatedRestaurant });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while updating.",
      error: error.message,
    });
  }
});

restaurantRouter.delete("/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const deletedRestaurant = await deleteRestaurant(restaurantId);

    if (deletedRestaurant === null) {
      res.status(200).json({ message: "Restaurant not able to delete." });
    } else {
      res.status(200).json({ message: "Success", deletedRestaurant });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while updating.",
      error: error.message,
    });
  }
});

restaurantRouter.get("/restaurants/search", async (req, res) => {
  try {
    const { location, city } = req.query;
    let restaurantByLocation;
    if (location) {
      restaurantByLocation = await searchRestaurantsByLocation(location);
    }
    if (city) {
      restaurantByLocation = await searchRestaurantsByLocation(city);
    }
    return res.status(200).json({ message: "Success", restaurantByLocation });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while updating.",
      error: error.message,
    });
  }
});

restaurantRouter.get("/rating/:minRating", async (req, res) => {
  try {
    const minRating = parseInt(req.params.minRating);
    const restaurantWithRating = await filterRestaurantsByRating(minRating);
    return res.status(200).json({ message: "Success", restaurantWithRating });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred.",
      error: error.message,
    });
  }
});

restaurantRouter.post("/:restaurantId/menu", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const dish = req.body;
    console.log(dish);

    const updatedRestaurant = await addDishToMenu(restaurantId, [dish]);
    return res.status(200).json({ message: "Success", updatedRestaurant });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred.",
      error: error.message,
    });
  }
});

restaurantRouter.delete("/:restaurantId/menu/:dishName", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { dishName } = req.params;

    const deletedDish = await removeDishFromMenu(restaurantId, dishName);

    return res.status(200).json({ message: "Success", deletedDish });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred.",
      error: error.message,
    });
  }
});

restaurantRouter.post("/:restaurantId/reviews", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const userReviews = req.body;
    const addReviews = await addRestaurantReviewAndRating(
      restaurantId,
      userReviews
    );

    return res.status(200).json({ message: "Success", addReviews });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred.",
      error: error.message,
    });
  }
});

restaurantRouter.get("/:restaurantId/reviews", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurantReviews = await getUserReviewsForRestaurant(restaurantId);

    return res.status(200).json({ message: "Success", restaurantReviews });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred.",
      error: error.message,
    });
  }
});

module.exports = restaurantRouter;
