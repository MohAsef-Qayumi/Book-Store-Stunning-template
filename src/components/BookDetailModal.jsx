import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(24, 24, 27, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s;
  &.active {
    visibility: visible;
    opacity: 1;
  }
`;

const Modal = styled.div`
  background: var(--color-bg-glass);
  border-radius: 1.5rem;
  box-shadow: var(--color-shadow);
  padding: 2rem 2.5rem;
  max-width: 600px;
  width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookImg = styled.img`
  width: 120px;
  height: 170px;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.10);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
`;

const Author = styled.div`
  font-size: 1.1rem;
  color: var(--color-secondary);
  margin-bottom: 1.2rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: var(--color-text);
  margin-bottom: 1.2rem;
  text-align: center;
`;

const AuthorBio = styled.div`
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: 1.2rem;
  background: var(--color-card);
  border-radius: 0.7rem;
  padding: 0.7rem 1rem;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.06);
`;

const Reviews = styled.div`
  width: 100%;
  margin-top: 1.2rem;
`;

const Review = styled.div`
  background: var(--color-card);
  border-radius: 0.7rem;
  padding: 0.7rem 1rem;
  margin-bottom: 0.7rem;
  font-size: 0.98rem;
  color: var(--color-text);
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.06);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: transparent;
  border: none;
  font-size: 1.7rem;
  color: var(--color-primary);
  cursor: pointer;
`;

// Placeholder data
const book = {
  title: 'The Midnight Library',
  author: 'Matt Haig',
  img: 'https://covers.openlibrary.org/b/id/10523338-L.jpg',
  description: 'A dazzling novel about all the choices that go into a life well lived.',
  authorBio: 'Matt Haig is an English novelist and journalist. He has written both fiction and non-fiction for children and adults.',
  reviews: [
    'Absolutely loved it! A must-read.',
    'Thought-provoking and beautifully written.',
    'A unique take on life and regrets.'
  ]
};

const BookDetailModal = ({ active = false, onClose }) => (
  <Overlay className={active ? 'active' : ''}>
    <Modal>
      <CloseBtn onClick={onClose}>&times;</CloseBtn>
      <BookImg src={book.img} alt={book.title} />
      <Title>{book.title}</Title>
      <Author>by {book.author}</Author>
      <Description>{book.description}</Description>
      <AuthorBio><b>About the author:</b> {book.authorBio}</AuthorBio>
      <Reviews>
        <b>Reviews:</b>
        {book.reviews.map((r, i) => (
          <Review key={i}>{r}</Review>
        ))}
      </Reviews>
    </Modal>
  </Overlay>
);

export default BookDetailModal;
