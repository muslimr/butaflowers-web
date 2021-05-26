const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const path = require('path');
const multer = require('multer');
// const path = require('path');



const app = express();
app.use(express.json({extended: true}));

// app.use('/uploads', express.static('upload'));
// app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/category', require('./routes/category.routes'));
app.use('/api/subcategory', require('./routes/subcategory.routes'));
app.use('/api/article', require('./routes/article.routes'));



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
