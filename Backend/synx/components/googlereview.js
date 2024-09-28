const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;


const fetchPlaceReviews = async (place_id) => {
  if (!place_id) {
    throw new Error("place_id is required");
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: place_id,
          key: GOOGLE_API_KEY,
          fields: "name,rating,reviews"         }
      }
    );

    const placeDetails = response.data.result;

    if (!placeDetails) {
      throw new Error("Place not found");
    }

    return {
      name: placeDetails.name,
      rating: placeDetails.rating,
      reviews: placeDetails.reviews || []
    };
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    throw new Error("Failed to fetch place reviews");
  }
};

module.exports = fetchPlaceReviews;