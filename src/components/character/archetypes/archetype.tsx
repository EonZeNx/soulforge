'use client';

import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  SxProps, useTheme
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {ArchetypeModal} from "@/components/character/archetypes/archetype-modal";
import {useCharacterContext} from "@/context/character/character-context";
import {archetypes} from "@/data/v1/archetypes";
import {CharacterTagCard} from "@/components/character/character-tag-card";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";

type Props = {
  sx?: SxProps;
};

export function Archetype({sx}: Props) {
  const character = useCharacterContext();
  const theme = useTheme();
  const isSmall = useBreakpointMediaQuery(theme.breakpoints.down("sm"));

  const cardSize = !isSmall ? 4 : 12;

  const archetype = archetypes.find(a => a.id === character.character?.archetype.id);

  const title = (
    <Typography variant="h5" color="textPrimary">
      {(archetype?.name !== null && archetype?.name !== undefined) && (archetype.name ?? '').length !== 0
        ? archetype.name : "Archetype"}
    </Typography>
  );
  const subtitle = (
    (archetype?.name !== null && archetype?.name !== undefined) && (archetype.name ?? '').length !== 0
      ? (
        <Typography variant="body1" color="textSecondary">
          Archetype
        </Typography>
      ) : null
  );

  const abilityInfo = (character.character?.archetype.tags ?? []).length !== 0
    ? (
      <>
        {character.character?.archetype.tags.map((a, i) => (
          <Grid size={cardSize} key={`${i}-${a.id}`}>
            <CharacterTagCard
              ability={a}
              onSetExhaust={v => character.updateArchetypeAbility(a.id, {exhausted: v})}
              sx={{height: "100%"}}
            />
          </Grid>
        ))}
      </>
    )
    : (
      <Grid size={12}>
        <Card>
          <CardContent sx={{display: "flex", justifyContent: "center"}}>
            <Typography variant="h6" fontStyle="italic">No abilities found</Typography>
          </CardContent>
        </Card>
      </Grid>
    );


  return (
    <Box sx={sx}>
      <Stack justifyContent="space-between" direction="row">
        <Stack spacing={0}>
          {title}
          {subtitle}
        </Stack>

        <ArchetypeModal/>
      </Stack>

      <Grid container spacing={2} sx={{mt: 2}}>
        {abilityInfo}
      </Grid>
    </Box>
  );
}

