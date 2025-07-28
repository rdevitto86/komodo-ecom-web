import { rm } from 'node:fs/promises';

// UNIX only script. Sorry Windows.
async function cleanDeps() {
  const dirsToClean = ['node_modules', 'dist', '.vite'];

  try {
    await Promise.all(
      dirsToClean.map(async (dir) => {
        await rm(dir, { recursive: true, force: true });
        console.log(`🧹 Removed: ${dir}`);
      })
    );
  } catch (err) {
    console.error('❌ Cleanup failed. Ensure you have necessary permissions to delete files in the specified directories.');
  }
};

export default cleanDeps();
