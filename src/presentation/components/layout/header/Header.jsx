import UserMenu from '../../ui/UserMenu/UserMenu';
import "./Header.css";

function Header({ titulo = "Dashboard Principal" }) {
  return (
    <header className="header">
      <div className="menu-usuario">
        <UserMenu titulo={titulo} />
      </div>
    </header>
  );
}

export default Header;
