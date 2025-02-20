import {FormControl, FormControlProps, InputLabel, MenuItem, Select, SxProps} from "@mui/material";

type Props = {
  value: number;
  onChange: (value: number) => void;
  dieSizes: number[];
  formControlSx?: SxProps;
  label?: string;
  size?: 'small' | 'medium';
  color?: FormControlProps['color'];
};

export function DieSizeSelector({value, onChange, dieSizes, label, size, color, formControlSx}: Props) {
  return (
    <FormControl size={size} sx={formControlSx} color={color}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        variant="outlined"
        size={size}
        value={value}
        fullWidth
        onChange={e => onChange(typeof e.target.value === 'string'
          ? parseInt(e.target.value, 10) : e.target.value)}
      >
        <MenuItem value={0}>-</MenuItem>
        {dieSizes.map(ds => (
          <MenuItem key={ds} value={ds}>d{ds}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
