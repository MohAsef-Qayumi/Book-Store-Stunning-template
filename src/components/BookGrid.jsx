import React from 'react';
import styled from 'styled-components';
import BookCard from './BookCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2.5rem auto 0 auto;
  padding: 0 2rem 2rem 2rem;
`;

const BookGrid = ({ books, onBookClick, onAddToCart }) => (
  <Grid>
    {books.map((book) => (
      <BookCard key={book.key || book.title} book={book} onClick={() => onBookClick(book)} onAddToCart={() => onAddToCart(book)} />
    ))}
  </Grid>
);

export default BookGrid;
