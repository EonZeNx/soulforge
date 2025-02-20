'use client';

import {
  Box,
  Typography,
  SxProps, Button, CardContent
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import {useCharacterContext} from "@/context/character/character-context";
import {TemporaryTagCard} from "@/components/character/temporary-tags/temporary-tags-card";
import {SoulforgeCard} from "@/components/soulforge-card";

type Props = {
  sx?: SxProps;
};

export function TemporaryTags({sx}: Props) {
  const character = useCharacterContext();

  const addTemporaryTag = () => {
    character.addTemporaryTag({
      data: {name: ""},
      stacks: 1
    });
  };

  const addButton = (
    <Button
      variant="outlined"
      startIcon={<AddIcon />}
      size="small"
      onClick={() => addTemporaryTag()}
    >
      Add
    </Button>
  );

  const temporaryTagList = (character.character?.temporary_tags ?? []).length !== 0
    ? (
      <>
        {character.character?.temporary_tags.map((tt, i) => (
          <Grid size={12} key={i}>
            <TemporaryTagCard
              temporaryTag={tt}
              index={i}
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
            <Typography variant="body1" fontStyle="italic">No tags found</Typography>
          </CardContent>
        </SoulforgeCard>
      </Grid>
    );

  return (
    <Box sx={sx}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Temporary Tags</Typography>
        {addButton}
      </Box>

      <Grid container spacing={2} sx={{mt: 2}}>
        {temporaryTagList}
      </Grid>
    </Box>
  );
}

