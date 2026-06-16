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
  { id: 6, name: "iPhone 14", price: 599, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1663499482523-1c0c1ebe4cc1?w=500&auto=format&fit=crop&q=60" },
  { id: 7, name: "iPhone 14 Pro", price: 699, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2022/09/iphone-14-pro-max-officiel-frandroid-2022-768x768.png?webp=1&key=1e26da76" },
  { id: 8, name: "iPhone 15", price: 749, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-768x768.png?webp=1&key=62513184" },
  { id: 9, name: "iPhone 15 Pro Max", price: 620, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-pro-max-768x768.png?webp=1&key=6d7ed62f" },
  { id: 10, name: "iPhone 16", price: 899, category: "Appareils électroniques", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-model-unselect-gallery-1-202409?wid=5120&hei=2880&fmt=webp&qlt=90&.v=ZnlzVUZzRWd3dlg0RllqbHhQSUpKTGdzSmpObkZCM3MrNmJ5SkhESlNDaWhXRnNvWU5kTFRnSWM5eDdhTWw0bEpFd0xhWDVibStLdGRYRmxkNGI4VTR2UjRaSC9URTlmd0FSb1ZTWjRnb3Y5aFhSWndydDBTaGRRd3dvbVFwcGk&traceId=1" },
  { id: 11, name: "iPhone 16 Pro Max", price: 817.40, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2024/08/apple-iphone-16-pro-max-frandroid-2024-hd-768x768.png?webp=1&key=ce4d50e3" },
  { id: 12, name: "iPhone 17 Pro", price: 1099, category: "Appareils électroniques", image: "https://www.apple.com/v/iphone-17-pro/d/images/overview/contrast/iphone_17_pro__dwccrdina7qu_large.jpg" },
  { id: 39, name: "iPhone 17 Pro Max", price: 1199, category: "Appareils électroniques", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/09/apple-iphone-17-pro-max-frandroid-2025-768x768.png?webp=1&key=edb35fd1" },
  
  // Audio & Accessoires
  { id: 13, name: "AirPods Pro 2", price: 249, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60" },
  { id: 14, name: "Casque Sony WH-1000XM5", price: 349, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60" },
  { id: 15, name: "Apple Watch Series 9", price: 399, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60" },
  { id: 16, name: "Chargeur Rapide MagSafe", price: 25, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60" },
  
  // Gaming
  { id: 17, name: "PlayStation 5 (PS5) Slim", price: 499, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop&q=60" },
  { id: 18, name: "PlayStation 5 Pro", price: 799, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop&q=60" },
  { id: 19, name: "Nintendo Switch OLED", price: 329, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&auto=format&fit=crop&q=60" },

  // ==========================================
  // SPORT / FITNESS (Sneakers & Gym)
  // ==========================================
  { id: 20, name: "Sneakers Nike Air Force 1", price: 120, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
  { id: 21, name: "Sneakers Nike Air Max TN", price: 190, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
  { id: 22, name: "Sneakers Jordan 4 Retro", price: 210, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=60" },
  { id: 23, name: "Sneakers Jordan 1 Mid", price: 140, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=60" },
  { id: 24, name: "Sneakers New Balance 550", price: 130, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60" },
  { id: 25, name: "Sneakers New Balance 2002R", price: 150, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60" },
  
  // Équipements de Sport
  { id: 26, name: "Vélo de spinning Pro", price: 380, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60" },
  { id: 27, name: "Kit Haltères Réglables (20kg)", price: 85, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500&auto=format&fit=crop&q=60" },
  { id: 28, name: "Vélo Électrique Urbain", price: 1150, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60" },
  { id: 29, name: "Banc de musculation réglable", price: 140, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=500&auto=format&fit=crop&q=60" },

  // ==========================================
  // BEAUTÉ ET SOIN (Skincare & Parfums)
  // ==========================================
  { id: 30, name: "Sérum Visage Acide Hyaluronique", price: 25, category: "Beauté et soin", image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=500&auto=format&fit=crop&q=60" },
  { id: 31, name: "Crème Hydratante CeraVe", price: 18, category: "Beauté et soin", image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=500&auto=format&fit=crop&q=60" },
  { id: 32, name: "Parfum Sauvage - Dior", price: 115, category: "Beauté et soin", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60" },
  { id: 33, name: "Parfum Bleu de Chanel", price: 125, category: "Beauté et soin", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60" },
  { id: 34, name: "Huile Capillaire Fortifiante", price: 30, category: "Beauté et soin", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=60" },
  { id: 35, name: "Pack Soins Cheveux Bouclés", price: 45, category: "Beauté et soin", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=60" },

  // ==========================================
  // MAISON & CUISINE
  // ==========================================
  { id: 36, name: "Air Fryer Numérique XL", price: 129, category: "Cuisine", image: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=500&auto=format&fit=crop&q=60" },
  { id: 37, name: "Aspirateur Robot Connecté", price: 240, category: "Maison", image: "https://images.unsplash.com/photo-1518133680790-3985ecea5649?w=500&auto=format&fit=crop&q=60" },
  { id: 38, name: "Kit Ruban Éclairage LED Voiture", price: 20, category: "Maison", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=60" },
  { id: 40, name: "Shokz OpenFit Pro", price: 249, category: "Maison", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2026/02/shokz-openfit-pro-frandroid-2026-300x300.png?webp=1&key=940c8854" },
  { id: 41, name: "Realme Buds Clip", price: 74.99, category: "Maison", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/12/realme-buds-clip-frandroid-2025-300x300.png?webp=1&key=4be0b994" },
  { id: 41, name: "HP OmniBook 5 16-bf0008nf", price: 899.99, category: "Maison", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2026/02/hp-omnibook-5-16-bf0008nf-frandroid-2026-300x300.png?webp=1&key=72497a70" },
  { id: 41, name: "Asus Zenbook A14 (UX3407)", price: 1049.99, category: "Maison", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/02/asus-zenbook-a14-ux3407-frandroid-2025-300x300.png?webp=1&key=d568c462" },
  { id: 41, name: "Apple MacBook Air 13 M4 (2025)", price: 929, category: "Maison", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/03/apple-macbook-air-13-m4-2025-frandroid-2025-300x300.png?webp=1&key=4ec6a357" },
  { id: 41, name: "Coros Pace Pro", price: 349, category: "Maison", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2024/10/coros-pace-pro-frandroid-2024-300x300.png?webp=1&key=70c62fb0" },
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