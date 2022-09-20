import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


interface StockListProps{
  data: {ticker: string, name: string}[],
  label: string;
  onChange: any;
}

const StockList = (props: StockListProps) => {
  const {data, label, onChange} = props;
  const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  };

  return (
        <div>
          <FormControl sx={{ m: 1, minWidth: 400, maxWidth: 500 }}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Native
            </InputLabel>
            <Select
              multiple
              native
              // @ts-ignore Typings are not considering `native`
              onChange={handleChangeMultiple}
              label={label}
              inputProps={{
                id: 'select-multiple-native',
              }}
            >
              {data.map((item, index) => { 
                const {ticker, name} = item;
                return (
                <option key={index} value={ticker}>
                  {`${name} ${ticker}`}
                </option>
              )})}
            </Select>
          </FormControl>
        </div>
  );
}

export default StockList;