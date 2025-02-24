import { useEffect, useRef } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex  items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        ref={modalRef}
        className="z-10 p-6 w-[50%] h-[60%] bg-white rounded shadow-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
