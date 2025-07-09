import "./styles/index.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Context from "@/context/Context";

// หน้าหลักที่ใช้งานจริง
import HomePage from "./pages";
import LoginPage from "./pages/others/login";
import SignupPage from "./pages/others/signup";
import ForgotPassword from "./components/others/ForgotPassword"; // ถ้ามี
import DashboardPage from "./pages/dashboard/dashboard";
import CourseListPage from "./pages/coursesList/courses-list-1";
import CourseSinglePage from "./pages/courseSingle/courses";
import CartPage from "./pages/cartPages/course-cart";
import CheckoutPage from "./pages/cartPages/course-checkout";
import ShopListPage from "./pages/shop/shop-list";
import ShopDetailPage from "./pages/shop/shop";
import ShopCartPage from "./pages/cartPages/shop-cart";
import ShopCheckoutPage from "./pages/cartPages/shop-checkout";
import ContactPage from "./pages/contacts/contact-1";
import UIElementsPage from "./pages/others/ui-elements";
import NotFoundPage from "./pages/not-found";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses" element={<CourseListPage />} />
          <Route path="/courses/:id" element={<CourseSinglePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/shop" element={<ShopListPage />} />
          <Route path="/shop/:id" element={<ShopDetailPage />} />
          <Route path="/shop-cart" element={<ShopCartPage />} />
          <Route path="/shop-checkout" element={<ShopCheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ui-elements" element={<UIElementsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ScrollTopBehaviour />
      </BrowserRouter>
    </Context>
  );
}

export default App;
