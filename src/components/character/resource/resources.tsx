'use client';

import {
  Box,
  Typography,
  SxProps, SvgIconProps, useTheme
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import DiamondIcon from '@mui/icons-material/Diamond';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import {Resource} from "@/components/character/resource/resource";
import {useCharacterContext} from "@/context/character/character-context";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";

type Props = {
  sx?: SxProps;
};

export function Resources({sx}: Props) {
  const character = useCharacterContext();
  const theme = useTheme();
  const isSmall = useBreakpointMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useBreakpointMediaQuery(theme.breakpoints.down("md"));

  const cardSize = !isSmall
    ? !isMedium
      ? 2 : 4
    : 6;

  const fate = character.character?.resources.fate.value ?? -1;
  const downtime = character.character?.resources.downtime.value ?? -1;

  const renderDiamondIcon = (props: SvgIconProps) => {
    return <DiamondIcon {...props}/>;
  };

  const renderBedtimeIcon = (props: SvgIconProps) => {
    return <BedtimeIcon {...props}/>;
  };

  return (
    <Box sx={sx}>
      <Typography
        variant="h5"
        component="h5"
      >
        Resources
      </Typography>

      <Grid container spacing={2} sx={{mt: 2}}>
        <Grid size={cardSize}>
          <Resource
            name="Fate"
            renderIcon={renderDiamondIcon}
            value={fate}
            onUpdate={(newValue: number) => character.updateFate(newValue)}
          />
        </Grid>

        <Grid size={cardSize}>
          <Resource
            name="Downtime"
            renderIcon={renderBedtimeIcon}
            value={downtime}
            onUpdate={(newValue: number) => character.updateDowntime(newValue)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

