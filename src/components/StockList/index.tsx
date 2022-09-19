import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AmdDependency } from 'typescript';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

interface StockListProps{
  data: {ticker: string, name: string}[],
  label: string;
  onChange: any;
}

const StockList = (props: StockListProps) => {
  const {data, label, onChange} = props;
 
  const [personName, setPersonName] = React.useState < string[] > ([]);
  const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {

    onChange('IBM')
    // const { options } = event.target;
    // const value: string[] = [];
    // for (let i = 0, l = options.length; i < l; i += 1) {
    //   if (options[i].selected) {
    //     value.push(options[i].value);
    //   }
    // }
    // setPersonName(value);
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
              value={personName}
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