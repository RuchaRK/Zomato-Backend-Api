const Restaurant = require("../modules/Restaurant.model");

async function createRestaurant(restaurantData) {
  try {
    const restaurant = new Restaurant(restaurantData);
    const newRestaurant = await restaurant.save();
    return newRestaurant;
  } catch (error) {
    throw new Error(error);
  }
}

async function readRestaurant(restaurantName) {
  try {
    const restaurantDetails = await Restaurant.findOne({
      name: restaurantName,
    });
    return restaurantDetails;
  } catch (error) {
    throw new Error(error);
  }
}

//readRestaurant('My Restaurant')

async function readAllRestaurants() {
  try {
    const allRestaurants = await Restaurant.find({});
    return allRestaurants;
  } catch (error) {
    throw new Error(error);
  }
}

//readAllRestaurants()

async function readRestaurantsByCuisine(cuisineType) {
  try {
    const filtedRestaurantsByCuisine = await Restaurant.find({
      cuisine: cuisineType,
    });

    return filtedRestaurantsByCuisine;
  } catch (error) {
    throw new Error(error);
  }
}
//readRestaurantsByCuisine('Italian')

async function updateRestaurant(restaurantId, updatedData) {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedData,
      { new: true }
    );

    return updatedRestaurant;
  } catch (error) {
    throw new Error(error);
  }
}

//updateRestaurant("650546f475db5b9ea507e02f", { rating: 5 })

async function deleteRestaurant(restaurantId) {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    return deletedRestaurant;
  } catch (error) {
    throw new Error(error);
  }
}

//deleteRestaurant("65054e1db4f51494cd5ef721")

async function searchRestaurantsByLocation(location) {
  try {
    const restaurantsByLocation = await Restaurant.find({ city: location });

    return restaurantsByLocation;
  } catch (error) {
    throw new Error(error);
  }
}
//searchRestaurantsByLocation('Cityville')

async function filterRestaurantsByRating(ratingValue) {
  try {
    const restaurantsByRating = await Restaurant.find({
      rating: { $gte: ratingValue },
    });

    return restaurantsByRating;
  } catch (error) {
    throw new Error(error);
  }
}

//filterRestaurantsByRating(3)

async function addDishToMenu(restaurantId, dishData) {
  try {
    const addDishToMenu = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        $push: {
          menu: { $each: dishData },
        },
      },
      { new: true }
    );

    console.log(addDishToMenu);
    return addDishToMenu;
  } catch (error) {
    throw new Error(error);
  }
}

// addDishToMenu("65054e1db4f51494cd5ef720",
//   [
//     {
//       name: 'Classic Cheeseburger',
//       price: 10,
//       description: 'Beef patty with cheese, lettuce, and tomato',
//       isVeg: false,
//     },

//   ]
// )

async function removeDishFromMenu(restaurantId, dishName) {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        $pull: {
          menu: { name: dishName },
        },
      },
      { new: true }
    );

    return updatedRestaurant;
  } catch (error) {
    throw new Error(error);
  }
}

//removeDishFromMenu("65054e1db4f51494cd5ef720", "Classic Cheeseburger")

async function addRestaurantReviewAndRating(restaurantID, reviewsFromUser) {
  try {
    const restaurantWithRatingandReviews = await Restaurant.findByIdAndUpdate(
      restaurantID,
      {
        $push: {
          reviews: reviewsFromUser,
        },
      },
      { new: true }
    );

    return restaurantWithRatingandReviews;
  } catch (error) {
    throw new Error(error);
  }
}

//addRestaurantReviewAndRating("65054e1db4f51494cd5ef71d", "64f30185de10628e2deaf0a7", 3.2, "There deserts are best in the town!!")

async function getUserReviewsForRestaurant(restaurantId) {
  try {
    const findRestaurant = await Restaurant.findById(restaurantId);
    const userReviews = findRestaurant.reviews;
    return userReviews;
  } catch (error) {
    throw new Error(error);
  }
}

//getUserReviewsForRestaurant("65056cee43ae0c86b7f69fa2")

module.exports = {
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
};
