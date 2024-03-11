import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Carousel/Carousel.css';
import bookClubsData from '../BookClubs/BookClubsData';

const CarouselSlideItem = ({ item, active }) => {
  return (
    <li className={`carousel__slide-item ${active ? 'active' : ''}`}>
      <Link to={`/book-club/${item.id}`}> {/* should go to the book club page that matches id from BookClubsData */}
        <div className="carousel__slide-item-img-link">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="carousel-slide-item__body">
          <h4>{item.name}</h4>
          <p>{item.desc}</p>
        </div>
      </Link>
    </li>
  );
};

const Carousel = () => {
  const [activeIdx] = useState(0);

  return (
    <div className="carousel__wrap">
      <div className="carousel__inner">
        <div className="carousel__container">
          <ul className="carousel__slide-list">
            {bookClubsData.map((item, i) => (
              <CarouselSlideItem
                key={i}
                item={item}
                active={i === activeIdx}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
