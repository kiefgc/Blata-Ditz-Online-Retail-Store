import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollPosition from "./pages/ScrollPosition";

import Landing from "./pages/Landing";
import Product from "./pages/Product";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";
import AdminInventory from "./pages/AdminInventory";
import AdminCategories from "./pages/AdminCategories";
import AdminSuppliers from "./pages/AdminSuppliers";
import AdminReports from "./pages/AdminReports";

function App() {
  return (
    <Router>
      <ScrollPosition />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product" element={<Product />} />

        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/suppliers" element={<AdminSuppliers />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>
    </Router>
  );
}

export default App;
