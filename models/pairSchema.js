const mongoose = require("mongoose");

// Define sub-schemas for tokens, websites, and socials
const tokenSchema = new mongoose.Schema({
  address: String,
  name: String,
  symbol: String,
});

const websiteSchema = new mongoose.Schema({
  label: String,
  url: String,
});

const socialSchema = new mongoose.Schema({
  type: String,
  url: String,
});

// Define sub-schemas for transactions, volume, price change, liquidity
const transactionsSchema = new mongoose.Schema({
  m5: { buys: Number, sells: Number },
  h1: { buys: Number, sells: Number },
  h6: { buys: Number, sells: Number },
  h24: { buys: Number, sells: Number },
});

const volumeSchema = new mongoose.Schema({
  h24: Number,
  h6: Number,
  h1: Number,
  m5: Number,
});

const priceChangeSchema = new mongoose.Schema({
  m5: Number,
  h1: Number,
  h6: Number,
  h24: Number,
});

const liquiditySchema = new mongoose.Schema({
  usd: Number,
  base: Number,
  quote: Number,
});

// Define the main Pair schema
const pairSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  schemaVersion: String,
  pairs: [
    {
      chainId: String,
      dexId: String,
      url: String,
      pairAddress: String,
      baseToken: tokenSchema,
      quoteToken: tokenSchema,
      priceNative: String,
      priceUsd: String,
      txns: transactionsSchema,
      volume: volumeSchema,
      priceChange: priceChangeSchema,
      liquidity: liquiditySchema,
      pairCreatedAt: Number,
      info: {
        imageUrl: String,
        websites: [websiteSchema],
        socials: [socialSchema],
      },
    },
  ],
});

// Create a mongoose model using the Pair schema
const Product = mongoose.model("Product", pairSchema);

module.exports = Product;
