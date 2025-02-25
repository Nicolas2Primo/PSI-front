import React, { useState, ChangeEvent, FormEvent } from "react";
import { Product, useProducts } from "../../../context/ProductContext";
import { useAuth } from "../../../context/AuthContext";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
}) => {
  const { updateProduct } = useProducts();
  const { role, companyName } = useAuth();

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  // Se for empresa, utiliza o valor do AuthContext; se não, permite edição
  const [company, setCompany] = useState(product.company);
  const [category, setCategory] = useState(product.category || "");
  const [location, setLocation] = useState(product.location || "");
  const [preview, setPreview] = useState(product.imageUrl || "");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProduct(product.id, {
      name,
      description,
      // Se o usuário for uma empresa, utiliza o valor do AuthContext, senão o valor do estado
      company: role === "company" ? companyName : company,
      category,
      location,
      imageUrl: preview,
    });
    onClose();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="mb-4 text-2xl font-bold">Editar Produto/Serviço</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col max-w-lg gap-4"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do produto/serviço"
          className="p-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição do produto/serviço"
          className="p-2 border rounded"
          required
        />
        {role === "company" ? (
          <input
            type="text"
            value={companyName}
            disabled
            placeholder="Empresa"
            className="p-2 border rounded bg-gray-100"
            required
          />
        ) : (
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Empresa"
            className="p-2 border rounded"
            required
          />
        )}
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoria"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Localização"
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
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditProductModal;
