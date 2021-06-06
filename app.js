const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const path = require('path');

const app = express();
app.use(express.json({extended: true}));

app.use('/api/auth', require('./server/routes/Auth/auth.routes'));
app.use('/api/category', require('./server/routes/Catalog/category.routes'));
app.use('/api/subcategory', require('./server/routes/Catalog/subcategory.routes'));
app.use('/api/article', require('./server/routes/Catalog/article.routes'));
app.use('/api/nodemail', require('./server/routes/NodeMail/nodemail.routes'));



if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));

    } catch(e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
