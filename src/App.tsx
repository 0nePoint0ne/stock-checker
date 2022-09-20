import React, { useEffect, useState } from 'react';
import StockList from './components/StockList';
import TxtField from './components/TxtFeild';
import Btn from './components/Btn';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LineChart from './components/LineChart';
import axios from 'axios';
import './App.css';

interface Stock {
  ticker: string;
  name: string;
}


function App() {
  const parseStockList = (stockListData: any) => {
    if (typeof stockListData === 'string') {
      // @ts-ignore`
      return JSON.parse(stockListData)
    }
  }

    const [state, setState] = useState({
      data: {},
      companyName: '',
      metaData: null,
      timeSeries: [],
      stockList: localStorage.getItem('stocks') ? parseStockList(localStorage.getItem('stocks')) : [],
      ticker: localStorage.getItem('stocks') ? parseStockList(localStorage.getItem('stocks')) : null,
      apiKey: "demo"
    })

    const getData = (tickerCode: string | null, companyName: string, userKey: string) => {
      if (tickerCode && userKey) {
        axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tickerCode}&interval=5min&apikey=${userKey}`
        ).then(resp =>
          setState(prevState => (({
            ...prevState,
            "timeSeries": Object.values(resp.data["Time Series (5min)"]),
            "metaData": resp.data["Meta Data"],
            "labels": Object.keys(resp.data["Time Series (5min)"])
          }))));
        if (state.stockList.findIndex((stock: Stock) => stock.ticker === tickerCode) < 0) {
          let tmpArray = state.stockList;
          tmpArray.push({ ticker: tickerCode, name: companyName })
          setState(prevState => ({ ...prevState, stockList: [...tmpArray] }));
          localStorage.setItem('stocks', JSON.stringify(tmpArray))
        }
      }
    }

    const deleteStock = (stockTicker: string | null) => {
      if (stockTicker)
        setState(prevState => ({ ...prevState, stockList: prevState.stockList.filter((stock: Stock) => stock.ticker !== stockTicker) }))
    }

    const updateStock = (stockTicker: string | null, values: Stock[], companyName: string) => {
      let index = state.stockList.findIndex((stock: Stock) => stock.ticker === stockTicker);
      let tmpArray = values;
      tmpArray[index] = { ...values[index], name: companyName };
      setState(prevState => ({ ...prevState, stockList: [...tmpArray] }));
      localStorage.setItem('stocks', JSON.stringify(tmpArray))
    }

    const selectStock = (stockTicker: any) => {

      setState(prevState => (
        {
          ...prevState,
          ticker: stockTicker,
          // @ts-ignore
          companyName: state.stockList.find((stock: Stock) => stock.ticker === stockTicker).name
        }))
    }

    useEffect(() => {
      // stockList.length > 0 && getData(stockList[0].ticker, state.apiKey);
    }, [])

    return (
      <div className="App">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100px"
        >
          <TxtField value={state.apiKey} onChange={(e: any) => setState(prevState => (({ ...prevState, apiKey: e.target.value })))} label="API KEY" />
          <TxtField value={state.ticker} onChange={(e: any) => setState(prevState => (({ ...prevState, ticker: e.target.value })))} label="Stock Ticker" />
          <TxtField value={state.companyName} onChange={(e: any) => setState(prevState => (({ ...prevState, companyName: e.target.value })))} label="Company Name" />
          <Btn label="Add" onClick={() => getData(state.ticker, state.companyName, state.apiKey)} color="success" />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <StockList onChange={selectStock} data={state.stockList} label="Stock List" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            minHeight="300px"
          >
            <Btn onClick={() => getData(state.ticker, state.companyName, state.apiKey)} label="View" color="primary" />
            <Btn onClick={() => updateStock(state.ticker, state.stockList, state.companyName)} label="Edit" color="warning" />
            <Btn onClick={() => deleteStock(state.ticker)} label="Delete" color="error" />
          </Box>
        </Box>
        <Box style={{ width: "1000px", marginLeft: "auto", marginRight: "auto" }}>
          <Typography variant="h3" gutterBottom>
            {state.metaData ? state.metaData['2. Symbol'] : 'N/A'}
          </Typography>
          <LineChart data={state} />
        </Box>
      </div>
    );
  }

  export default App;
