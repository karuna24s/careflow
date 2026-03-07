import express, { Request, Response } from 'express';

export * from '@careflow/shared/schemas/intake';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'active', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 CareFlow API listening on port ${PORT}`);
});