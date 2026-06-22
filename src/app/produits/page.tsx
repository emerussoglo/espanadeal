"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const PRODUCTS_DATA = [
  // ==========================================
  // APPAREILS ÉLECTRONIQUES (iPhones & High-Tech)
  // ==========================================
  { id: 1, name: "iPhone 11", price: 76.95, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/www.frandroid.com/wp-content/uploads/2019/08/apple-iphone-11-frandroid-2019.png?webp=1&resize=580,580&key=fcb2a39b" },
  { id: 2, name: "iPhone 12", price: 155, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2020/10/iphone-12-frandroid-2020-768x768.png?webp=1&resize=580,580&key=1b5d60de" },
  { id: 3, name: "iPhone 12 Pro", price: 479, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2020/10/iphone-12-max-frandroid-2020-768x768.png?webp=1&resize=580,580&key=85d800ac" },
  { id: 4, name: "iPhone 13", price: 499, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-frandroid-2021-768x768.png?webp=1&resize=580,580&key=a6b052d7" },
  { id: 5, name: "iPhone 13 Pro Max", price: 349, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-pro-max-frandroid-2021-768x768.png?webp=1&resize=580,580&key=33af98cc" },
  // { id: 6, name: "iPhone 14", price: 599, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1663499482523-1c0c1ebe4cc1?w=500&auto=format&fit=crop&q=60" },
  { id: 7, name: "iPhone 14 Pro", price: 699, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2022/09/iphone-14-pro-max-officiel-frandroid-2022-768x768.png?webp=1&key=1e26da76" },
  { id: 8, name: "iPhone 15", price: 749, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-768x768.png?webp=1&key=62513184" },
  { id: 9, name: "iPhone 15 Pro Max", price: 620, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-pro-max-768x768.png?webp=1&key=6d7ed62f" },
  { id: 10, name: "Apple iPhone 16 (128 Go) - Cyan + Coque Transparente avec MagSafe", price: 806, category: "Appareils électroniques", image: "/img/iPhone16.jpg" },
  { id: 11, name: "iPhone 16 Pro Max", price: 817.40, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2024/08/apple-iphone-16-pro-max-frandroid-2024-hd-768x768.png?webp=1&key=ce4d50e3" },
  { id: 12, name: "iPhone 17 Pro", price: 1099, category: "Appareils électroniques", image: "https://www.apple.com/v/iphone-17-pro/d/images/overview/contrast/iphone_17_pro__dwccrdina7qu_large.jpg" },
  { id: 39, name: "iPhone 17 Pro Max", price: 1199, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/09/apple-iphone-17-pro-max-frandroid-2025-768x768.png?webp=1&key=edb35fd1" },
  
  // Audio & Accessoires
  { id: 13, name: "Apple AirPods Pro 3 Écouteurs sans Fil, réduction Active du Bruit", price: 150, category: "Appareils électroniques", image: "/img/AppleAirPodsPro3.jpg" },
  { id: 14, name: "Sony WH-1000XM5SA Édition Spéciale avec étui Souple, réduction de Bruit Active, Bluetooth, qualité d'appel Claire", price: 209, category: "Appareils électroniques", image: "/img/SonyWH-1000XM5SA.jpg" },
  { id: 15, name: "Apple Watch Series 9 (GPS + Cellulaire, 45 MM) Boîtier Aluminium Starlight avec Bracelet Sport Starlight, M/L (Reconditionné)", price: 399, category: "Appareils électroniques", image: "/img/AppleWatchSeries9.jpg" },
  { id: 16, name: "CUKTECH Chargeur USB C 100W, 3 Ports GaN III Tech et PPS PD3.0 Chargeur Rapide, Chargeur 100W USB C Rapide", price: 34.99, category: "Appareils électroniques", image: "/img/CUKTECHChargeurUSBC.jpg" },
  
  // Gaming
  { id: 17, name: "Sony, Console PlayStation 5 Édition Standard 1 To avec lecteur Blu-ray 4K, SSD Ultra-Rapide, Audio 3D, Ray Tracing, 1 Manette DualSense avec Retour Haptique", price: 509.99, category: "Appareils électroniques", image: "/img/SonyConsolePlayStation5.jpg" },
  { id: 18, name: "Playstation Sony, Lecteur à Distance Portal 5, Écran LCD Full HD de 8, Jeux en Streaming via Wi-Fi, Retour Haptique & Gâchettes Adaptatives, Couleur  Blanche", price: 220, category: "Appareils électroniques", image: "/img/PlaystationSonyLecteur.jpg" },
  { id: 19, name: "Nintendo Switch (OLED) Console de Jeux Portables 17,8 cm  64 Go Écran Tactile WiFi Blanc", price: 209, category: "Appareils électroniques", image: "/img/NintendoSwitch.jpg" },

  // ==========================================
  // SPORT / FITNESS (Sneakers & Gym)
  // ==========================================
  { id: 20, name: "PUMA Tazon 6 Fracture FM, Men's Sneaker", price: 34.99, category: "Sport / Fitness", image: "/img/PUMATazon6FractureFM.jpg" },
  { id: 21, name: "Puma Smash V2 L BasketsMixte", price: 24.99, category: "Sport / Fitness", image: "/img/PumaSmashV2LBasketsMixte.jpg" },
  { id: 22, name: "Adidas Unisex Chaussure VS Pace 2.0", price: 32, category: "Sport / Fitness", image: "/img/adidasUnisexChaussure.jpg" },
  { id: 23, name: "Skechers Uno Stand on Air Basket", price: 48, category: "Sport / Fitness", image: "/img/SkechersUnoStandonAir.jpg" },
  { id: 24, name: "Skechers Uno-Night Shades, Baskets", price: 52.99, category: "Sport / Fitness", image: "/img/SkechersUno-NightShades.jpg" },
  { id: 27, name: "Kit Haltères Réglables (20kg)", price: 42, category: "Sport / Fitness", image: "/img/Halteres-reglables.jpg" },
 
  // BEAUTÉ ET SOIN (Skincare & Parfums)
  // ==========================================
  { id: 30, name: "MIXA - Sérum Booster d'Hydratation Intense 24H - Repulpe & Illumine", price: 6.99, category: "Beauté et soin", image: "/img/MIXASérumBooste.jpg" },
  { id: 31, name: "CeraVe Baume Hydratant Visage & Corps, Hydratation 48H, Technologie MVE + 3 Céramides + Acide Hyaluronique", price: 16.25, category: "Beauté et soin", image: "/img/CeraVeBaume.jpg" },
  { id: 32, name: "EANNE ARTHES - Parfum Homme Sexy Boy Intense - Eau de Parfum - Flacon Vaporisateur 100 ml", price: 5.12, category: "Beauté et soin", image: "/img/JEANNEARTHES.jpg" },
 
  // ==========================================
  // MAISON & CUISINE
  // ==========================================
  { id: 36, name: "Ninja Foodi FlexDrawer Air Fryer, Dual Zone Avec Séparateur Amovible", price: 156, category: "Cuisine", image: "/img/NinjaFoodiFlexDrawerAir.jpg" },
  { id: 37, name: "ECOVACS T50 Omni GEN2 Aspirateur Robot avec Station, Puissance 21000Pa, Brosse latérale et serpillière", price: 270, category: "Maison", image: "/img/ECOVACST50OmniGEN2Aspirateur.jpg" },
   { id: 40, name: "SHOKZ OpenFit Pro Open Ear Écouteurs sans fil Noir", price: 289, category: "Maison", image: "/img/SHOKZOpenFitProOpen.jpg" },
  { id: 41, name: "Realme Buds Clip", price: 74.99, category: "Maison", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/12/realme-buds-clip-frandroid-2025-300x300.png?webp=1&key=4be0b994" },
  { id: 42, name: "URLIFE Vélo Électrique pour Adultes, Pneus Larges 16", price: 1299, category: "Appareils électroniques", image: "/img/URLIFEVeloelectrique.jpg" },
  { id: 43, name: "ZIPRO Vélo d'Appartement Adulte avec Résistance Magnétique à 8 Niveaux, Écran LCD, Support pour Téléphone et Selle Réglable", price: 109, category: "Appareils électroniques", image: "/img/ZIPROVelo.jpg" },
  { id: 44, name: "JBL Wave Beam 2, Écouteurs sans Fil Bluetooth, réduction de Bruit, 40 Heures d'autonomie", price: 49.99, category: "Maison", image: "/img/JBLWaveBeam2.jpg" },
  { id: 45, name: "Écouteurs sans fil pour Apple iPhone - Écouteurs Bluetooth 5.4 avec crochets d'oreille, stéréo", price: 27, category: "Maison", image: "/img/ecouteurssansfilpourApple.jpg" },
  { id: 46, name: "Soundcore Space One Casque Bluetooth sans Fil avec Réduction de Bruit Active Adaptative by Anker, Réduction des Voix Humaine 2X Plus Efficace", price: 19.99, category: "Maison", image: "/img/SoundcoreSpaceOneCasque.jpg" },
  { id: 41, name: "COROS Pace 4 Montre de Sport Ultralégère Capteur de Fréquence Cardiaque", price: 349, category: "Maison", image: "/img/COROSPace4Montre.jpg" },
  
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  // États pour le tri et le filtrage
  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("default");

  const handleBuyNow = (product: typeof PRODUCTS_DATA[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  // Liste des catégories uniques dynamiques
  const categories = ["Tous", "Appareils électroniques", "Sport / Fitness", "Beauté et soin", "Cuisine", "Maison"];

  // Filtrer et trier la liste des produits de manière performante
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    // 1. Filtrage par catégorie
    if (categoryFilter !== "Tous") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // 2. Tri des éléments
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "alpha") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [categoryFilter, sortBy]);

  return (
    <div className="home-page-container">
      <h1 className="section-title">Tous nos produits</h1>

      {/* Barre de contrôle épurée : Filtres et Tris */}
      <div className="catalog-controls">
        <div className="control-group">
          <label htmlFor="category-select">Catégorie :</label>
          <select 
            id="category-select"
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort-select">Trier par :</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="default">Pertinence</option>
            <option value="price-asc">Prix : du - cher au + cher</option>
            <option value="price-desc">Prix : du + cher au - cher</option>
            <option value="alpha">Ordre alphabétique</option>
          </select>
        </div>
      </div>

      {/* Grille des produits - Réutilisation parfaite des styles existants */}
      <div className="products-grid">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            
            <div className="product-image-wrapper">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-img"
                loading="lazy"
              />
            </div>

            <div className="product-info">
              <span className="product-cat">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price.toLocaleString()} €</p>
              
              <div className="product-card-actions">
                <button 
                  onClick={() => addToCart(product)} 
                  className="btn-add-cart"
                  title="Ajouter au panier"
                  type="button"
                >
                  <i className="fas fa-shopping-basket"></i> +
                </button>
                <button 
                  onClick={() => handleBuyNow(product)} 
                  className="btn-buy-now"
                  type="button"
                >
                  Commander
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Message si aucun produit ne correspond au filtre appliqué */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="no-products-found">
          <i className="fas fa-search"></i>
          <p>Aucun article disponible pour cette catégorie actuellement.</p>
        </div>
      )}
    </div>
  );
}