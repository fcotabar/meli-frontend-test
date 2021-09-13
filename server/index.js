const express = require('express');
const cors = require('cors');
const app = express();

const { PORT } = require('./utils/config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const itemsRouter = require('./routes/items.routes');
app.use('/api/items', itemsRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
