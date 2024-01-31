import React from "react";
import { Box, Container, Grow, Paper, Typography } from "@mui/material";
import CoinToss from "../CoinToss/CoinToss";
import { useSelector } from "react-redux";
import CoinTossResults from "../CoinTossResults/CoinTossResults";

const Home = () => {
  const user = useSelector(state => state.user.user);
  const isLoggedIn = !!user;

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        {isLoggedIn ? (
          <>
            <Paper elevation={3}>
              <Box sx={{ px: 3 }}>
                <CoinToss />
              </Box>
            </Paper>



            <Paper sx={{ mt: 4, mb: 4 }} elevation={3}>
              <Box sx={{ px: 3 }}>
                <CoinTossResults />
              </Box>
            </Paper>
          </>
        ) : (
          <Paper elevation={3}>
            <Box sx={{ pt: 3, pb: 3}}>
              <Typography variant="h4" align="center">
                Login to Play
              </Typography>
            </Box>
          </Paper>
        )}

      </Container>
    </Grow>
  );
};

export default Home;
