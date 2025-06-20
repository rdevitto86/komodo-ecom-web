import { createServer } from 'vite';
import setupCountriesISO from './i18n/setupCountries';

// Initialize global resources
setupCountriesISO();

// Vite server config
async function startServer() {
  const server = await createServer({
    root: './src',
    server: {
      port: 3000,
      open: true,
    },
    plugins: [],
    // ssr: {
    //   noExternal: true,
    // },
  });

  await server.listen();
  server.printUrls();
}

// Start app
startServer();
