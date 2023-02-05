import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    <footer class="footer">
      <p>Siguenos en nuestras redes sociales:</p>
    <ul class="icons">
      <li><a href="#" target="_blank"><i class='bx bxl-twitter'></i></a></li>
      <li><a href="#" target="_blank"><i class='bx bxl-instagram-alt'></i></a></li>
      <li><a href="https://github.com/Alpha870/restaurante-firebase" target="_blank"><i class='bx bxl-github' id="github" ></i></a></li>
      <li><a href="#" target="_blank"><i class='bx bxs-envelope'></i></a></li>
    </ul>
    <ul class="copyright">
      <li>Vive la experiencia en nuestro restaurante</li>
      <li className="mt-1 ms-3">Kiu</li>
      <li className="ms-3">Dirección: Av R2-D2 45th</li>
      <li className="mb-3 ms-3">Tfno: XXXXXXXXX</li>
      <li>© Todos los derechos reservados.</li>
      <li>Esta es una aplicacion ficticia creada para para fines académicos.</li>
    </ul>
  </footer>
  );
};

export default Footer;
