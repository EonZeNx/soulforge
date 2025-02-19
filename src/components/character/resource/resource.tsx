import {CardContent, IconButton, Stack, styled, SvgIconProps, Typography} from "@mui/material";
import {ReactNode} from "react";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {SoulforgeCard} from "@/components/soulforge-card";


const IncreaseIconButton = styled(IconButton)`
  color: ${p => p.theme.palette.mode === 'dark' ? p.theme.palette.info.light : p.theme.palette.info.light};
  transition: color 0.15s;

  &:hover {
    color: ${p => p.theme.palette.mode === 'dark' ? p.theme.palette.info.light : p.theme.palette.info.light};
  }
`;

const DecreaseIconButton = styled(IconButton)`
  color: ${p => p.theme.palette.mode === 'dark' ? p.theme.palette.warning.light : p.theme.palette.warning.main};
  transition: color 0.15s;
  
  &:hover {
    color: ${p => p.theme.palette.mode === 'dark' ? p.theme.palette.warning.light : p.theme.palette.warning.main};
  }
`;


type Props = {
  value: number;
  renderIcon: (props: SvgIconProps) => ReactNode;
  name: string;
  onUpdate: (newValue: number) => void;
};

export function Resource({ value, renderIcon, name, onUpdate }: Props) {
  const increase = () => onUpdate(value + 1);
  const decrease = () => onUpdate(value - 1);
  // const setValue = (newValue: number) => onUpdate(newValue);

  return (
    <SoulforgeCard sx={{height: "100%"}}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
        style={{paddingBottom: "16px"}}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <DecreaseIconButton onClick={() => decrease()}>
            <KeyboardDoubleArrowDownIcon/>
          </DecreaseIconButton>

          <Typography
            sx={{
              minWidth: "20px",
              textAlign: "center"
            }}
            variant="body1"
            fontWeight="bold"
          >
            {value}
          </Typography>

          <IncreaseIconButton onClick={() => increase()}>
            <KeyboardDoubleArrowUpIcon/>
          </IncreaseIconButton>
        </Stack>

        <Stack direction="row" spacing={1}>
          {renderIcon({})}
          <Typography
            variant="body1"
          >
            {name}
          </Typography>
        </Stack>
      </CardContent>
    </SoulforgeCard>
  );
}