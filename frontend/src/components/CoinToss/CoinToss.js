import React, { useState } from "react";
import {Box, Button, Container, Typography} from "@mui/material";
import Input from "../Login/Input";
import {styles} from "../Login/styles";
import {useDispatch} from "react-redux";
import {coinToss} from "../../actions/user";


const GUESS_TYPE = {
  heads: 'heads',
  tails: 'tails',
};


const formDataInitVal = {
  guess: GUESS_TYPE.heads,
  amount: 0,
};

const CoinToss = () => {
  const [formData, setFormData] = useState(formDataInitVal);

  const dispatch = useDispatch();

  const handleAmountChange = (e) => {
    setFormData({ ...formData, amount: e.target.value });
  };

  const onCoinPick = (value) => {
    setFormData({ ...formData, guess: value });
  }

  const onFlipCoin = () => {
    dispatch(coinToss(formData));
  }

  return (
    <Box sx={{ pt: 3, pb: 3 }}>
      <Typography sx={{ mb: 4}} variant="h5">
        How much would you like to wager?
      </Typography>

      <Input
        name="amount"
        label="Amount"
        handleChange={handleAmountChange}
        value={formData.amount}
        autoFocus
        half
      />

      <Typography sx={{ mb: 3, mt: 3 }} variant="h5">
        Do you think it will be heads or tails?
      </Typography>

      <Box sx={{ display: 'flex' }}>
        <Button
          sx={{ mr: 2 }}
          variant="contained"
          color={formData.guess === GUESS_TYPE.heads ? "primary" : "grey"}
          onClick={() => onCoinPick(GUESS_TYPE.heads)}
        >
          Heads
        </Button>

        <Button
          variant="contained"
          color={formData.guess === GUESS_TYPE.tails ? "primary" : "grey"}
          onClick={() => onCoinPick(GUESS_TYPE.tails)}
        >
          Tails
        </Button>
      </Box>


      <Button
        sx={styles.submit}
        fullWidth
        variant="contained"
        color="primary"
        onClick={onFlipCoin}
      >
        Flip Coin
      </Button>
    </Box>
  );
};

export default CoinToss;
