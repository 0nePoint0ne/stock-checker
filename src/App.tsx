import React, { useEffect, useState } from 'react';
import StockList from './components/StockList';
import TxtField from './components/TxtFeild';
import Btn from './components/Btn';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LineChart from './components/LineChart';
import axios from 'axios';
import './App.css';
import { SliderValueLabelUnstyled } from '@mui/base';

interface StockList{
  ticker: string;
  name: string;
}


function App() {
  const [stockList, setStockList] = useState<StockList[]>([
    { ticker: "IBM", name: "International Business machines" }
  ]);

  const [state, setState] = useState({
    data: {},
    ticker: stockList[0].ticker,
  })

  const getData = (tickerCode: string) => {
    axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tickerCode}&interval=5min&apikey=demo`
    ).then(resp =>
      setState(prevState => (({...prevState,
      "timeSeries": Object.values(resp.data["Time Series (5min)"]), 
      "metaData": resp.data["Meta Data"],
      "labels": Object.keys(resp.data["Time Series (5min)"])
    }))));

    stockList.push({ticker: tickerCode, name: tickerCode})

  }

  const deleteItem = (value: string) => {
    setStockList( stockList.filter((stock)=> stock.ticker !== value))
  }

  useEffect(()=>{
    stockList.length > 0 && getData(stockList[0].ticker);
  },[])

  return (
    <div className="App">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100px"
      >
         <TxtField label="Stock Ticker" />
        <TxtField label="Stock Ticker" />
        <Btn onClick={getData} label="Add" color="success" />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <StockList onChange={(value:any) => setState(
          prevState => (({...prevState, ticker: value}))

        )} data={stockList} label="Stock List" />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          minHeight="300px"
        >
          <Btn onClick={() => deleteItem(state.ticker)} label="Delete" color="error" />
        </Box>
      </Box>
      <Box style={{width: "1000px", marginLeft:"auto", marginRight:"auto"}}>
        <Typography variant="h3" gutterBottom>
          {state.ticker  ? state.ticker : 'N/A'}
        </Typography>
        <LineChart data={state}/>
      </Box>
    </div>
  );
}

export default App;
