import Header from '@modules/header/header.module';
import NavigationSidebar from '@modules/nav-sidebar/nav-sidebar.module';
import Footer from '@modules/footer/footer.module';
import styles from './home.page.module.css';

export default function HomePage() {
  return (
    <div className={styles.homeContainer} id='homePage'>
      <div className={styles.centerLine} />
      <div className={styles.centerLineHorizontal} />

      <Header />
      <NavigationSidebar />

      <main className={styles.homeContent}>
        <h2>Home Page Content</h2>
        <p>This is the main content area of the home page.</p>
        {/* Add more content here */}
      </main>

      <Footer />
    </div>
  );
}
