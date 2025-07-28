import styles from './nav-sidebar.module.css';

export default function NavigationSidebar() {
  return (
    <div className={styles.sidebarContainer} id='navSidebar'>
      <h2>Sidebar Vertical</h2>
      <p>This is a placeholder for the sidebar vertical component.</p>
      {/* Add sidebar content here */}
    </div>
  );
}