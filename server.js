require('dotenv').config();
import express from 'express';
import next from 'next';
import cors from 'cors';
import path from 'path';
import bodyParser from require('body-parser');
import likesRoutes from './api/routes/likesRoutes'; 
import feedsRoutes from './api/routes/feedsRoutes'; 
import usersRoutes from './api/routes/usersRoutes';
import recipesRoutes from './api/routes/recipesRoutes';
import notesRoutes from './src/api/routes/notesRoutes';
import postsRoutes from './src/api/routes/postsRoutes';
import { supabase } from './supabaseClient';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const server = express();

server.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

server.use(cors({
  origin: [
    'http://localhost:4001/api/', 
    'https://breastfeeding-frontend.vercel.app' 
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
server.use('/api/notes', notesRoutes);
server.use('/api/posts', postsRouter); 

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
  res.status(204).send(); 
});

server.all('*', (req, res) => {
  return handle(req, res);
});

server.get('/api/notes', async (req, res) => {
  try {
    const { data, error } = await supabase.from('notes').select('*');
    if (error) throw new Error('Error fetching notes');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.post('/api/notes', async (req, res) => {
  const { user_id, content } = req.body;
  const { data, error } = await supabase.from('notes').insert([{ user_id, content }]);
  if (error) return res.status(500).json({ error: 'Error adding note' });
  res.status(201).json(data);
});

server.put('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, content } = req.body; 
  const { data, error } = await supabase.from('notes').update({ user_id, content }).eq('id', id);
  if (error) return res.status(500).json({ error: 'Error updating note' });
  res.json(data);
});

server.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (error) return res.status(500).json({ error: 'Error deleting note' });
  res.status(204).send(); // No content
});

server.get('/api/posts', async (req, res) => {
  try {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) throw new Error('Error fetching posts');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.post('/api/posts', async (req, res) => {
  const { user_id, title, content } = req.body; 
  const { data, error } = await supabase.from('posts').insert([{ user_id, title, content }]);
  if (error) return res.status(500).json({ error: 'Error adding post' });
  res.status(201).json(data);
});

server.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, title, content } = req.body; 
  const { data, error } = await supabase.from('posts').update({ user_id, title, content }).eq('id', id);
  if (error) return res.status(500).json({ error: 'Error updating post' });
  res.json(data);
});

server.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) return res.status(500).json({ error: 'Error deleting post' });
  res.status(204).send(); 
});

const PORT = process.env.PORT || 4001;
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});