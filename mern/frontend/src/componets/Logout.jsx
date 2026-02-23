import { logout } from "../services/auth";

const handleLogout = () => {
  logout();
  window.location.reload(); // or redirect to login page
};