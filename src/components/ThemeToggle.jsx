import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';

const ToggleBtn = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 300;
  background: var(--color-card);
  border: none;
  border-radius: 50%;
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 16px 0 rgba(60, 60, 120, 0.18);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: var(--color-bg-glass);
    box-shadow: 0 4px 24px 0 rgba(60, 60, 120, 0.22);
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <ToggleBtn onClick={toggleTheme} title="Toggle theme">
      {theme === 'light' ? '🌙' : '☀️'}
    </ToggleBtn>
  );
};

export default ThemeToggle;
