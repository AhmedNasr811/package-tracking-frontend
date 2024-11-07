import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import bodyParser from 'body-parser'; 
import cors from 'cors';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Middleware for parsing JSON bodies and enabling CORS 
  server.use(bodyParser.json()); 
  server.use(cors());

  // Example Express Rest API endpoints

  // User Login Endpoint
   server.post('/api/login', (req, res) => { 
    const { email, password } = req.body; 
    // Perform authentication logic here 
    // Replace with your actual authentication logic 
    if (email === 'test@example.com' && password === 'password') { 
      const token = 'your-token'; // Generate a token 
      res.json({ message: 'Login successful', token }); 
    } else { 
      res.status(401).json({ message: 'Invalid credentials' }); 
    } 
  });

  // Endpoint to fetch all orders assigned to a specific courier based on their ID 
  server.get('/api/assigned-orders/:courierId', (req, res) => { 
    const courierId = req.params.courierId; 
    // Fetch assigned orders for the given courier ID from the database 
    const assignedOrders = [ 
      { id: 1, details: 'Order 1', status: 'pending' }, 
      { id: 2, details: 'Order 2', status: 'in transit' }, 
      // Add more orders as needed 
      ]; 
      res.json({ orders: assignedOrders });
     });
     
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
