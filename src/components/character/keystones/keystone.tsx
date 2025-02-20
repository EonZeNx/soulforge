'use client';

import {
  Box,
  Stack,
  Typography,
  SxProps, useTheme, Card, CardContent
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {CharacterTagCard} from "@/components/character/character-tag-card";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";
import {useCharacterContext} from "@/context/character/character-context";
import {keystones} from "@/data/v1/keystones";
import {KeystoneModal} from "@/components/character/keystones/keystone-modal";
import {ETagCategories} from "@/data/types";
import {tags} from "@/data/v1/tags";
import {SoulforgeCard} from "@/components/soulforge-card";

type Props = {
  sx?: SxProps;
};

export function Keystone({sx}: Props) {
  const character = useCharacterContext();
  const theme = useTheme();
  const isSmall = useBreakpointMediaQuery(theme.breakpoints.down("sm"));

  const cardSize = !isSmall ? 6 : 12;

  const keystone = keystones.find(a => a.id === character.character?.keystone.id);

  const title = (
    <Typography variant="h5" color="textPrimary">
      {(keystone?.name !== null && keystone?.name !== undefined) && (keystone.name ?? '').length !== 0
        ? keystone.name : "Keystone"}
    </Typography>
  );
  const subtitle = (
    (keystone?.name !== null && keystone?.name !== undefined) && (keystone.name ?? '').length !== 0
      ? (
        <Typography variant="body1" color="textSecondary">
          Keystone
        </Typography>
      ) : null
  );

  const tagInfo = (character.character?.keystone.tags ?? []).length !== 0
    ? (
      <>
        {character.character?.keystone.tags.map((a, i) => {
          const fullAbility = tags.find(v => v.id === a.id);
          if (fullAbility === undefined || fullAbility === null) {
            return null;
          }

          const isUltimate = fullAbility.categories.findIndex(c => c === ETagCategories.ULTIMATE) >= 0;

          return (
            <Grid size={isUltimate ? 12 : cardSize} key={`${i}-${a.id}`}>
              <CharacterTagCard
                ability={a}
                exhaustable={true}
                onSetExhaust={v => character.updateKeystoneAbility(a.id, {exhausted: v})}
                sx={{height: "100%"}}
              />
            </Grid>
          );
        })}
      </>
    )
    : (
      <Grid size={12}>
        <SoulforgeCard>
          <CardContent sx={{display: "flex", justifyContent: "center"}}>
            <Typography variant="body1" fontStyle="italic">No abilities found</Typography>
          </CardContent>
        </SoulforgeCard>
      </Grid>
    );

  return (
    <Box sx={sx}>
      <Stack justifyContent="space-between" direction="row">
        <Stack spacing={0}>
          {title}
          {subtitle}
        </Stack>

        <KeystoneModal/>
      </Stack>

      <Grid container spacing={2} sx={{mt: 2}}>
        {tagInfo}
      </Grid>
    </Box>
  );
}

