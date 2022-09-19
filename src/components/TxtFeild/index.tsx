import * as React from 'react';
import TextField from '@mui/material/TextField';

interface txtFeildProps{
  label: string;
  onChange?: any;
  value?: any;
}

const TxtField = (props:txtFeildProps) => {
  const {label, onChange, value }=props;
  return (
    <TextField id="outlined-basic" value={value} onChange={(e) => onChange(e)} sx={{ m: 1, minWidth: 400, maxWidth: 500 }} label={label} variant="outlined" />
  );
}

export default TxtField;