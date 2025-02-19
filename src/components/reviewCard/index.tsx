interface ReviewCardProps {
  companyName: string;
  rating: number;
  reviewText: string;
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  companyName,
  rating,
  reviewText,
  date,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{companyName}</h3>
        <span className="text-sm text-gray-600">{date}</span>
      </div>
      <div className="mt-2 flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={i < rating ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>
      <p className="mt-2 text-gray-700">{reviewText}</p>
    </div>
  );
};

export default ReviewCard;
