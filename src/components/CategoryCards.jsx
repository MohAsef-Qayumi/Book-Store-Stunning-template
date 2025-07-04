import React from 'react';
import styled from 'styled-components';
import { FaBook, FaRocket, FaHeart, FaMagic, FaUserSecret, FaGlobe } from 'react-icons/fa';

const categories = [
  { name: 'Fiction', icon: <FaBook /> },
  { name: 'Non-fiction', icon: <FaGlobe /> },
  { name: 'Sci-fi', icon: <FaRocket /> },
  { name: 'Mystery', icon: <FaUserSecret /> },
  { name: 'Romance', icon: <FaHeart /> },
  { name: 'Fantasy', icon: <FaMagic /> },
];

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  max-width: 1100px;
  margin: 2.5rem auto 0 auto;
  padding: 0 2rem;
`;

const CategoryCard = styled.div`
  background: var(--color-card);
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px 0 rgba(60, 60, 120, 0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 0.5rem 1rem 0.5rem;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  font-weight: 600;
  color: var(--color-primary);
  font-size: 1.1rem;
  &:hover {
    box-shadow: 0 6px 24px 0 rgba(60, 60, 120, 0.18);
    transform: translateY(-6px) scale(1.04);
    color: var(--color-secondary);
  }
`;

const IconWrap = styled.div`
  font-size: 2.2rem;
  margin-bottom: 0.7rem;
`;

const CategoryCards = ({ onCategoryClick }) => (
  <CategoryGrid>
    {categories.map((cat) => (
      <CategoryCard key={cat.name} onClick={() => onCategoryClick && onCategoryClick(cat.name)}>
        <IconWrap>{cat.icon}</IconWrap>
        {cat.name}
      </CategoryCard>
    ))}
  </CategoryGrid>
);

export default CategoryCards; 