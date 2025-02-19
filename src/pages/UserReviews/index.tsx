interface Review {
  id: number;
  title: string;
  content: string;
  date: string;
  rating: number;
}

const reviews: Review[] = [
  { id: 1, title: "Avaliação do Produto X", content: "Produto excelente!", date: "2025-02-15", rating: 5 },
  { id: 2, title: "Avaliação do Serviço Y", content: "Atendimento poderia melhorar.", date: "2025-02-14", rating: 3 },
];

const UserReviews = () => {
  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Minhas Avaliações</h1>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{review.title}</h2>
            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm text-gray-600">{review.date}</span>
            </div>
            <p className="mt-2">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
