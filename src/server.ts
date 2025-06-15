import { createServer } from 'vite';

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

startServer();
