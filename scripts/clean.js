(async () => {
    let rimraf;
    try {
        ({ rimraf } = require('rimraf')); // Dynamically require rimraf
    } catch (err) {
        console.error('❌ Missing dependency: "rimraf". Install it with: npm install or npm install --save-dev rimraf');
        process.exit(1);
    }

    const dirsToClean = ['node_modules', 'dist', '.vite'];

    try {
        await Promise.all(
            dirsToClean.map(async (dir) => {
                await rimraf(dir);
                console.log(`🧹 Removed: ${dir}`);
            })
        );
    } catch (err) {
        console.error(`❌ Cleanup failed: ${err.message}`);
        process.exit(1);
    }
})();
