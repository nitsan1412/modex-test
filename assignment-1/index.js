function maxProfitK(prices, k) {

  if (!prices || prices.length === 0 || k <= 0) return 0;

  const table = new Array(k + 1).fill(0).map(() => new Array(prices.length).fill(0));

  for (let i = 0; i <= k; i++) {
    table[i][0] = 0;
  }

  for (let i = 1; i <= k; i++) {
    let maxDiff = -prices[0]; 
    for (let j = 1; j < prices.length; j++) {
      table[i][j] = Math.max(table[i][j - 1], prices[j] + maxDiff);
      maxDiff = Math.max(maxDiff, table[i - 1][j - 1] - prices[j]);
    }
  }

  return table[k][prices.length - 1];
}

const prices = [1, 5, 3, 6, 9];
const k = 2;

const maxProfit = maxProfitK(prices, k);
console.log("Max profit:", maxProfit);
