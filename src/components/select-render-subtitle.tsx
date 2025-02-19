import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";


type Props = {
  label: string;
  value: number;
  updateValue: (value: number) => void;
  valueList: {id: number; name: string; description?: string}[];
};

export function SelectRenderSubtitle({label, value, updateValue, valueList}: Props) {
  const renderValue = (value: number) => {
    const object = valueList.find(a => a.id === value);
    if (object !== undefined) {
      return object.name;
    }

    return value;
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        variant="outlined"
        value={value}
        renderValue={renderValue}
        onChange={e => updateValue(typeof e.target.value === 'string' ? parseInt(e.target.value, 10) : e.target.value)}
      >
        <MenuItem value="-1">Custom</MenuItem>
        {valueList.map(a => (
          <MenuItem
            key={a.id}
            value={a.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start"
            }}
          >
            <Typography
              variant="body1"
              color="textPrimary"
            >
              {a.name}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
            >
              {a.description}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}