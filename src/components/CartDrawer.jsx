import React from 'react';
import styled from 'styled-components';

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(24, 24, 27, 0.25);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  &.active {
    pointer-events: auto;
    opacity: 1;
  }
`;

const Drawer = styled.div`
  width: 340px;
  max-width: 90vw;
  background: var(--color-bg-glass);
  box-shadow: -8px 0 32px 0 rgba(60, 60, 120, 0.12);
  border-radius: 1.5rem 0 0 1.5rem;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  color: var(--color-primary);
  margin-bottom: 1.2rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.1rem;
  background: var(--color-card);
  border-radius: 0.8rem;
  padding: 0.7rem 1rem;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.06);
  position: relative;
`;

const ItemImg = styled.img`
  width: 48px;
  height: 68px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-right: 1rem;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-secondary);
`;

const ItemPrice = styled.div`
  font-size: 1rem;
  color: var(--color-primary);
  font-weight: 700;
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-left: 0.5rem;
`;

const ActionBtn = styled.button`
  background: #f5f7fa;
  color: #3a3aff;
  border: none;
  border-radius: 0.7rem;
  padding: 0.3rem 0.7rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: #3a3aff;
    color: #fff;
  }
`;

const Total = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 1.5rem 0 1rem 0;
  text-align: right;
`;

const CheckoutBtn = styled.button`
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  border: none;
  border-radius: 1.2rem;
  padding: 0.7rem 1.2rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.10);
  transition: background 0.2s;
  width: 100%;
  margin-bottom: 0.7rem;
  &:hover {
    background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
  }
`;

const ClearBtn = styled.button`
  background: #eee;
  color: #222;
  border: none;
  border-radius: 1.2rem;
  padding: 0.7rem 1.2rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  margin-bottom: 0.7rem;
  &:hover {
    background: #e74c3c;
    color: #fff;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--color-primary);
  cursor: pointer;
`;

const Empty = styled.div`
  text-align: center;
  color: var(--color-secondary);
  margin-top: 2rem;
`;

const CartDrawer = ({ active = false, onClose, cart = [], onRemove, onMoveToWishlist, onClear, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  return (
    <DrawerOverlay className={active ? 'active' : ''}>
      <Drawer>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>
        <Title>Your Cart</Title>
        {cart.length === 0 ? (
          <Empty>Your cart is empty.</Empty>
        ) : (
          <>
            {cart.map((item, i) => (
              <CartItem key={i}>
                <ItemImg src={item.img || 'https://via.placeholder.com/48x68?text=No+Cover'} alt={item.title} />
                <ItemInfo>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemPrice>${item.price ? item.price.toFixed(2) : 'N/A'}</ItemPrice>
                </ItemInfo>
                <ItemActions>
                  <ActionBtn onClick={() => onRemove && onRemove(item)}>Remove</ActionBtn>
                  <ActionBtn onClick={() => onMoveToWishlist && onMoveToWishlist(item)}>Move to Wishlist</ActionBtn>
                </ItemActions>
              </CartItem>
            ))}
            <Total>Total: ${total.toFixed(2)}</Total>
            <CheckoutBtn onClick={onCheckout}>Checkout</CheckoutBtn>
            <ClearBtn onClick={onClear}>Clear Cart</ClearBtn>
          </>
        )}
      </Drawer>
    </DrawerOverlay>
  );
};

export default CartDrawer;
