"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const { cartCount } = useCart();
const pathname = usePathname(); // <--- AJOUTER CETTE LIGNE

  return (
    <header className="header-container">
      {/* --- NIVEAU 1 : BARRE PRINCIPALE --- */}
      <div className="main-navbar">
        {/* Bouton Burger (Mobile) */}
        <button 
          className="burger-menu" 
          onClick={() => setIsMenuOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Zone Logo */}
        <div className="nav-logo">
          <Link href="/">
            <img
              src="/img/logo.png" 
              alt=" Logo" 
            />
          </Link>
        </div>

        {/* Barre de Recherche (Desktop uniquement à ce niveau) */}
        <div className="nav-search-container desktop-search">
          <form className="search-form">
            <input 
              type="text" 
              placeholder="Rechercher des produits..." 
              className="search-input"
            />
            <div className="search-select-wrapper">
              <select className="search-category">
                <option value="">Toutes les catégories</option>
                <option value="electronique">Appareils électroniques</option>
                <option value="cuisine">Cuisine</option>
                <option value="meubles">Maison</option>
              </select>
            </div>
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        {/* Actions Icones */}
        <div className="nav-actions">
          <Link href="/favoris" className="action-icon fav-desktop" aria-label="Favoris">
            <i className="far fa-heart"></i>
          </Link>
          {/* Dans la section .nav-actions desktop */}
<Link href="/panier" className="action-icon cart-icon-wrapper" aria-label="Panier">
  <i className="fas fa-shopping-bag"></i>
  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
</Link>
        </div>
      </div>

      {/* --- NIVEAU 2 : BARRE DE NAVIGATION INFÉRIEURE (Desktop uniquement) --- */}
      <div className="bottom-navbar">
        <div className="bottom-navbar-container">
          {/* Menu Magasiner par catégorie */}
          <div className="category-menu-dropdown">
            <i className="fas fa-th-large"></i> Magasiner par catégorie <i className="fas fa-chevron-down arrow-down"></i>
          </div>

          <ul className="nav-links">
  <li>
    <Link href="/" className={pathname === "/" ? "active-link" : ""}>
      Accueil
    </Link>
  </li>
  <li>
    <Link href="/produits" className={pathname === "/produits" ? "active-link" : ""}>
      Tous nos produits
    </Link>
  </li>
  <li>
    <Link href="/vedette" className={`link-featured ${pathname === "/vedette" ? "active-link" : ""}`}>
      Produit Vedette <i className="fas fa-fire icon-fire"></i>
    </Link>
  </li>
  <li>
    <Link href="/contact" className={pathname === "/contact" ? "active-link" : ""}>
      Contact
    </Link>
  </li>
</ul>

          {/* Numéro de téléphone à droite */}

          <div className="nav-phone">
            <a href="tel:+2290154627062">+229 01 54 62 70 62</a>
          </div>
        </div>
      </div>

      {/* --- MENU RESPONSIVE MOBILE SIDEBAR (Coulisse depuis la gauche) --- */}
      <div className={`mobile-sidebar-overlay ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
        <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
          
          {/* Entête du menu mobile */}
          <div className="sidebar-header">
            <button className="close-sidebar" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Corps du menu mobile */}
          <div className="sidebar-body">
            
            {/* Barre de recherche intégrée au menu sur mobile */}
            <div className="mobile-search-wrapper">
              <form className="search-form mobile-search-form">
                <input 
                  type="text" 
                  placeholder="Rechercher des produits..." 
                  className="search-input"
                />
                <button type="submit" className="search-button mobile-btn-blue">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>



{/* Liens de pages classiques */}
            <ul className="sidebar-nav-links">
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/produits">Tous nos produits</Link></li>
              <li><Link href="/vedette" className="link-featured">Produit Vedette <i className="fas fa-fire icon-fire"></i></Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
            <div className="sidebar-divider"></div>

            
            <div className="sidebar-section-title">
              <span>Magasiner par catégorie</span>
              <Link href="/categories" className="see-all-link">Tout voir</Link>
            </div>

            {/* Liste des catégories style mobile */}
            <ul className="sidebar-categories-list">
              <li><Link href="/produits?cat=electronique"><i className="fas fa-laptop"></i> Appareils électroniques</Link></li>
              <li><Link href="/produits?cat=beaute"><i className="fas fa-pump-soap"></i> Beauté et soin</Link></li>
              <li><Link href="/produits?cat=maison"><i className="fas fa-couch"></i> Maison</Link></li>
              <li><Link href="/produits?cat=sport"><i className="fas fa-basketball-ball"></i> Sport/ Fitness</Link></li>
              <li><Link href="/produits?cat=electromenagers" className="bold-item">Électroménagers</Link></li>
            </ul>

            <div className="sidebar-divider"></div>

            
          </div>

        </div>
      </div>
    </header>
  );
}