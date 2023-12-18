const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/auctions', (req, res) => {
  // Implement backend logic to fetch auctions from the database
  const auctions = [
    { id: 1, title: 'Item 1', currentBid: 10 },
    { id: 2, title: 'Item 2', currentBid: 20 },
    // Add more auction items as needed
  ];
  res.json(auctions);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

