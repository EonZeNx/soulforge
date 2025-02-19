'use client';

import {
  Box,
  Stack,
  Typography,
  CardContent,
  SxProps, useTheme
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {KinfolkModal} from "@/components/character/kinfolk/kinfolk-modal";
import {useCharacterContext} from "@/context/character/character-context";
import {SoulforgeCard} from "@/components/soulforge-card";
import {CharacterTagCard} from "@/components/character/character-tag-card";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";

type Props = {
  sx?: SxProps;
};

export function Kinfolk({sx}: Props) {
  const character = useCharacterContext();
  const theme = useTheme();
  const isSmall = useBreakpointMediaQuery(theme.breakpoints.down("sm"));

  const cardSize = !isSmall ? 4 : 12;

  const abilityInfo = (character.character?.kinfolk.tags ?? []).length !== 0
    ? (
      <>
        {character.character?.kinfolk.tags.map((a, i) => (
          <Grid size={cardSize} key={`${i}-${a.id}`}>
            <CharacterTagCard
              ability={a}
              onSetExhaust={v => character.updateKinfolkAbility(a.id, {exhausted: v})}
              sx={{height: "100%"}}
            />
          </Grid>
        ))}
      </>
    )
    : (
      <Grid size={12}>
        <SoulforgeCard>
          <CardContent sx={{display: "flex", justifyContent: "center"}}>
            <Typography variant="h6" fontStyle="italic">No abilities found</Typography>
          </CardContent>
        </SoulforgeCard>
      </Grid>
    );

  return (
    <Box sx={sx}>
      <Stack justifyContent="space-between" direction="row">
        <Typography
          variant="h5"
          component="h5"
        >
          Kinfolk
        </Typography>

        <KinfolkModal/>
      </Stack>

      <Grid container spacing={2} sx={{mt: 2}}>
        {abilityInfo}
      </Grid>
    </Box>
  );
}

