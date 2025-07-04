import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FiShoppingCart } from 'react-icons/fi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ThemeContext } from '../App';

const NavbarContainer = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--color-bg-glass);
  box-shadow: var(--color-shadow);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  margin: 1rem auto;
  max-width: 1200px;
  position: relative;
  z-index: 10;
`;

const Logo = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 2px;
  user-select: none;
`;

const SearchBar = styled.input`
  flex: 1;
  margin: 0 2rem;
  padding: 0.7rem 1.2rem;
  border-radius: 2rem;
  border: none;
  background: var(--color-card);
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.06);
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 4px 16px 0 rgba(60, 60, 120, 0.12);
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const NavButton = styled.button`
  background: var(--color-primary);
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
    background: var(--color-secondary);
  }
`;

const CartIcon = styled.div`
  position: relative;
  font-size: 1.7rem;
  color: var(--color-primary);
  cursor: pointer;
`;

const ThemeToggleBtn = styled.button`
  background: var(--color-card);
  border: none;
  border-radius: 50%;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.10);
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  top: -14px;
  right: -14px;
  background: var(--color-accent);
  color: #222;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 50%;
  padding: 2px;
  min-width: 22px;
  min-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.10);
`;

const Navbar = ({ onSearch, onCartClick, onAboutClick, onContactClick, onWishlistClick, cartCount, wishlistCount, wishlistFilled }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState('');

  const handleInput = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <NavbarContainer>
      <Logo>BookStore</Logo>
      <SearchBar
        placeholder="Search books, authors..."
        value={search}
        onChange={handleInput}
      />
      <NavActions>
        <NavButton onClick={onAboutClick}>About</NavButton>
        <NavButton onClick={onContactClick}>Contact</NavButton>
        <div style={{position:'relative'}}>
          <CartIcon as="button" onClick={onWishlistClick} style={{background:'none',border:'none',marginRight:8}} title="Wishlist">
            {wishlistFilled ? <FaHeart color="#e74c3c" /> : <FaRegHeart color="#e74c3c" />}
            {wishlistCount > 0 && <Badge>{wishlistCount}</Badge>}
          </CartIcon>
        </div>
        <div style={{position:'relative'}}>
          <CartIcon onClick={onCartClick}>
            <FiShoppingCart />
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </CartIcon>
        </div>
        <ThemeToggleBtn onClick={toggleTheme} title="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </ThemeToggleBtn>
      </NavActions>
    </NavbarContainer>
  );
};

export default Navbar;
