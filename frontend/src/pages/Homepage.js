import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "../styles/Homepage.css";

const Homepage = () => {
  const [images, setImages] = useState([]);
  const API_KEY = "ZfqJtGBHxpx90MAyDqurlOsWeIuf9o4N7HhXoG213Lug7KdDVgJx7Bh6"; // Tu clave de API

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const SEARCH_QUERY = "clothing";

        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${SEARCH_QUERY}&per_page=10`,
          { headers: { Authorization: API_KEY } }
        );

        if (response.data.photos.length > 0) {
          setImages(response.data.photos);
        } else {
          console.warn("⚠ No se encontraron imágenes.");
        }
      } catch (error) {
        console.error("❌ Error al obtener imágenes de Pexels:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="homepage-header">
        <img src="../assets/logoh.jpg" alt="Huarpe Indumentaria" className="logo" />
        <nav className="navbar">
          <Link to="/hombre">Hombre</Link>
          <Link to="/mujer">Mujer</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
        <a href="https://wa.me/123456789" className="whatsapp-icon" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={24} />
        </a>
      </header>

      {/* Carrusel de productos */}
      <section className="productos-destacados">
        {images.length > 0 ? (
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Autoplay, Navigation]}
            className="swiper-container"
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="producto-card">
                  <img src={image.src.medium} alt={image.photographer} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No se encontraron imágenes o cargando imágenes...</p>
        )}
      </section>

      {/* Nueva sección de bienvenida */}
      <section className="bienvenida">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="slide-content">
              <h1>Bienvenido a nuestra tienda</h1>
              <p>Descubre nuestros productos</p>
              <button className="cta-button">
                Explorar <FaArrowRight />
              </button>
            </div>
          </SwiperSlide>
          {/* Agrega más slides según necesites */}
        </Swiper>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-info">
          <p>&copy; 2025 Huarpe Indumentaria. Todos los derechos reservados.</p>
          <p>Dirección: Calle Ejemplo 123, Ciudad, País</p>
          <p>Teléfono: +123 456 789</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

