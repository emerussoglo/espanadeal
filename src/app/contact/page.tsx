"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire (API, Email, etc.)
    alert(`Merci ${formData.name}, votre message a bien été envoyé !`);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-page-container">
      {/* En-tête de la page */}
      <div className="featured-hero">
        <span className="featured-subtitle">Contactez-nous</span>
        <h1>Une question ? Nous sommes là pour vous</h1>
        <p>Notre équipe support vous répond dans les plus brefs délais pour toute demande d'information ou suivi de commande.</p>
      </div>

      <div className="contact-content-grid">
        {/* Colonne de gauche : Formulaire de contact */}
        <div className="contact-form-card">
          <h2>Envoyez-nous un message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nom@exemple.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Objet de votre message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Votre message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Comment pouvons-nous vous aider ?"
              ></textarea>
            </div>

            <button type="submit" className="btn-send-message">
              Envoyer le message
            </button>
          </form>
        </div>

        {/* Colonne de droite : Infos pratiques de contact */}
        <div className="contact-info-column">
          <div className="info-status-card">
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="info-text">
                <h3>Téléphone</h3>
                <a href="tel:+34666754415" className="info-link">
                  +34666754415
                </a>
                <p>Service client disponible du lun. au sam.</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="far fa-envelope"></i>
              </div>
              <div className="info-text">
                <h3>Support E-mail</h3>
                <a href="mailto:contact@espanadeal.com" className="info-link">
                  contact@espanadeal.com
                </a>
                <p>Réponse garantie sous 24h ouvrées.</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-text">
                <h3>Notre Siège</h3>
                <p className="info-address">
                  Cotonou, Bénin
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="far fa-clock"></i>
              </div>
              <div className="info-text">
                <h3>Horaires d'ouverture</h3>
                <p>Lundi - Vendredi : 8h00 - 19h00</p>
                <p>Samedi : 9h00 - 17h00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}