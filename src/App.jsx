import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryCards from './components/CategoryCards';
import BookGrid from './components/BookGrid';
import BookDetailModal from './components/BookDetailModal';
import CartDrawer from './components/CartDrawer';
import ThemeToggle from './components/ThemeToggle';
import { FaTwitter, FaShareAlt } from 'react-icons/fa';

const lightTheme = {
  mode: 'light',
};
const darkTheme = {
  mode: 'dark',
};

const GlobalStyle = createGlobalStyle`
  body {
    background: var(--color-bg);
    color: var(--color-text);
  }
`;

export const ThemeContext = React.createContext();

// Simple auth and cart demo using localStorage
const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');
const setCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));
const getWishlist = () => JSON.parse(localStorage.getItem('wishlist') || '[]');
const setWishlist = (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist));
const getProfile = () => JSON.parse(localStorage.getItem('profile') || '{"name":"Guest","email":""}');
const setProfile = (profile) => localStorage.setItem('profile', JSON.stringify(profile));
const getOrders = () => JSON.parse(localStorage.getItem('orders') || '[]');
const setOrders = (orders) => localStorage.setItem('orders', JSON.stringify(orders));
const getReviews = () => JSON.parse(localStorage.getItem('reviews') || '{}');
const setReviews = (reviews) => localStorage.setItem('reviews', JSON.stringify(reviews));

