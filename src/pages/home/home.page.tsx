import './home.page.css';
// @ts-expect-error import statement for images
import logo from '@assets/images/komodo-logo.png';

export default function HomePage() {
  return (
    <div className="homeContainer">
      <img src={logo} alt="Komodo Logo" />
      <h1 className="homeTitle">Welcome to Komodo E-commerce</h1>
      <p className="homeSubtitle">The best place to buy things online.</p>
    </div>
  );
}
