"use client";

import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import { Suspense } from "react";

// ==========================================
// BASE DE DATOS DE PRODUCTOS (PRODUCTS_DATA)
// ==========================================
const PRODUCTS_DATA = [
  // Dispositivos electrónicos (High-Tech)
  { id: 39, name: "iPhone 17 Pro Max", price: 1199, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/09/apple-iphone-17-pro-max-frandroid-2025-768x768.png?webp=1&key=edb35fd1" },
  { id: 12, name: "iPhone 17 Pro", price: 1099, category: "Dispositivos electrónicos", image: "https://www.apple.com/v/iphone-17-pro/d/images/overview/contrast/iphone_17_pro__dwccrdina7qu_large.jpg" },
  { id: 9, name: "iPhone 15 Pro Max", price: 620, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-pro-max-768x768.png?webp=1&key=6d7ed62f" },
  { id: 10, name: "Apple iPhone 16 (128 GB) - Cian + Funda Transparente con MagSafe", price: 806, category: "Dispositivos electrónicos", image: "/img/iPhone16.jpg" },
  { id: 11, name: "iPhone 16 Pro Max", price: 817.40, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2024/08/apple-iphone-16-pro-max-frandroid-2024-hd-768x768.png?webp=1&key=ce4d50e3" },
  
  // Audio, Accesorios & Relojes
  { id: 13, name: "Apple AirPods Pro 3 Auriculares Inalámbricos, Cancelación Activa de Ruido", price: 150, category: "Dispositivos electrónicos", image: "/img/AppleAirPodsPro3.jpg" },
  { id: 14, name: "Sony WH-1000XM5SA Edición Especial con estuche blando, Cancelación Activa de Ruido, Bluetooth, calidad de llamada clara", price: 209, category: "Dispositivos electrónicos", image: "/img/SonyWH-1000XM5SA.jpg" },
  { id: 15, name: "Apple Watch Series 9 (GPS + Cellular, 45 MM) Caja de Aluminio Blanco Estrella con Correa Deportiva Blanco Estrella, M/L (Reacondicionado)", price: 399, category: "Dispositivos electrónicos", image: "/img/AppleWatchSeries9.jpg" },
  { id: 16, name: "CUKTECH Cargador USB C 100W, 3 Puertos GaN III Tech y PPS PD3.0 Cargador Rápido", price: 34.99, category: "Dispositivos electrónicos", image: "/img/CUKTECHChargeurUSBC.jpg" },
  { id: 44, name: "JBL Wave Beam 2, Auriculares Inalámbricos Bluetooth, Cancelación de Ruido, 40 horas de autonomía", price: 49.99, category: "Dispositivos electrónicos", image: "/img/JBLWaveBeam2.jpg" },
  { id: 45, name: "Auriculares inalámbricos para Apple iPhone - Auriculares Bluetooth 5.4 con ganchos para el oído, Estéreo", price: 27, category: "Dispositivos electrónicos", image: "/img/ecouteurssansfilpourApple.jpg" },
  { id: 46, name: "Soundcore Space One Auriculares de Diadema Bluetooth Inalámbricos con Cancelación Activa de Ruido Adaptativa de Anker", price: 19.99, category: "Dispositivos electrónicos", image: "/img/SoundcoreSpaceOneCasque.jpg" },
  { id: 47, name: "COROS Pace 4 Reloj Deportivo Ultraligero con Sensor de Frecuencia Cardíaca", price: 349, category: "Dispositivos electrónicos", image: "/img/COROSPace4Montre.jpg" },

  // Videojuegos
  { id: 17, name: "Sony, Consola PlayStation 5 Edición Estándar 1 TB con lector Blu-ray 4K, SSD Ultrarrápido, Audio 3D, Ray Tracing", price: 509.99, category: "Dispositivos electrónicos", image: "/img/SonyConsolePlayStation5.jpg" },
  { id: 18, name: "Playstation Sony, Reproductor a Distancia Portal 5, Pantalla LCD Full HD de 8\", Juegos en Streaming vía Wi-Fi", price: 220, category: "Dispositivos electrónicos", image: "/img/PlaystationSonyLecteur.jpg" },
  { id: 19, name: "Nintendo Switch (OLED) Consola de Juegos Portátil de 17,8 cm, 64 GB, Pantalla Táctil, WiFi, Blanco", price: 209, category: "Dispositivos electrónicos", image: "/img/NintendoSwitch.jpg" },

  // Deporte / Fitness
  { id: 20, name: "PUMA Tazon 6 Fracture FM, Zapatillas para Hombre", price: 34.99, category: "Deporte / Fitness", image: "/img/PUMATazon6FractureFM.jpg" },
{ id: 22, name: "Adidas Unisex Zapatillas VS Pace 2.0", price: 32, category: "Deporte / Fitness", image: "/img/adidasUnisexChaussure.jpg" },
  { id: 23, name: "Skechers Uno Stand on Air Zapatillas", price: 48, category: "Deporte / Fitness", image: "/img/SkechersUnoStandonAir.jpg" },
  { id: 27, name: "Kit de Mancuernas Ajustables (20kg)", price: 42, category: "Deporte / Fitness", image: "/img/Halteres-reglables.jpg" },
  { id: 42, name: "URLIFE Bicicleta Eléctrica para Adultos, Neumáticos Anchos de 16\"", price: 1299, category: "Deporte / Fitness", image: "/img/URLIFEVeloelectrique.jpg" },
  
  // Belleza y cuidado personal
  { id: 30, name: "MIXA - Sérum Booster de Hidratación Intensa 24H - Rellena e Ilumina", price: 6.99, category: "Belleza y cuidado personal", image: "/img/MIXASérumBooste.jpg" },
 { id: 32, name: "JEANNE ARTHES - Perfume para Hombre Sexy Boy Intense - Eau de Parfum - Frasco Vaporizador de 100 ml", price: 5.12, category: "Belleza y cuidado personal", image: "/img/JEANNEARTHES.jpg" },

  // Hogar & Cocina
  { id: 36, name: "Ninja Foodi FlexDrawer Freidora de Aire, Dual Zone Con Separador Extraíble", price: 156, category: "Cocina", image: "/img/NinjaFoodiFlexDrawerAir.jpg" },
  { id: 37, name: "ECOVACS T50 Omni GEN2 Robot Aspirador con Estación, Potencia de 21000 Pa, Cepillo lateral y mopa", price: 270, category: "Hogar", image: "/img/ECOVACST50OmniGEN2Aspirateur.jpg" }
];

export function HomePageContent() {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Recuperación de los filtros desde la URL
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const categoryQuery = searchParams.get("cat") || "";

  // 2. Traducción de los slugs de URL a los nombres exactos de categorías del array PRODUCTS_DATA
  const categoryMapping: { [key: string]: string } = {
    electronique: "Dispositivos electrónicos",
    beaute: "Belleza y cuidado personal",
    maison: "Hogar",
    cuisine: "Cocina",
    sport: "Deporte / Fitness"
  };
  const targetCategory = categoryMapping[categoryQuery] || "";

  // 3. Filtrado dinámico robusto
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    
    // Limpieza de cadenas eliminando espacios y pasando a minúsculas
    const cleanProductCat = product.category.replace(/\s+/g, '').toLowerCase();
    const cleanTargetCat = targetCategory.replace(/\s+/g, '').toLowerCase();
    
    const matchesCategory = targetCategory ? cleanProductCat === cleanTargetCat : true;
    
    return matchesSearch && matchesCategory;
  });

  const handleBuyNow = (product: typeof PRODUCTS_DATA[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  return (
    <main>
      {/* El Hero y las ventajas solo se muestran si el usuario no está filtrando */}
      {!searchQuery && !categoryQuery && (
        <div>
          <Hero />
            
          <div className="features-section">
            <div className="features-container">
              
              {/* Tarjeta 1: Calidad */}
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-shipping">
                  <i className="fas fa-award"></i>
                </div>
                <h3>Calidad Garantizada</h3>
                <p>Productos 100% auténticos y seleccionados con total cuidado</p>
              </div>

              {/* Tarjeta 2: Pago */}
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-security">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Pago Seguro</h3>
                <p>Transacciones 100% protegidas y cifradas de forma segura</p>
              </div>

              {/* Tarjeta 3: Soporte */}
              <div className="feature-card"> 
                <div className="feature-icon-wrapper icon-support">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>Soporte 24/7</h3>
                <p>Asistencia disponible y atenta en cualquier momento</p>
              </div>

              {/* Tarjeta 4: Retirada */}
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-guarantee">
                  <i className="fas fa-store"></i>
                </div>
                <h3>Recogida Rápida</h3>
                <p>Recoja sus artículos directamente en tienda y ahorre tiempo</p>
              </div>

            </div>
          </div>
        </div>
      )}

      <div className="home-page-container">
        <div className="featured-hero">
          <span className="featured-subtitle">Ofertas Exclusivas Espanadeal</span>
          <h1>
            {searchQuery || categoryQuery 
              ? `Resultados de su búsqueda (${filteredProducts.length})` 
              : "Descubra nuestros artículos destacados del momento"}
          </h1>
          
          {/* Botón para restablecer los filtros */}
          {(searchQuery || categoryQuery) && (
            <button 
              onClick={() => router.push("/")}
              style={{ marginTop: "15px", padding: "8px 16px", backgroundColor: "#1a1a1a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
            >
              Ver todos los productos
            </button>
          )}
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
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
                      title="Añadir al carrito"
                      type="button"
                    >
                      <i className="fas fa-shopping-basket"></i> +
                    </button>
                    <button 
                      onClick={() => handleBuyNow(product)} 
                      className="btn-buy-now"
                      type="button"
                    >
                      Tramitar pedido
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#636366" }}>
            <i className="fas fa-search" style={{ fontSize: "30px", marginBottom: "15px", display: "block" }}></i>
            Ningún producto coincide con sus criterios de búsqueda.
          </div>
        )}
      </div>
    </main>
  );
}

// Next.js requiere envolver useSearchParams en Suspense durante la compilación en producción
export default function HomePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <HomePageContent />
    </Suspense>
  );
}