export default function App() {
  const [theme, setTheme] = useState('light');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCartState] = useState(getCart());
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [wishlist, setWishlistState] = useState(getWishlist());
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [profile, setProfileState] = useState(getProfile());
  const [orders, setOrdersState] = useState(getOrders());
  const [reviews, setReviewsState] = useState(getReviews());
  const [reviewModal, setReviewModal] = useState({ open: false, book: null });
  const [searchFilters, setSearchFilters] = useState({ title: '', author: '', minRating: '', minPrice: '', maxPrice: '' });

  const themeObject = useMemo(() => (theme === 'light' ? lightTheme : darkTheme), [theme]);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  useEffect(() => { document.body.setAttribute('data-theme', theme); }, [theme]);

  // --- Search books from Open Library API ---
  const handleSearch = async (query) => {
    if (!query) return setSearchResults([]);
    setSearching(true);
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
    const data = await res.json();
    setSearchResults(data.docs.map(doc => ({
      title: doc.title,
      author: doc.author_name?.[0],
      price: 9.99 + Math.random() * 10, // Fake price
      rating: 3.5 + Math.random() * 1.5, // Fake rating
      img: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : undefined,
      key: doc.key,
      olid: doc.edition_key?.[0],
    })));
    setSearching(false);
  };

  // --- Fetch books by category (subject) ---
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setCategoryModalOpen(true);
    const res = await fetch(`https://openlibrary.org/subjects/${category.toLowerCase().replace(/ /g, '_')}.json?limit=12`);
    const data = await res.json();
    setCategoryBooks((data.works || []).map(doc => ({
      title: doc.title,
      author: doc.authors?.[0]?.name,
      price: 9.99 + Math.random() * 10,
      rating: 3.5 + Math.random() * 1.5,
      img: doc.cover_id ? `https://covers.openlibrary.org/b/id/${doc.cover_id}-L.jpg` : undefined,
      key: doc.key,
      olid: doc.cover_edition_key,
    })));
  };

  // --- Book details modal ---
  const handleBookClick = (book) => setSelectedBook(book);
  const closeBookModal = () => setSelectedBook(null);

  // --- Cart logic ---
  const handleAddToCart = (book) => {
    const exists = cart.find(b => b.key === book.key);
    if (!exists) {
      const newCart = [...cart, book];
      setCartState(newCart);
      setCart(newCart);
      setToast({ msg: 'Book added to cart!', type: 'success' });
    } else {
      setToast({ msg: 'Book already in cart.', type: 'info' });
    }
    setTimeout(() => setToast(null), 2000);
  };
  const handleRemoveFromCart = (book) => {
    const newCart = cart.filter(b => b.key !== book.key);
    setCartState(newCart);
    setCart(newCart);
    setToast({ msg: 'Book removed from cart.', type: 'info' });
    setTimeout(() => setToast(null), 2000);
  };
  const handleMoveToWishlistFromCart = (book) => {
    if (!wishlist.find(b => b.key === book.key)) {
      const newWishlist = [...wishlist, book];
      setWishlistState(newWishlist);
      setWishlist(newWishlist);
      setToast({ msg: 'Book moved to wishlist.', type: 'success' });
      setTimeout(() => setToast(null), 2000);
    }
    handleRemoveFromCart(book);
  };
  const handleClearCart = () => {
    setCartState([]);
    setCart([]);
    setToast({ msg: 'Cart cleared.', type: 'info' });
    setTimeout(() => setToast(null), 2000);
  };
  const handleCartClick = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  // --- Wishlist logic ---
  const handleAddToWishlist = (book) => {
    const exists = wishlist.find(b => b.key === book.key);
    if (!exists) {
      const newWishlist = [...wishlist, book];
      setWishlistState(newWishlist);
      setWishlist(newWishlist);
      setToast({ msg: 'Book added to wishlist!', type: 'success' });
    } else {
      setToast({ msg: 'Book already in wishlist.', type: 'info' });
    }
    setTimeout(() => setToast(null), 2000);
  };
  const handleRemoveFromWishlist = (book) => {
    const newWishlist = wishlist.filter(b => b.key !== book.key);
    setWishlistState(newWishlist);
    setWishlist(newWishlist);
    setToast({ msg: 'Book removed from wishlist.', type: 'info' });
    setTimeout(() => setToast(null), 2000);
  };
  const handleWishlistClick = () => setWishlistOpen(true);
  const closeWishlist = () => setWishlistOpen(false);

  // --- Category modal close ---
  const closeCategoryModal = () => setCategoryModalOpen(false);

  // --- About/Contact modal close ---
  const closeAbout = () => setAboutOpen(false);
  const closeContact = () => setContactOpen(false);

  // --- Checkout logic ---
  const handleCheckout = () => setCheckoutOpen(true);
  const closeCheckout = () => setCheckoutOpen(false);
  const handlePlaceOrder = () => {
    setCartState([]);
    setCart([]);
    setCheckoutOpen(false);
    const newOrder = { id: Date.now(), date: new Date().toLocaleString(), items: cart, total: cart.reduce((sum, b) => sum + (b.price || 0), 0) };
    const newOrders = [newOrder, ...orders];
    setOrdersState(newOrders);
    setOrders(newOrders);
    setToast({ msg: 'Order placed successfully!', type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  // --- Advanced search/filtering ---
  const handleFilterChange = (e) => {
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  };
  const filteredSearchResults = searchResults.filter(book => {
    if (searchFilters.title && !book.title.toLowerCase().includes(searchFilters.title.toLowerCase())) return false;
    if (searchFilters.author && (!book.author || !book.author.toLowerCase().includes(searchFilters.author.toLowerCase()))) return false;
    if (searchFilters.minRating && (book.rating || 0) < parseFloat(searchFilters.minRating)) return false;
    if (searchFilters.minPrice && (book.price || 0) < parseFloat(searchFilters.minPrice)) return false;
    if (searchFilters.maxPrice && (book.price || 0) > parseFloat(searchFilters.maxPrice)) return false;
    return true;
  });

  // --- Profile logic ---
  const handleProfileSave = (name, email) => {
    setProfileState({ name, email });
    setProfile({ name, email });
    setProfileOpen(false);
    setToast({ msg: 'Profile updated.', type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  // --- Reviews logic ---
  const handleAddReview = (bookKey, review) => {
    const newReviews = { ...reviews, [bookKey]: [...(reviews[bookKey] || []), review] };
    setReviewsState(newReviews);
    setReviews(newReviews);
    setToast({ msg: 'Review added!', type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  // --- Social sharing ---
  const handleShare = (book) => {
    const url = window.location.href + `#book-${book.key}`;
    navigator.clipboard.writeText(url);
    setToast({ msg: 'Book link copied to clipboard!', type: 'info' });
    setTimeout(() => setToast(null), 2000);
  };
  const handleShareTwitter = (book) => {
    const url = encodeURIComponent(window.location.href + `#book-${book.key}`);
    const text = encodeURIComponent(`Check out this book: ${book.title}`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={themeObject}>
        <GlobalStyle />
        <Navbar
          onSearch={handleSearch}
          onCartClick={handleCartClick}
          onAboutClick={() => setAboutOpen(true)}
          onContactClick={() => setContactOpen(true)}
          onWishlistClick={handleWishlistClick}
          cartCount={cart.length}
          wishlistCount={wishlist.length}
          wishlistFilled={wishlist.length > 0}
          onProfileClick={() => setProfileOpen(true)}
          onOrdersClick={() => setOrdersOpen(true)}
        />
        {/* Advanced search/filtering UI */}
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 2rem',display:'flex',gap:16,alignItems:'center',marginTop:8}}>
          <input name="title" value={searchFilters.title} onChange={handleFilterChange} placeholder="Title" style={{padding:6,borderRadius:8,border:'1px solid #eee'}} />
          <input name="author" value={searchFilters.author} onChange={handleFilterChange} placeholder="Author" style={{padding:6,borderRadius:8,border:'1px solid #eee'}} />
          <input name="minRating" value={searchFilters.minRating} onChange={handleFilterChange} placeholder="Min Rating" type="number" min="0" max="5" step="0.1" style={{padding:6,borderRadius:8,border:'1px solid #eee',width:90}} />
          <input name="minPrice" value={searchFilters.minPrice} onChange={handleFilterChange} placeholder="Min Price" type="number" min="0" style={{padding:6,borderRadius:8,border:'1px solid #eee',width:90}} />
          <input name="maxPrice" value={searchFilters.maxPrice} onChange={handleFilterChange} placeholder="Max Price" type="number" min="0" style={{padding:6,borderRadius:8,border:'1px solid #eee',width:90}} />
        </div>
        <ThemeToggle />
        <HeroSection />
        <CategoryCards onCategoryClick={handleCategoryClick} />
        {/* Show search results if searching or results exist */}
        {searching && <div style={{textAlign:'center'}}>Searching...</div>}
        {filteredSearchResults.length > 0 && (
          <BookGrid
            books={filteredSearchResults}
            onBookClick={handleBookClick}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            wishlist={wishlist}
            isWishlist={false}
          />
        )}
        {/* Category modal */}
        {categoryModalOpen && (
          <BookDetailModal
            active={categoryModalOpen}
            onClose={closeCategoryModal}
            books={categoryBooks}
            category={selectedCategory}
            onBookClick={handleBookClick}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            wishlist={wishlist}
            isCategoryModal
          />
        )}
        {/* Book details modal */}
        {selectedBook && (
          <BookDetailModal
            active={!!selectedBook}
            onClose={closeBookModal}
            book={selectedBook}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            wishlist={wishlist}
          />
        )}
        {/* Cart drawer */}
        <CartDrawer
          active={cartOpen}
          onClose={closeCart}
          cart={cart}
          onRemove={handleRemoveFromCart}
          onMoveToWishlist={handleMoveToWishlistFromCart}
          onClear={handleClearCart}
          onCheckout={handleCheckout}
        />
        {/* Wishlist modal */}
        {wishlistOpen && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',padding:32,borderRadius:16,minWidth:300,maxWidth:600}}>
              <h2>My Wishlist</h2>
              {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
              ) : (
                <div>
                  {wishlist.map(book => (
                    <div key={book.key} style={{position:'relative',marginBottom:24}}>
                      <BookGrid
                        books={[book]}
                        onBookClick={handleBookClick}
                        onAddToCart={handleAddToCart}
                        onAddToWishlist={handleRemoveFromWishlist}
                        wishlist={wishlist}
                        isWishlist
                      />
                      <button
                        style={{position:'absolute',top:10,right:10,background:'#3a3aff',color:'#fff',border:'none',borderRadius:8,padding:'6px 16px',fontWeight:600,cursor:'pointer'}}
                        onClick={() => {
                          handleAddToCart(book);
                          handleRemoveFromWishlist(book);
                          setToast({ msg: 'Book moved to cart!', type: 'success' });
                          setTimeout(() => setToast(null), 2000);
                        }}
                      >Move to Cart</button>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={closeWishlist} style={{width:'100%',padding:8,marginTop:16,background:'#eee',border:'none',borderRadius:8}}>Close</button>
            </div>
          </div>
        )}
        {/* About modal */}
        {aboutOpen && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',padding:32,borderRadius:16,minWidth:300,maxWidth:400}}>
              <h2>About BookStore</h2>
              <p>BookStore is your modern online destination for discovering, exploring, and purchasing books across all genres. Enjoy a premium, elegant, and responsive experience with live search, curated categories, and a seamless cart.</p>
              <button onClick={closeAbout} style={{width:'100%',padding:8,marginTop:16,background:'#eee',border:'none',borderRadius:8}}>Close</button>
            </div>
          </div>
        )}
        {/* Contact modal */}
        {contactOpen && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',padding:32,borderRadius:16,minWidth:300,maxWidth:400}}>
              <h2>Contact Us</h2>
              <p>Have questions or feedback? Reach out to us at <a href="mailto:support@bookstore.com">support@bookstore.com</a> or use our contact form on the website.</p>
              <button onClick={closeContact} style={{width:'100%',padding:8,marginTop:16,background:'#eee',border:'none',borderRadius:8}}>Close</button>
            </div>
          </div>
        )}
        {/* Checkout modal */}
        {checkoutOpen && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',transition:'opacity 0.3s',animation:'fadeIn 0.3s'}}>
            <div style={{background:'#fff',padding:32,borderRadius:16,minWidth:320,maxWidth:400,boxShadow:'0 4px 32px rgba(60,60,120,0.18)',animation:'slideUp 0.3s'}}>
              <h2>Order Summary</h2>
              <ul style={{padding:0,listStyle:'none',marginBottom:16}}>
                {cart.map(book => (
                  <li key={book.key} style={{marginBottom:8}}>
                    <b>{book.title}</b> <span style={{color:'#888'}}>(${book.price ? book.price.toFixed(2) : 'N/A'})</span>
                  </li>
                ))}
              </ul>
              <div style={{fontWeight:700,marginBottom:16}}>Total: ${cart.reduce((sum, b) => sum + (b.price || 0), 0).toFixed(2)}</div>
              <button onClick={handlePlaceOrder} style={{width:'100%',padding:10,background:'#3a3aff',color:'#fff',border:'none',borderRadius:8,fontWeight:600,marginBottom:8,cursor:'pointer'}}>Place Order</button>
              <button onClick={closeCheckout} style={{width:'100%',padding:8,background:'#eee',border:'none',borderRadius:8}}>Cancel</button>
            </div>
          </div>
        )}
        {/* Profile modal */}
        {profileOpen && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',padding:32,borderRadius:16,minWidth:320,maxWidth:400}}>
              <h2>Profile</h2>
              <input id="profile-name" defaultValue={profile.name} placeholder="Name" style={{width:'100%',padding:8,marginBottom:8}} />
              <input id="profile-email" defaultValue={profile.email} placeholder="Email" style={{width:'100%',padding:8,marginBottom:16}} />
              <button onClick={()=>handleProfileSave(document.getElementById('profile-name').value,document.getElementById('profile-email').value)} style={{width:'100%',padding:8,background:'#3a3aff',color:'#fff',border:'none',borderRadius:8,marginBottom:8}}>Save</button>
              <button onClick={()=>setProfileOpen(false)} style={{width:'100%',padding:8,background:'#eee',border:'none',borderRadius:8}}>Cancel</button>
            </div>
          </div>
        )}
        {/* Orders modal */}
        {ordersOpen && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',padding:32,borderRadius:16,minWidth:320,maxWidth:600}}>
              <h2>Order History</h2>
              {orders.length === 0 ? <p>No orders yet.</p> : (
                <ul style={{padding:0,listStyle:'none'}}>
                  {orders.map(order => (
                    <li key={order.id} style={{marginBottom:16}}>
                      <b>Order #{order.id}</b> <span style={{color:'#888'}}>({order.date})</span><br/>
                      {order.items.map(item => <span key={item.key}>{item.title} (${item.price ? item.price.toFixed(2) : 'N/A'}), </span>)}
                      <br/><b>Total:</b> ${order.total.toFixed(2)}
                    </li>
                  ))}
                </ul>
              )}
              <button onClick={()=>setOrdersOpen(false)} style={{width:'100%',padding:8,background:'#eee',border:'none',borderRadius:8,marginTop:8}}>Close</button>
            </div>
          </div>
        )}
        {/* Book reviews modal */}
        {reviewModal.open && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',padding:32,borderRadius:16,minWidth:320,maxWidth:500}}>
              <h2>Reviews for {reviewModal.book.title}</h2>
              <ul style={{padding:0,listStyle:'none',marginBottom:16}}>
                {(reviews[reviewModal.book.key]||[]).map((r,i)=>(<li key={i} style={{marginBottom:8}}><b>{r.name||'Anonymous'}:</b> {r.text}</li>))}
              </ul>
              <input id="review-name" placeholder="Your name" style={{width:'100%',padding:8,marginBottom:8}} />
              <textarea id="review-text" placeholder="Write a review..." style={{width:'100%',padding:8,marginBottom:8}} />
              <button onClick={()=>{
                const name = document.getElementById('review-name').value;
                const text = document.getElementById('review-text').value;
                if(text) handleAddReview(reviewModal.book.key, { name, text });
              }} style={{width:'100%',padding:8,background:'#3a3aff',color:'#fff',border:'none',borderRadius:8,marginBottom:8}}>Add Review</button>
              <button onClick={()=>setReviewModal({open:false,book:null})} style={{width:'100%',padding:8,background:'#eee',border:'none',borderRadius:8}}>Close</button>
            </div>
          </div>
        )}
        {/* Toast notification */}
        {toast && (
          <div style={{position:'fixed',bottom:32,right:32,zIndex:2000,background:'#fff',color:'#222',padding:'12px 24px',borderRadius:8,boxShadow:'0 2px 8px rgba(0,0,0,0.12)',fontWeight:600,transition:'opacity 0.3s',animation:'fadeIn 0.3s'}}>
            {toast.msg}
          </div>
        )}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
