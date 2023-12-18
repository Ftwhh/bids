const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Basic in-memory database for demonstration
const auctions = [
  { id: 1, title: 'Item 1', currentBid: 10 },
  { id: 2, title: 'Item 2', currentBid: 20 },
];

app.use(bodyParser.json());

app.use(express.static('public'));

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
