import React, { useEffect, useState } from "react";
import '../../assets/style/ReviewPage.scss';

const ReviewPage = () => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await fetch("http://localhost:3001/api/reviews");
        const reviewsResponseData = await reviewsResponse.json();
        setReviews(reviewsResponseData);
      } catch (error) {
        console.error("Erreur lors de la récupération des critiques:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <main>
      {reviews ? (
        <>
          {reviews.map((review) => (
            <article id="reviewArticle" key={review.id}>
              <p>{review.content}</p>
             
              {review.User && (
                <p>
                  Par {review.User.username}, publié le{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              )}
            </article>
          ))}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}
    </main>
  );
};

export default ReviewPage;