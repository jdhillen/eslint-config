import express, { type Request, type Response } from 'express';

const app = express();
const port = process.env['PORT'] ?? 3000;

// Middleware
app.use(express.json());

interface CounterState {
  count: number;
}

const state: CounterState = {
  count: 0,
};

/**
 * Get current counter value
 */
app.get('/api/counter', (_req: Request, res: Response) => {
  res.json({ count: state.count });
});

/**
 * Increment counter
 */
app.post('/api/counter/increment', (_req: Request, res: Response) => {
  state.count += 1;
  console.log(`Counter incremented to ${state.count}`);
  res.json({ count: state.count });
});

/**
 * Decrement counter
 */
app.post('/api/counter/decrement', (_req: Request, res: Response) => {
  state.count -= 1;
  console.log(`Counter decremented to ${state.count}`);
  res.json({ count: state.count });
});

/**
 * Reset counter
 */
app.post('/api/counter/reset', (_req: Request, res: Response) => {
  state.count = 0;
  console.log('Counter reset to 0');
  res.json({ count: state.count });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
