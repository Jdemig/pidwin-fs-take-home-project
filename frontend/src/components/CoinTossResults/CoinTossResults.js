import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { theme } from '../../themes/Default';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




const CoinTossResults = () => {
  const results = useSelector(state => state.user.results);

  return (
    <Box sx={{ pt: 3, pb: 3 }}>
      <Typography sx={{ mb: 4}} variant="h5">
        Results
      </Typography>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: theme.palette.primary.main }} >
            <TableRow>
              <StyledTableCell>Bet #</StyledTableCell>
              <StyledTableCell align="right">Bet Amount</StyledTableCell>
              <StyledTableCell align="right">Earnings</StyledTableCell>
              <StyledTableCell align="right">Guess</StyledTableCell>
              <StyledTableCell align="right">Result</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.length ? (
              <>
                {results.reverse().slice(0, 10).map((result, idx) => (
                  <StyledTableRow key={result.name}>
                    <StyledTableCell component="th" scope="row">
                      #{results.length - idx}
                    </StyledTableCell>
                    <StyledTableCell align="right">{result.amount} Pidz</StyledTableCell>
                    <StyledTableCell align="right">{result.winAmount} Pidz</StyledTableCell>
                    <StyledTableCell align="right">{result.guess}</StyledTableCell>
                    <StyledTableCell align="right">{result.coinTossResult}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </>
            ) : (
              <StyledTableRow sx={{ p: 3}}>
                <StyledTableCell type="h5" colSpan="5" sx={{ textAlign: 'center' }}>
                  <Typography type="h5">No results</Typography>
                </StyledTableCell>

              </StyledTableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CoinTossResults;
