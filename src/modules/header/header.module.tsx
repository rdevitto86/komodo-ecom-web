// import SearchBar from '@modules/search/search.module';
// import User from '@modules/user/user.module';
import styles from './header.module.css';
import logo from '@assets/images/komodo-logo.png';

/**
 * Header used on the main landing page
 */
export default function HeaderLanding() {
  return (
    <div className={styles.headerContainer} id='headerContainer'>
      <img className={styles.headerLogo} src={logo} alt="Komodo Logo" id='headerLogo'/>
      {/* <SearchBar /> */}
      <h1 className={styles.headerTitle} id='headerTitle'>Komodo Future Solutions</h1>
      {/* <User /> */}
      {/* <Cart /> */}
    </div>
  );
}
