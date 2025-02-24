import { useState, ChangeEvent, FormEvent } from "react";
import { useProducts } from "../../../context/ProductContext";
import { useAuth } from "../../../context/AuthContext";

interface ProductRegistrationModalProps {
  onClose: () => void;
}

const ProductRegistrationModal: React.FC<ProductRegistrationModalProps> = ({
  onClose,
}) => {
  const { addProduct } = useProducts();
  const { role, userEmail, companyName } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Para usuário, o campo "company" pode ser preenchido manualmente, mas para empresa, usamos o nome da empresa
  const [companyInput, setCompanyInput] = useState(
    role === "company" ? companyName : ""
  );
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Define origin conforme role: "company" se empresa, senão "user"
    const origin = role === "company" ? "company" : "user";
    addProduct({
      name,
      description,
      company: companyInput,
      imageUrl: preview || "",
      category,
      location,
      origin,
    });
    onClose();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <h1 className="mb-4 text-2xl font-bold">
        Cadastro de Novo Produto/Serviço
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col max-w-lg gap-4"
      >
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
        {role !== "company" && (
          <input
            type="text"
            placeholder="Empresa"
            value={companyInput}
            onChange={(e) => setCompanyInput(e.target.value)}
            className="p-2 border rounded"
            required
          />
        )}
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2"
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

export default ProductRegistrationModal;
