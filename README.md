# 💎 PRISM | Crypto Insights & Portfolio Manager

**Prism** es un Dashboard financiero de alto rendimiento diseñado para la gestión y seguimiento de criptoactivos en tiempo real. Este proyecto aplica patrones avanzados de **TypeScript**, consumo eficiente de APIs y un diseño **UI/UX Premium** enfocado en la legibilidad y la experiencia del usuario.

---

## ✨ Características Principales

* **📊 Mercado en Tiempo Real:** Listado dinámico de las principales criptomonedas sincronizado con la API de CoinGecko.
* **🔍 Búsqueda Inteligente:** Filtrado instantáneo por nombre o símbolo optimizado para evitar peticiones redundantes a la red.
* **💼 Gestión de Cartera (Portfolio):** Sistema interactivo de compra y venta de activos con cálculo automático de ganancias/pérdidas (ROI).
* **💾 Persistencia de Datos:** Implementación de `LocalStorage` para garantizar que la cartera se mantenga guardada tras recargar la página.
* **📱 Diseño Responsivo "Elastic-Grid":** Interfaz 100% adaptativa con layouts fluidos que aseguran una lectura perfecta en móviles y escritorio.
* **💎 Estética Premium:** Navegación SPA (Single Page Application), efectos de *Glassmorphism* y micro-interacciones de estado en botones.

---

## 🛠️ Stack Tecnológico

* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
* **Bundler:** [Vite](https://vitejs.dev/)
* **Estilos:** CSS3 Moderno (Variables, Flexbox, Grid, Media Queries)
* **API:** [CoinGecko API](https://www.coingecko.com/en/api)

---

## 🧠 Desafíos Técnicos y Aprendizajes

Este proyecto demuestra competencias clave en el desarrollo de aplicaciones modernas:

1.  **Arquitectura Desacoplada:** Organización del código siguiendo el principio de responsabilidad única, separando la lógica de datos (`services`), el estado (`store`) y la interfaz (`renderers`).
2.  **Tipado Estricto y DTOs:** Uso de interfaces y mapeo de datos para transformar las respuestas de la API en modelos de datos seguros y predecibles.
3.  **UX Crítica en Móvil:** Solución al reto de las tablas financieras mediante el uso de `table-layout: fixed` y compactación elástica de celdas para evitar el scroll lateral incómodo.
4.  **Gestión de Estado Manual:** Implementación de un flujo de datos unidireccional para actualizar la UI global cada vez que se modifica la cartera.

---

## 🤝 Contributing

This project is a reflection of my journey toward becoming a Fullstack Developer. I am always open to code reviews, suggestions, or ideas for improvement that can help optimize the performance and architecture.

---

## 📬 Contact

Created by **[RobertoNDH](https://github.com/RobertoNDH)** Fullstack Developer | Focused on Discipline and Performance  
📧 robertonauzet@gmail.com  

---

⭐ *If you appreciate this focus on clean architecture and discipline, do not forget to give it a star on GitHub!* ⭐