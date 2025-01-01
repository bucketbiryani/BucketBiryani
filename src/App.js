import React, { useEffect, useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  useLocation,
} from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";

const MenuCategory = ({ title, items }) => {
  if (!items) return null;

  const excludedCategories = [
    "indianBreads",
    "curries",
    "desserts",
    "beverages",
    "sideOrders",
  ];

  if (Array.isArray(items)) {
    return (
      <div className="menu-category">
        <h3>{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="menu-item">
              <span className="item-name">{item.name}</span>
              <div className="prices">
                {excludedCategories.includes(title) ? ( // Handle excluded categories
                  <div>${item.price.join(", ")}</div>
                ) : (
                  <>
                    {item.price[0] && (
                      <div>
                        <span className="price-label">Solo:</span> $
                        {item.price[0]}
                      </div>
                    )}
                    {item.price[1] && (
                      <div>
                        <span className="price-label">Trio:</span> $
                        {item.price[1]}
                      </div>
                    )}
                    {item.price[2] && (
                      <div>
                        <span className="price-label">Ultimate:</span> $
                        {item.price[2]}
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="menu-category">
      <h3>{title}</h3>
      {Object.keys(items).map((subKey) => (
        <div key={subKey} className="sub-category">
          <h4>{subKey}</h4>
          <ul>
            {items[subKey].map((item, index) => (
              <li key={index} className="menu-item">
                <span className="item-name">{item.name}</span>
                <div className="prices">
                  {excludedCategories.includes(title) ? ( // Handle excluded categories
                    <div>${item.price.join(", ")}</div>
                  ) : (
                    <>
                      {item.price[0] && (
                        <div>
                          <span className="price-label">Solo:</span> $
                          {item.price[0]}
                        </div>
                      )}
                      {item.price[1] && (
                        <div>
                          <span className="price-label">Trio:</span> $
                          {item.price[1]}
                        </div>
                      )}
                      {item.price[2] && (
                        <div>
                          <span className="price-label">Ultimate:</span> $
                          {item.price[2]}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

function AppContent() {
  const [menuData, setMenuData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const location = useLocation();

  const isMenuPage = location.pathname === "/";

  useEffect(() => {
    fetch("./menu_data_full.json")
      .then((response) => response.json())
      .then((data) => setMenuData(data));
  }, []);

  if (!menuData) return <p>Loading...</p>;

  // Flatten biryani categories into a single array
  const flattenBiryani = () => {
    const biryani = menuData.biryani || {};
    return Object.values(biryani).flat(); // Combine chicken, mutton, veg
  };

  const filteredMenu = () => {
    if (selectedCategory === "All") {
      return menuData;
    } else if (selectedCategory === "Biryani") {
      return { Biryani: flattenBiryani() }; // Special handling for Biryani
    } else {
      return { [selectedCategory]: menuData[selectedCategory] || [] };
    }
  };

  const categoryOptions = [
    { label: "All", value: "All" },
    { label: "Veg Starters", value: "vegStarters" },
    { label: "Non-Veg Appetizers", value: "nonVegAppetizers" },
    { label: "Seafood Appetizers", value: "seafoodAppetizers" },
    { label: "Mutton Appetizers", value: "muttonAppetizers" },
    { label: "Biryani", value: "Biryani" },
    { label: "Curries", value: "curries" },
    { label: "Indian Breads", value: "indianBreads" },
    { label: "Desserts", value: "desserts" },
    { label: "Beverages", value: "beverages" },
    { label: "Side Orders", value: "sideOrders" },
  ];

  const renderedMenu = filteredMenu();

  return (
    <>
      <header>
        <div className="header-content">
          <h1>Bucket Biryani Downtown Toronto</h1>
          <p>Authentic Indian cuisine crafted with passion</p>
        </div>
        <nav>
          <NavLink to="/" className="nav-link" activeclassname="active">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link" activeclassname="active">
            About Us
          </NavLink>
          <NavLink to="/contact" className="nav-link" activeclassname="active">
            Contact Us
          </NavLink>
        </nav>
      </header>
      <main>
        <div className="container">
          <Routes>
            {isMenuPage && (
              <Route
                path="/"
                element={
                  <>
                    <section className="hero">
                      <h2>Welcome to Bucket Biryani Toronto</h2>
                      <p>
                        Experience the rich flavors of traditional Indian
                        biryanis
                      </p>
                    </section>
                    <div className="category-selector">
                      <label htmlFor="category">Filter by Category: </label>
                      <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {categoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {Object.keys(renderedMenu).map((key) => (
                      <MenuCategory
                        key={key}
                        title={key}
                        items={renderedMenu[key]}
                      />
                    ))}
                  </>
                }
              />
            )}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Bucket Biryani Toronto. Designed with ❤️ by Our Team</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
