import { FaWhatsapp } from "react-icons/fa";
import "../styles/WhatsAppButton.css";

function WhatsAppButton() {
  const phone = 
  import.meta.env.VITE_WHATSAPP_NUMBER;

  return (
    <a
      href={`https://wa.me/${phone}?text=Hello,%20I'm%20interested%20in%20your%20products.`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;