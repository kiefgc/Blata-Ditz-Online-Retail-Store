import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import ScrollPosition from "./pages/ScrollPosition";

import Landing from "./pages/Landing/Landing";
import Product from "./pages/Product";
import UserDashboard from "./pages/UserDashboard";
import UserOrders from "./pages/UserOrders";
import UserProfile from "./pages/UserProfile";

import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";
import AdminInventory from "./pages/AdminInventory";
import AdminCategories from "./pages/AdminCategories";
import AdminSuppliers from "./pages/AdminSuppliers";
import AdminReports from "./pages/AdminReports";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <ScrollPosition />
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Routes>
        <Route path="/" element={<Landing searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/orders" element={<UserOrders />} />
        <Route path="/dashboard/profile" element={<UserProfile />} />

        {/* Admin routes */}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/suppliers" element={<AdminSuppliers />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
