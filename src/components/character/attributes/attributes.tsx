'use client';

import {
  Box,
  Typography,
  SxProps, useTheme
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {AttributeCard} from "@/components/character/attributes/attribute-card";
import {useCharacterContext} from "@/context/character/character-context";
import {isNull} from "@/libraries/general";
import {attributes} from "@/data/v1/attributes";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";

type Props = {
  sx?: SxProps;
};

export function Attributes({sx}: Props) {
  const character = useCharacterContext();
  const theme = useTheme();
  const isSmall = useBreakpointMediaQuery(theme.breakpoints.down("sm"));

  const updateAttributeValue = (id: number, value: number) => {
    character.updateAttributeValue(id, value);
  }

  const updateAttributeFlow = (id: number, flow: number) => {
    character.updateAttributeFlow(id, flow);
  }

  const smallGridLayout = (<>
    {character.character?.attributes.map((a, i) => {
      const fullAttribute = attributes.find(v => v.id === a.id);
      if (isNull(fullAttribute)) {
        return null;
      }

      return (
        <Grid key={i} size={6}>
          <AttributeCard
            name={fullAttribute?.name ?? "failed"}
            attributeValue={a.value}
            onAttributeChange={v => updateAttributeValue(a.id, v)}
            flowValue={a.flow ?? 0}
            onFlowValue={f => updateAttributeFlow(a.id, f)}
            flexDirection="column"
          />
        </Grid>
      );
    })}
  </>);

  const largeGridLayout = (<>
    {character.character?.attributes.map((a, i) => {
      const fullAttribute = attributes.find(v => v.id === a.id);
      if (isNull(fullAttribute)) {
        return null;
      }

      return (
        <Grid key={i} size={3}>
          <AttributeCard
            name={fullAttribute?.name ?? "failed"}
            attributeValue={a.value}
            onAttributeChange={v => updateAttributeValue(a.id, v)}
            flowValue={a.flow ?? 0}
            onFlowValue={f => updateAttributeFlow(a.id, f)}
          />
        </Grid>
      );
    })}
  </>);

  return (
    <Box sx={sx}>
      <Typography
        variant="h5"
        component="h5"
      >
        Attributes
      </Typography>

      <Grid container spacing={2}>
        {!isSmall ? largeGridLayout : smallGridLayout}
      </Grid>
    </Box>
  );
}

