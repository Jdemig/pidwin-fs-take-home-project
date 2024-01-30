import User from "../models/user.js";
import jwt from "jsonwebtoken";

const COIN_TOSS_RESULT = {
  heads: 'heads',
  tails: 'tails',
};



const coinToss = async (req, res) => {
  const { guess, amount } = req.body;

  if (amount === 0) {
    return res.status(400).json({ message: 'You must bet more than 0' });
  }

  try {
    let user = await User.findOne({ _id: req.userId });

    if (user.tokens < amount) {
      return res.status(400).json({ message: 'You do not have enough tokens to make this bet' });
    }

    // I know it's not truly random, but it should be fine - this isn't cryptography
    const randNum = Math.random();

    let coinTossResult = COIN_TOSS_RESULT.heads;
    if (randNum > 0.5) {
      coinTossResult = COIN_TOSS_RESULT.tails;
    }

    let winAmount = 0;
    // win condition
    if (coinTossResult === guess) {
      if (user.winStreak < 5) {
        winAmount = user.winStreak === 3 ? amount * 3 : amount;
        await User.updateOne({ _id: req.userId }, {
          $inc: {
            winStreak: 1,
            tokens: winAmount,
          }
        });
      } else {
        winAmount = amount * 10;
        await User.updateOne({ _id: req.userId }, {
          $set: {
            winStreak: 0,
          },
          $inc: {
            tokens: winAmount,
          }
        });
      }
    } else {
      winAmount = -1 * amount;
      await User.updateOne({ _id: req.userId }, {
        $set: {
          winStreak: 0,
        },
        $inc: {
          tokens: winAmount,
        },
      });
    }

    // fetch latest after updates
    user = await User.findOne({ _id: req.userId });

    let message = `Congrats you won ${winAmount} Pidz!`;
    if (winAmount < 0) {
      message = `Sorry you lost ${-1 * winAmount} Pidz`;
    }

    res.status(200).json({ winAmount, message, user, guess, coinTossResult, amount });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default coinToss;