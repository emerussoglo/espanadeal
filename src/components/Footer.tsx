// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        
         {/* Droits d'auteur à droite (comme ton modèle) */}
        <div className="footer-copyright">
          <p>Copyright {currentYear} — <strong>ESPANA DEAL</strong>. Droits réservés !</p>
        </div> 

       

      </div>
    </footer>
  );
}