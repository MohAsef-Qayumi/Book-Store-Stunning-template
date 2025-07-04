import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto 0 auto;
  padding: 2.5rem 2rem 3rem 2rem;
  background: var(--color-bg-glass);
  border-radius: 2rem;
  box-shadow: var(--color-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 1.2rem;
  text-align: center;
`;

const Carousel = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  width: 100%;
  justify-content: center;
  overflow-x: auto;
`;

const BookCard = styled(motion.div)`
  background: var(--color-card);
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px 0 rgba(60, 60, 120, 0.10);
  padding: 1.2rem 1rem 1.5rem 1rem;
  min-width: 160px;
  max-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
  cursor: pointer;
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

const BookTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-secondary);
  text-align: center;
`;

const books = [
  { title: 'The Midnight Library', img: 'https://covers.openlibrary.org/b/id/10523338-L.jpg' },
  { title: 'Project Hail Mary', img: 'https://covers.openlibrary.org/b/id/10523327-L.jpg' },
  { title: 'Atomic Habits', img: 'https://covers.openlibrary.org/b/id/10523325-L.jpg' },
  { title: 'Dune', img: 'https://covers.openlibrary.org/b/id/10523329-L.jpg' },
  { title: 'The Silent Patient', img: 'https://covers.openlibrary.org/b/id/10523331-L.jpg' },
];

const HeroSection = () => (
  <HeroContainer>
    <Title>Discover Your Next Favorite Book</Title>
    <Carousel>
      {books.map((book, idx) => (
        <BookCard
          key={book.title}
          whileHover={{ scale: 1.08 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.15 }}
        >
          <BookImg src={book.img} alt={book.title} />
          <BookTitle>{book.title}</BookTitle>
        </BookCard>
      ))}
    </Carousel>
  </HeroContainer>
);

export default HeroSection;
