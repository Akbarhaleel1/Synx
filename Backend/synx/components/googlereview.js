const axios = require("axios");
const GOOGLE_API_KEY = 'AIzaSyAcn2vA9OW0Kv1dmDhnQrnAdsH4xr65_80';

const google = async (place_id) => {
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
          fields: "name,rating,reviews",
          reviews_sort: 'newest'
        }
      }
    );

    const placeDetails = response.data.result;

    if (!placeDetails) {
      throw new Error("Place not found");
    }

    // Sort reviews by the time field (most recent first)
    const sortedReviews = (placeDetails.reviews || []).sort(
      (a, b) => b.time - a.time
    );

    return {
      // name: placeDetails.name,
      // rating: placeDetails.rating,
      reviews: sortedReviews 
    };
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    throw new Error("Failed to fetch place reviews");
  }
};
