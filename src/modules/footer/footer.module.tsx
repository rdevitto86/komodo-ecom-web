import styles from './footer.module.css';

/**
 * Footer used on the main landing page 
 */
export default function FooterLanding() {
  return (
    <div className={styles.footerContainer} id='footer'>
      <h2>Footer</h2>
      <p>This is a placeholder for the footer component.</p>
      {/* Add footer content here AKA social media links */}
    </div>
  );
}
