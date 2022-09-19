import * as React from 'react';
import TextField from '@mui/material/TextField';

interface txtFeildProps{
  label: string;
}

const TxtField = (props:txtFeildProps) => {
  const {label}=props;
  return (
    <TextField id="outlined-basic"  sx={{ m: 1, minWidth: 400, maxWidth: 500 }} label={label} variant="outlined" />
  );
}

export default TxtField;