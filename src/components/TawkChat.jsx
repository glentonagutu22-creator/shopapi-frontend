import { useEffect } from "react";

function TawkChat() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://embed.tawk.to/6a55d76d940f101d5323836b/1jtfl316s";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

export default TawkChat;