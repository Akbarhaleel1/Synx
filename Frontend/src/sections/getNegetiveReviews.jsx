import React from 'react';
import { Star, User, Mail, Phone, MessageSquare } from 'lucide-react';
import Nav from "../components/Nav";
import useAuth from './customHooks/useAuth';

const NegativeReviewsPage = () => {
  // This would typically come from an API or prop
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      review: "The service was disappointing. The staff was unresponsive and the room wasn't clean upon arrival.",
      rating: 2,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      review: "I expected more for the price. The amenities were outdated and the breakfast was subpar.",
      rating: 1,
    },
    // Add more reviews as needed
  ];

  useAuth()

  const StarRating = ({ rating }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <Nav />
      <main className="flex-grow lg:ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Negative Reviews</h1>
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div className="flex items-center mb-4 sm:mb-0">
                      <div className="bg-red-100 rounded-full p-3">
                        <User className="w-6 h-6 text-red-500" />
                      </div>
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-900">{review.name}</h2>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center mb-1">
                        <Mail className="w-4 h-4 mr-2" />
                        {review.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {review.phone}
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <MessageSquare className="w-5 h-5 text-red-400 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{review.review}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NegativeReviewsPage;