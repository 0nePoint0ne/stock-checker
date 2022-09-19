import React, { useEffect, useState } from 'react';
import StockList from './components/StockList';
import TxtField from './components/TxtFeild';
import Btn from './components/Btn';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LineChart from './components/LineChart';
import axios from 'axios';
import './App.css';

interface StockList{
  ticker: string;
  name: string;
}


function App() {
  const [stockList, setStockList] = useState<StockList[]>([
    { ticker: "IBM", name: "International Business machines" }
  ]);

  const [data, setData] = useState({});
  
  const [ticker, setTicker] = useState('IBM');

  const getData = (tickerCode: string) => {
    axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tickerCode}&interval=5min&apikey=demo`
    ).then(resp =>
      setData({
      "timeSeries": Object.values(resp.data["Time Series (5min)"]), 
      "metaData": resp.data["Meta Data"],
      "labels": Object.keys(resp.data["Time Series (5min)"])
    }));
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
        <Btn onClick={getData} label="Add" color="success" />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <StockList onChange={(value:any) => setTicker(value)} data={stockList} label="Stock List" />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          minHeight="300px"
        >
          <Btn onClick={() => deleteItem(ticker)} label="Delete" color="error" />
        </Box>
      </Box>
      <Box>
        <Typography variant="h3" gutterBottom>
          {ticker  ? ticker : 'N/A'}
        </Typography>
        <LineChart data={data}/>
      </Box>
    </div>
  );
}

export default App;
