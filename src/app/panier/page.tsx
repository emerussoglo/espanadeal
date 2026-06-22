"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Cálculo del precio total global
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Si el carrito está vacío, se muestra un mensaje limpio con un botón de regreso
  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <i className="fas fa-shopping-bag empty-icon"></i>
        <h2>Su carrito está vacío</h2>
        <p>Parece que aún no ha añadido ningún producto.</p>
        <Link href="/" className="btn-back-home">
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="page-title">Mi Carrito ({cart.length})</h1>
      
      <div className="cart-content-wrapper">
        
        {/* Columna Izquierda: Lista de productos añadidos */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              
              {/* Imagen simple confinada en su contenedor */}
              <div className="cart-item-img-wrapper">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-img" 
                />
              </div>
              
              {/* Detalles de texto del producto */}
              <div className="cart-item-details">
                <span className="cart-item-cat">{item.category}</span>
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-unit-price">Precio unitario: {item.price} €</p>
              </div>

              {/* Selector numérico de cantidad */}
              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  type="button"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  type="button"
                >
                  +
                </button>
              </div>

              {/* Subtotal y botón de eliminación */}
              <div className="cart-item-actions">
                <p className="cart-item-subtotal">{(item.price * item.quantity).toLocaleString()} €</p>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="btn-remove-item" 
                  title="Eliminar artículo"
                  type="button"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Columna Derecha: Resumen financiero fijo */}
        <div className="cart-summary-card">
          <h3>Resumen del pedido</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{totalPrice.toLocaleString()} €</span>
          </div>
          
          <div className="summary-row">
            <span>Envío</span>
            <span className="free-shipping">Gratis</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total-row">
            <span>Total</span>
            <span>{totalPrice.toLocaleString()} €</span>
          </div>
          
          <button 
            className="btn-checkout" 
            onClick={() => alert("Redirigiendo a la pasarela de pago...")}
            type="button"
          >
            Tramitar pedido
          </button>
        </div>

      </div>
    </div>
  );
}