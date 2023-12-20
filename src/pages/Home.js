
import React from 'react'
import Layout from '../components/layout/Layout'
import img1 from "./assets/img/home-sushi-rolls.png"
import leaf1 from "./assets/img/leaf-branch-4.png"
import leaf2 from "./assets/img/leaf-branch-3.png"
import sushi from "./assets/img/home-sushi-title.png"
import sushititle from "./assets/img/about-sushi-title.png"
import sushiabout from "./assets/img/about-sushi.png" 
import leafbranch1 from "./assets/img/leaf-branch-1.png"
import pop1 from "./assets/img/popular-onigiri.png"
import pop2 from "./assets/img/popular-spring-rols.png"
import pop3 from "./assets/img/popular-sushi-rolls.png"
import rec1 from "./assets/img/spinach-leaf.png"
import rec2 from "./assets/img/recently-salmon-sushi.png"
import rec3 from "./assets/img/leaf-branch-2.png"
import rec4 from "./assets/img/leaf-branch-3.png"




const Home = () => {
  return (
   <Layout>
    <main className='main'>
    <section className="home section" id="home">
  <div className="home__container container grid">
    <img src={img1} alt="home image" className="home__img" />
    <div className="home__data">
      <h1 className="home__title">
        Enjoy Delicious
        <div>
          <img src={sushi} alt />
          Sushi Food
        </div>
      </h1>
      <p className="home__discription">
        Enjoy a good dinner with the best dishes in restaurant and improve your day
      </p>
      <a href="#" className="button"> Order Now <i className="ri-arrow-right-line" /></a>
    </div>
  </div>
 <img src={leaf1}  className="home__leaf-1"/>
  <img src={leaf2} alt className="home__leaf-2" />
</section>




<section className="about section" id="about">
  <div className="about__container container grid">
    <div className="about__data">
      <span className="section__subtitle">
        About us
      </span>
      <h2 className="section__title about__title">
        <div>
          we provide
          <img src={sushititle} alt />
        </div>
        Healthy food
      </h2>
      <p className="about__description">
        Food comes to us from our relatives, whether they 
        have wings or roots. This is how we consider food, 
        it also has a culture. It has a history that passes 
        from generation to generation.
      </p>
    </div>
    <img src={sushiabout} alt className="about__img" />
  </div>
  <img src={leafbranch1} alt className="about__leaf" />
</section>



<section className="popular section" id="popular">
  <span className="section__subtitle">The Best Food</span>
  <h2 className="section__title">Popular Dishes</h2>
  <div className="popular__container container grid">
    <article className="popular__card">
      <img src={pop1} alt className="popular__img" />
      <h3 className="popular__name">Onigiri</h3>
      <span className="popular__description">Japanese Dish</span>
      <span className="popular__price">$10.99</span>
      <button className="popular__button"><i className="ri-shopping-bag-line" /></button>
    </article>
    <article className="popular__card">
      <img src={pop2} alt className="popular__img" />
      <h3 className="popular__name">Spring Rolls</h3>
      <span className="popular__description">Japanese Dish</span>
      <span className="popular__price">$15.99</span>
      <button className="popular__button"><i className="ri-shopping-bag-line" /></button>
    </article>
    <article className="popular__card">
      <img src={pop3} alt className="popular__img" />
      <h3 className="popular__name">Sushi Rolls</h3>
      <span className="popular__description">Japanese Dish</span>
      <span className="popular__price">$19.99</span>
      <button className="popular__button"><i className="ri-shopping-bag-line" /></button>
    </article>
  </div>
</section>




<section className="recently section" id="recently">
  <div className="recently__container container grid">
    <div className="recently__data">
      <span className="section__subtitle">Recently Added</span>
      <h2 className="section__title">Sushi Samurai <br /> Salmon Chesse</h2>
      <p className="recently__description">Take a look at what's new. And do not deprive 
        yourself of a good meal, enjoy and be happy.
      </p>
      <a href="#" className="button">Order Now <i className="ri-arrow-right-line" /></a>
      <img src={rec1} alt className="recently__data-img" />
    </div>
    <img src={rec2} alt className="recently__img" />
  </div>
  <img src={rec3} alt className="recently__leaf-1" />
  <img src={rec4} alt className="recently__leaf-2" />
</section>





</main>



   </Layout>
  )
}

export default Home