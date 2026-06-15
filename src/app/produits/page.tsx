"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const PRODUCTS_DATA = [
  { id: 1, name: "iPhone", price: 999, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60" },
  { id: 2, name: "Écouteurs Bluetooth", price: 149, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60" },
  { id: 3, name: "PlayStation 5 (PS5)", price: 499, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop&q=60" },
  { id: 4, name: "Nintendo Switch", price: 299, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&auto=format&fit=crop&q=60" },
  { id: 5, name: "Sneakers Nike", price: 120, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
  { id: 6, name: "Sneakers Jordan", price: 180, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=60" },
  { id: 7, name: "Sneakers New Balance", price: 110, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60" },
  { id: 8, name: "Produits skincare", price: 45, category: "Beauté et soin", image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=500&auto=format&fit=crop&q=60" },
  { id: 9, name: "Parfums", price: 85, category: "Beauté et soin", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60" },
  { id: 10, name: "Air Fryer", price: 130, category: "Cuisine", image: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=500&auto=format&fit=crop&q=60" },
  { id: 11, name: "Aspirateurs robots", price: 240, category: "Maison", image: "https://images.unsplash.com/photo-1518133680790-3985ecea5649?w=500&auto=format&fit=crop&q=60" },
  { id: 12, name: "Vélos de spinning", price: 350, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60" },
  { id: 13, name: "Haltères", price: 60, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500&auto=format&fit=crop&q=60" },
  { id: 14, name: "Éclairage LED pour voiture", price: 25, category: "Maison", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=60" },
  { id: 15, name: "Vélos électriques", price: 1200, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60" },
  { id: 16, name: "Montres connectées", price: 199, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60" },
  { id: 17, name: "Accessoires téléphone", price: 15, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60" },
  { id: 18, name: "Soins capillaires", price: 35, category: "Beauté et soin", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=60" },
  { id: 20, name: "Équipements de gym à domicile", price: 450, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=500&auto=format&fit=crop&q=60" }
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