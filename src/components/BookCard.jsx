import React from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaRegHeart } from 'react-icons/fa';

const Card = styled.div`
  background: var(--color-card);
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px 0 rgba(60, 60, 120, 0.10);
  padding: 1.2rem 1rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  position: relative;
  &:hover {
    box-shadow: 0 6px 24px 0 rgba(60, 60, 120, 0.18);
    transform: translateY(-6px) scale(1.04);
  }
`;

const BookImg = styled.img`
  width: 90px;
  height: 130px;
  object-fit: cover;
  border-radius: 0.7rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.10);
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-secondary);
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Price = styled.div`
  font-size: 1.1rem;
  color: var(--color-primary);
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
`;

const AddButton = styled.button`
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  border: none;
  border-radius: 1.2rem;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.10);
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
  }
`;

const WishlistBtn = styled.button`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  background: transparent;
  border: none;
  font-size: 1.3rem;
  color: #e74c3c;
  cursor: pointer;
  z-index: 2;
`;

function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} color="#ffd700" />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} color="#ffd700" />);
    else stars.push(<FaRegStar key={i} color="#ffd700" />);
  }
  return stars;
}

const BookCard = ({ book, onClick, onAddToCart, onAddToWishlist, wishlist = [] }) => {
  const inWishlist = wishlist.some(b => b.key === book.key);
  return (
    <Card onClick={onClick}>
      <WishlistBtn
        title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        onClick={e => {
          e.stopPropagation();
          onAddToWishlist && onAddToWishlist(book, inWishlist);
        }}
      >
        {inWishlist ? <FaHeart /> : <FaRegHeart />}
      </WishlistBtn>
      <BookImg src={book.img || 'https://via.placeholder.com/90x130?text=No+Cover'} alt={book.title} />
      <Title>{book.title}</Title>
      <Price>${book.price ? book.price.toFixed(2) : 'N/A'}</Price>
      <Rating>{renderStars(book.rating || 4)}</Rating>
      <AddButton
        onClick={e => {
          e.stopPropagation();
          onAddToCart && onAddToCart(book);
        }}
      >
        Add to Cart
      </AddButton>
    </Card>
  );
};

export default BookCard;
