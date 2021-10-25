import express from 'express';
import { PrismaClient } from '.prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: '*'
  })
);

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany({});

  res.json(tasks);
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(id)
      }
    });

    res.json(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post('/tasks', async (req, res) => {
  const { title, description, due, profile } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        due,
        profile: { connect: { id: profile } }
      }
    });

    res.json(newTask);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, due, profile } = req.body;

  try {
    const task = await prisma.task.update({
      data: {
        title,
        description,
        due,
        profile: { connect: { id: profile } }
      },
      where: {
        id: Number(id)
      }
    });

    res.json(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(id)
      }
    });

    res.json(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/profiles', async (req, res) => {
  const profiles = await prisma.profile.findMany({});

  res.json(profiles);
});

app.post('/profiles', async (req, res) => {
  const { name, imageLink } = req.body;
  try {
    const newProfile = await prisma.profile.create({
      data: {
        name,
        imageLink
      }
    });

    res.json(newProfile);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.delete('/profiles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await prisma.profile.delete({
      where: {
        id: Number(id)
      }
    });

    res.json(profile);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.put('/profiles/:id', async (req, res) => {
  const { id } = req.params;
  const { name, imageLink } = req.body;

  try {
    const profile = await prisma.profile.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        imageLink
      }
    });

    res.json(profile);
  } catch (e) {
    res.status(500).send(e);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
