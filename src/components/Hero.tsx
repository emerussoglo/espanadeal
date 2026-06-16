"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDES_DATA = [
  {
    id: 1,
    title: "Appareils Électroniques : iPhone, PS5 & Accessoires High-Tech",
    subtitle: "Technologie & Gaming",
    description: "Équipez-vous du meilleur de la technologie. Retrouvez l'iPhone, la PlayStation 5, la Nintendo Switch et nos écouteurs Bluetooth livrés rapidement au BÉNIN.",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1000&auto=format&fit=crop&q=80", // Image PS5 / Gaming
    btnText: "Voir le High-Tech",
    link: "/produits?cat=electronique"
  },
  {
    id: 2,
    title: "Sport & Fitness : Atteignez vos objectifs à domicile",
    subtitle: "Performance & Santé",
    description: "Brûlez des calories avec nos vélos de spinning, vélos électriques, haltères, montres connectées et équipements complets de gym à domicile.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80", // Image Fitness / Gym
    btnText: "Découvrir l'univers Sport",
    link: "/produits?cat=sport"
  },
  {
    id: 3,
    title: "Mode & Sneakers : Marchez avec style au quotidien",
    subtitle: "Tendances Urbaines",
    description: "Faites la différence avec notre sélection exclusive de Sneakers Nike, Jordan et New Balance authentiques et confortables.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=80", // Image Sneakers Jordan/Nike
    btnText: "Shopper mes Sneakers",
    link: "/produits?cat=sport" // Lié à l'univers Sport/Style
  },
  {
    id: 4,
    title: "Beauté & Maison : Prenez soin de vous et de votre intérieur",
    subtitle: "Bien-être & Confort",
    description: "Sublimez votre routine avec nos parfums et produits skincare / capillaires, tout en simplifiant votre quotidien avec l'Air Fryer et nos aspirateurs robots.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1000&auto=format&fit=crop&q=80", // Image Parfum / Soin
    btnText: "Explorer la sélection",
    link: "/produits?cat=beaute"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gestion du défilement automatique toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section-container">
      
      {/* COMPOSANT DE GAUCHE : LE SLIDER DYNAMIQUE */}
      <div className="hero-slider-left">
        {SLIDES_DATA.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? "slide-active" : ""}`}
          >
            {/* Image de fond simple */}
            <img src={slide.image} alt={slide.title} className="slide-bg-img" />
            
            {/* Voile sombre texturé pour garantir la lisibilité du texte blanc */}
            <div className="slide-overlay"></div>

            {/* Contenu textuel */}
            <div className="slide-content">
              <span className="slide-tag">{slide.subtitle}</span>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-desc">{slide.description}</p>
              <Link href={slide.link} className="btn-hero-action">
                {slide.btnText}
              </Link>
            </div>
          </div>
        ))}

        {/* Boutons indicateurs (Dots) en bas au centre du slider */}
        <div className="slider-dots">
          {SLIDES_DATA.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`dot-indicator ${index === currentSlide ? "dot-active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Aller à la diapositive ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* COMPOSANT DE DROITE : LES DEUX ENCARTS STATIQUES */}
      <div className="hero-banners-right">
  
  {/* Encart Haut - Sneakers */}
  <div className="right-banner-card text-light">
    <img 
      src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80" 
      alt="Sneakers Tendance" 
      className="banner-bg-img" 
    />
    <div className="banner-overlay"></div>
    <div className="banner-content">
      <span className="banner-tag text-red">Mode</span>
      <h3>Sneakers Tendance : Nike, Jordan & New Balance</h3>
      <p>Trouvez les meilleurs styles de baskets sur Espanadeal.</p>
      <Link href="/produits?cat=mode" className="btn-banner-small">
        Acheter
      </Link>
    </div>
  </div>

  {/* Encart Bas - Wearables / Électronique */}
  <div className="right-banner-card text-light">
    <img 
      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" 
      alt="Écouteurs et Montres Connectées" 
      className="banner-bg-img" 
    />
    <div className="banner-overlay"></div>
    <div className="banner-content">
      <span className="banner-tag text-green">High-Tech</span>
      <h3>Smart Accessories & Audio</h3>
      <p>Profitez de la meilleure qualité sonore et connectée au meilleur prix.</p>
      <Link href="/produits?cat=electronique" className="btn-banner-small">
        Acheter
      </Link>
    </div>
  </div>

</div>

    </section>
  );
}