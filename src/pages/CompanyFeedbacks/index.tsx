interface Feedback {
  id: number;
  customerName: string;
  comment: string;
  date: string;
}

const feedbacks: Feedback[] = [
  { id: 1, customerName: "Cliente X", comment: "A entrega demorou, mas o produto é de boa qualidade.", date: "2025-02-15" },
  { id: 2, customerName: "Cliente Y", comment: "Atendimento excelente, recomendo!", date: "2025-02-14" },
];

const CompanyFeedbacks = () => {
  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Feedbacks</h1>
      <div className="flex flex-col gap-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{feedback.customerName}</h2>
              <span className="text-sm text-gray-600">{feedback.date}</span>
            </div>
            <p className="mt-2">{feedback.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyFeedbacks;
