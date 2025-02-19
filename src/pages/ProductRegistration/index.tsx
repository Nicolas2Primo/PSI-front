import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useProducts } from "../../context/ProductContext";

const ProductRegistration = () => {
  const { addProduct } = useProducts();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aqui, a imagem poderia ser enviada para o backend e o URL retornado.
    addProduct({ name, description, imageUrl: preview || "" });
    navigate(-1); // Retorna para a página anterior, ex.: catálogo
  };

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <h1 className="mb-4 text-2xl font-bold">Cadastro de Novo Produto/Serviço</h1>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-lg gap-4">
        <input
          type="text"
          placeholder="Nome do produto/serviço"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descrição do produto/serviço"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2"
          required
        />
        {preview && (
          <img
            src={preview}
            alt="Prévia do produto"
            className="object-cover w-32 h-32 rounded"
          />
        )}
        <button
          type="submit"
          className="p-2 text-white bg-black rounded hover:bg-gray-800"
        >
          Cadastrar Produto/Serviço
        </button>
      </form>
    </div>
  );
};

export default ProductRegistration;
