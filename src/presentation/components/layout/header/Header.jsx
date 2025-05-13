import UserMenu from '../../ui/UserMenu/UserMenu';
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <input type="text" placeholder="Search something..." className="search" />
      <div className="menu-usuario">
        <UserMenu />
      </div>
    </header>
  );
}

export default Header;