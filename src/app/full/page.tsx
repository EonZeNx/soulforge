'use client';

import {Lore} from "@/components/character/lore";
import {Keystone} from "@/components/character/keystones/keystone";
import {Archetype} from "@/components/character/archetypes/archetype";
import {Kinfolk} from "@/components/character/kinfolk/kinfolk";
import {TemporaryTags} from "@/components/character/temporary_tags";
import {Afflictions} from "@/components/character/afflictions";
import {Resources} from "@/components/character/resource/resources";
import {CharacterProvider} from "@/context/character/character-provider";
import {Box, Stack, useTheme} from "@mui/material";
import {MainHeader} from "@/components/main/main-header";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";
import Grid from "@mui/material/Grid2";

export default function Full() {
  const theme = useTheme();
  const isSmall = useBreakpointMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CharacterProvider>
      <main style={{maxWidth: "100%", margin: theme.spacing(2), display: "flex", justifyContent: "center"}}>
        <Box sx={{maxWidth: isSmall ? "100%" : "1000px"}}>
          <MainHeader isSmall={isSmall}/>

          <Stack spacing={2} sx={{mt: 4}}>
            <Lore/>
            <Resources/>
            <Keystone/>
            <Archetype/>
            <Kinfolk/>

            <Grid container spacing={2}>
              <Grid size={6}>
                <TemporaryTags/>
              </Grid>

              <Grid size={6}>
                <Afflictions/>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </main>
    </CharacterProvider>
  );
}
