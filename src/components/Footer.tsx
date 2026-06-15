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

        {/* Liens simples à gauche */}
        <div className="footer-links">
          <Link href="/politique">Confidentialité</Link>
          <Link href="/cgvu">CGVU</Link>
          <Link href="/remboursement">Remboursement</Link>
          <Link href="/contact">Contact</Link>
        </div>

       

      </div>
    </footer>
  );
}