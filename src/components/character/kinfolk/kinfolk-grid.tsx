'use client';

import {Box, Button, Card, CardContent, SxProps, Typography, useTheme} from "@mui/material";
import {Kinfolk} from "@/data/types";
import Grid from "@mui/material/Grid2";
import {TagCard} from "@/components/character/tag-card";
import {useCharacterContext} from "@/context/character/character-context";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";
import {tags} from "@/data/v1/tags";

type Props = {
  kinfolk: Kinfolk;
  onSelect: VoidFunction;
  sx?: SxProps;
};

export function KinfolkGrid({kinfolk, onSelect, sx}: Props) {
  const characterData = useCharacterContext();

  const theme = useTheme();
  const isSmall = useBreakpointMediaQuery(theme.breakpoints.down("sm"));

  const cardSize = !isSmall ? 6 : 12;

  let abilityInfo = (
    <Grid size={12}>
      <Card>
        <CardContent sx={{display: "flex", justifyContent: "center"}}>
          <Typography variant="h6" fontStyle="italic">No abilities found</Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  if ((kinfolk.tags ?? []).length !== 0) {
    const kinfolkTags = kinfolk.tags;

    abilityInfo = (
      <>
        {kinfolkTags.map((a, i) => {
          const fullAbility = tags.find(v => v.id === a.id);
          if (fullAbility === undefined || fullAbility === null) {
            return null;
          }

          return (
            <Grid size={cardSize} key={`${i}-${a.id}`}>
              <TagCard
                id={a.id}
                sx={{height: "100%"}}
              />
            </Grid>
          );
        })}
      </>
    );
  }

  const onSelectButtonPressed = () => {
    characterData.updateKinfolk(kinfolk.id);
    onSelect();
  };

  const selectButton = (
    <Button variant="contained" onClick={() => onSelectButtonPressed()}>
      Select All
    </Button>
  );

  return (
    <Grid container spacing={2} sx={sx}>
      <Grid size={12}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">{kinfolk.name}</Typography>
          {selectButton}
        </Box>
      </Grid>


      {abilityInfo}
    </Grid>
  );
}

