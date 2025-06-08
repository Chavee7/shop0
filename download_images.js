const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        filename: 'white-tshirt.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
        filename: 'hoodie.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1',
        filename: 'summer-dress.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
        filename: 'kids-jacket.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
        filename: 'jeans.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1604575396136-79d175778d1d',
        filename: 'blouse.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8',
        filename: 'kids-tshirt.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
        filename: 'winter-jacket.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
        filename: 'hero-bg.jpg'
    }
];

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const filepath = path.join(__dirname, 'images', 'products', filename);
        const file = fs.createWriteStream(filepath);

        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
};

// Create directories if they don't exist
const dirs = ['images', 'images/products'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});

// Download all images
Promise.all(images.map(img => downloadImage(img.url, img.filename)))
    .then(() => console.log('All images downloaded successfully!'))
    .catch(err => console.error('Error downloading images:', err)); 