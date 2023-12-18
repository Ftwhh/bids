const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Simple in-memory storage for users and auctions
const users = [];
const auctions = [
  { id: 1, title: 'Item 1', currentBid: 10, createdBy: 'user1' },
  { id: 2, title: 'Item 2', currentBid: 20, createdBy: 'user2' },
];

app.use(bodyParser.json());

app.use(express.static('public'));

// User authentication middleware
app.use((req, res, next) => {
  const { token } = req.headers;

  if (!token || !users.some(user => user.token === token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
});

app.get('/api/auctions', (req, res) => {
  res.json(auctions);
});

app.post('/api/place-bid/:id', (req, res) => {
  const { id } = req.params;
  const { bidAmount } = req.body;

  const auction = auctions.find(item => item.id === parseInt(id));
  if (!auction) {
    return res.status(404).json({ error: 'Auction not found' });
  }

  if (isNaN(bidAmount) || bidAmount <= auction.currentBid) {
    return res.status(400).json({ error: 'Invalid bid amount' });
  }

  auction.currentBid = bidAmount;
  res.json({ success: true, message: 'Bid placed successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
