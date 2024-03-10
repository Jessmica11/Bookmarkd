import React, { useState, useEffect } from 'react';
import './Carousel.css';

const _items = [
  {
    bookclub: {
      name: 'Bros & Books',
      desc: 'In this book, blogger and former internet entrepreneur Mark Manson explains in simple, no expletives barred terms how to achieve happiness...',
      image: 'https://ia902501.us.archive.org/BookReader/BookReaderPreview.php?id=subtleartofnotgi0000mans_n2n5&itemPath=%2F15%2Fitems%2Fsubtleartofnotgi0000mans_n2n5&server=ia902501.us.archive.org&page=cover_w500_h500.jpg',
    },
  },
  {
    bookclub: {
      name: "A Novel Idea",
      desc: "For anyone who needs reminding that a life worth living can only be born from radical honesty...",
      image: 'https://ia804703.us.archive.org/view_archive.php?archive=/9/items/l_covers_0012/l_covers_0012_88.zip&file=0012881449-L.jpg',
    },
  },
  {
    bookclub: {
      name: 'Between the Lines',
      desc: 'Alicia Berenson’s life is seemingly perfect. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word...',
      image: 'https://ia801401.us.archive.org/view_archive.php?archive=/32/items/l_covers_0008/l_covers_0008_41.tar&file=0008415060-L.jpg',
    },
  },
  {
    bookclub: {
      name: 'Smutty Buddies',
      desc: 'Mike Sigel or "The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him...',
      image: 'https://covers.openlibrary.org/b/id/14566671-L.jpg',
    },
  },
  {
    bookclub: {
      name: 'Bookworms',
      desc: 'When two young rival journalists find love through a magical connection, they must face the depths of hell, in a war among gods, to seal their fate forever...',
      image: 'https://ia801909.us.archive.org/view_archive.php?archive=/31/items/l_covers_0013/l_covers_0013_26.zip&file=0013268161-L.jpg',
    },
  },
];

const length = _items.length;

const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const CarouselSlideItem = ({ item, active }) => {
  return (
    <li className={`carousel__slide-item ${active ? 'active' : ''}`}>
      <a href="/your-target-page">
        <div className="carousel__slide-item-img-link">
          <img src={item.bookclub.image} alt={item.bookclub.name} />
        </div>
        <div className="carousel-slide-item__body">
          <h4>{item.bookclub.name}</h4>
          <p>{item.bookclub.desc}</p>
        </div>
      </a>
    </li>
  );
};

const Carousel = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const prevClick = () => {
    setActiveIdx((prev) => (prev - 1 + length) % length);
  };

  const nextClick = () => {
    setActiveIdx((prev) => (prev + 1) % length);
  };

  return (
    <div className="carousel__wrap">
      <div className="carousel__inner">
        <button
          className="carousel__btn carousel__btn--prev"
          onClick={prevClick}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--left" />
        </button>

        <div className="carousel__container">
          <ul className="carousel__slide-list">
            {_items.map((item, i) => (
              <CarouselSlideItem
                key={i}
                item={item}
                active={i === activeIdx}
              />
            ))}
          </ul>
        </div>

        <button
          className="carousel__btn carousel__btn--next"
          onClick={nextClick}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--right" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;