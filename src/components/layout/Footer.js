import React from 'react'


import img1 from "../../pages/assets/img/logo.png"

const Footer = () => {
  return (
   <footer className="footer">
  <div className="footer__container container grid">
    <div>
      <a href="#" className="footer__logo">
        <img src={img1} />sushi
      </a>
      <p className="footer__description">
        Food for the body is not <br />
        enough. There must be food <br />
        for the soul.
      </p>
    </div>
    <div className="footer__content">
      <div>
        <h3 className="footer__title">
          MainMENU
        </h3>
        <ul className="footer__links">
          <li>
            <a className="footer__links"> About</a>
          </li>
          <li>
            <a className="footer__links">Menus</a>
          </li>
          <li>
            <a className="footer__links">Offers</a>
          </li>
          <li>
            <a className="footer__links">Events</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="footer__title">
          Information
        </h3>
        <ul className="footer__links">
          <li>
            <a className="footer__links">Contact</a>
          </li>
          <li>
            <a className="footer__links">Order &amp; Returns</a>
          </li>
          <li>
            <a className="footer__links">Videos</a>
          </li>
          <li>
            <a className="footer__links">Reservation</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="footer__title">
          Address
        </h3>
        <ul className="footer__links">
          <li>
            <a className="footer__links">Banur huosefed <br />rajpura-patiala, highway,<br/> punjab 
              9AM - 11PM</a>
          </li>
          <li>
            <a className="footer__links"></a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="footer__title">
          SocialMedia
        </h3>
        <ul className="footer__social">
          <a className="footer__social_links">
            <i className="ri-facebook-circle-fill" />
          </a>
          <a className="footer__social_links">
            <i className="ri-instagram-fill" />
          </a>
          <a className="footer__social_links">
            <i className="ri-twitter-line" />
          </a>
        </ul>
      </div>
    </div>
  </div>
</footer>

  
   
  
  )
}

export default Footer