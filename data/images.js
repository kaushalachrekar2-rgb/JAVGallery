// images.js - Picture Collection Data

const pictureCollection = Array.from({length: 20}, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/400/400?random=${i + 100}`,
    title: `Image ${i + 1}`,
    category: ['Nature', 'Urban', 'Portrait', 'Abstract'][Math.floor(Math.random() * 4)]
}));
