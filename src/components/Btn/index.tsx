import * as React from 'react';
import Button from '@mui/material/Button';

interface txtFeildProps{
  onClick?: () => void;
  label: string;
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
}

const TxtField = (props:txtFeildProps) => {
  const {onClick, label, color}=props;
  return (
    <Button onClick={onClick} variant="contained" color={color}>
    {label}
    </Button>
  );
}

export default TxtField;
