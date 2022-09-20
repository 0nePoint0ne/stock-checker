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
  const parseStockList = (stockListData: any) => {
    if(typeof localStorage.getItem('stocks') === 'string'){
      // @ts-ignore`
      return JSON.parse(localStorage.getItem('stocks'))
    }
  }

  const [stockList, setStockList] = useState<StockList[]>( 
    localStorage.getItem('stocks') ? parseStockList(localStorage.getItem('stocks')) : []
    );

  const [state, setState] = useState({
    data: {},
    metaData: null,
    timeSeries: [],
    ticker: stockList.length > 0 ? stockList[0].ticker : null,
    apiKey: "demo"
  })

  const getData = (tickerCode: string | null, userKey: string) => {
    if(tickerCode && userKey){
    axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tickerCode}&interval=5min&apikey=${userKey}`
    ).then(resp =>
      setState(prevState => (({...prevState,
      "timeSeries": Object.values(resp.data["Time Series (5min)"]), 
      "metaData": resp.data["Meta Data"],
      "labels": Object.keys(resp.data["Time Series (5min)"])
    }))));
    if(stockList.findIndex((stock) => stock.ticker === tickerCode) < 0)
    {
      stockList.push({ticker: tickerCode, name: tickerCode})
      localStorage.setItem('stocks', JSON.stringify(stockList))
    }
  }
  }
  const deleteItem = (value: string | null) => {
    if(value)
    setStockList( stockList.filter((stock)=> stock.ticker !== value))
  }

  useEffect(()=>{
    // stockList.length > 0 && getData(stockList[0].ticker, state.apiKey);
  },[])

  return (
    <div className="App">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100px"
      >
        <TxtField value={state.apiKey} onChange={(e:any) => setState(prevState => (({...prevState, apiKey: e.target.value})))} label="API KEY" />
        <TxtField onChange={(e:any) => setState(prevState => (({...prevState, ticker: e.target.value})))} label="Stock Ticker" />
        <Btn label="Add" onClick={()=>getData(state.ticker, state.apiKey)} color="success" />
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
          <Btn onClick={()=>getData(state.ticker, state.apiKey)} label="View" color="primary" />
          <Btn onClick={() => deleteItem(state.ticker)} label="Delete" color="error" />
        </Box>
      </Box>
      <Box style={{width: "1000px", marginLeft:"auto", marginRight:"auto"}}>
        <Typography variant="h3" gutterBottom>
          {state.metaData ? state.metaData['2. Symbol']: 'N/A'}
        </Typography>
        <LineChart data={state}/>
      </Box>
    </div>
  );
}

export default App;
