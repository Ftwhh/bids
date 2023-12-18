document.addEventListener('DOMContentLoaded', async function () {
  const auctionListContainer = document.getElementById('auctionList');
  const auctions = await fetchAuctions();

  auctions.forEach(auction => {
    const auctionItem = createAuctionItem(auction);
    auctionListContainer.appendChild(auctionItem);
  });
});

async function fetchAuctions() {
  const response = await fetch('http://localhost:3000/api/auctions');
  const auctions = await response.json();
  return auctions;
}

function createAuctionItem(auction) {
  const itemDiv = document.createElement('div');
  itemDiv.innerHTML = `
    <h3>${auction.title}</h3>
    <p>Current Bid: $${auction.currentBid}</p>
    <input type="number" placeholder="Enter bid amount" id="bidInput${auction.id}" />
    <button onclick="placeBid(${auction.id})">Place Bid</button>
  `;
  return itemDiv;
}

async function placeBid(auctionId) {
  const bidAmount = document.getElementById(`bidInput${auctionId}`).value;
  const response = await fetch(`http://localhost:3000/api/place-bid/${auctionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bidAmount: parseFloat(bidAmount) }),
  });

  const result = await response.json();
  if (result.success) {
    // Update the UI or take other actions as needed
    console.log('Bid placed successfully');
  } else {
    console.error(result.error);
  }
}
