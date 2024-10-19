require('dotenv').config();
import express from 'express';
import next from 'next';
import cors from 'cors';
import path from 'path';
import request from 'request';
import bodyParser from 'body-parser';
import likesRoutes from './api/routes/likesRoutes'; 
import feedsRoutes from './api/routes/feedsRoutes'; 
import usersRoutes from './api/routes/usersRoutes';
import recipesRoutes from './api/routes/recipesRoutes';
import { supabase } from './supabaseClient';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const server = express();
server.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});
server.use(cors({
  origin: [
    'http://localhost:4001', 
    'https://breastfeeding-frontend-lrjuhjx3x-tlmoody84s-projects.vercel.app' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

server.options('*', cors());

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/api/likes', likesRoutes); 
server.use('/api/feeds', feedsRoutes); 
server.use('/api/users', usersRoutes); 
server.use('/api/recipes', recipesRoutes); 

server.get('/api/feeds', async (req, res) => {
  try {
    const { data, error } = await supabase.from('feeds').select('*');
    if (error) throw new Error('Error fetching feeds');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.post('/api/feeds', async (req, res) => {
  const { user_id, duration, notes } = req.body;
  const { data, error } = await supabase.from('feeds').insert([{ user_id, duration, notes }]);
  if (error) return res.status(500).json({ error: 'Error adding feed' });
  res.status(201).json(data);
});

server.put('/api/feeds/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, duration, notes } = req.body;
  const { data, error } = await supabase.from('feeds').update({ user_id, duration, notes }).eq('id', id);
  if (error) return res.status(500).json({ error: 'Error updating feed' });
  res.json(data);
});

server.delete('/api/feeds/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('feeds').delete().eq('id', id);
  if (error) return res.status(500).json({ error: 'Error deleting feed' });
  res.status(204).send(); // No content
});

server.get('/api/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error: 'Error fetching users' });
  res.json(data);
});

server.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabase.from('users').insert([{ name, email }]);
  if (error) return res.status(500).json({ error: 'Error adding user' });
  res.status(201).json(data);
});

server.get('/api/likes', async (req, res) => {
  const { data, error } = await supabase.from('image_votes').select('*');
  if (error) return res.status(500).json({ error: 'Error fetching likes' });
  res.json(data);
});

server.get('/proxy', (req, res) => {
  const url = req.query.url; 
  request({ url, method: 'GET' }).pipe(res);
});

server.get('/api/recipes', async (req, res) => {
  try {
    const { data, error } = await supabase.from('recipes').select('*');
    if (error) throw new Error('Error fetching recipes');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.post('/api/recipes', async (req, res) => {
  const { title, ingredients, instructions, author_id } = req.body;
  const { data, error } = await supabase.from('recipes').insert([{ title, ingredients, instructions, author_id }]);
  if (error) return res.status(500).json({ error: 'Error adding recipe' });
  res.status(201).json(data);
});

server.put('/api/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions } = req.body;
  const { data, error } = await supabase.from('recipes').update({ title, ingredients, instructions }).eq('id', id);
  if (error) return res.status(500).json({ error: 'Error updating recipe' });
  res.json(data);
});

server.delete('/api/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('recipes').delete().eq('id', id);
  if (error) return res.status(500).json({ error: 'Error deleting recipe' });
  res.status(204).send(); // No content
});

server.all('*', (req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 4001;
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});
