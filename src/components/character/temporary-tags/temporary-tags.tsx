'use client';

import {
  Box,
  Typography,
  SxProps, Button
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import {useCharacterContext} from "@/context/character/character-context";
import {TemporaryTagCard} from "@/components/character/temporary-tags/temporary-tags-card";

type Props = {
  sx?: SxProps;
};

export function TemporaryTags({sx}: Props) {
  const character = useCharacterContext();

  const updateTemporaryTag = (id?: number, stacks?: number) => {
    const safeId = id !== undefined && id !== null
      ? id : 0;
    const safeStacks = stacks !== undefined && stacks !== null
      ? stacks : 1;

    character.updateTemporaryTag(safeId, safeStacks);
  };

  const addButton = (
    <Button
      variant="outlined"
      startIcon={<AddIcon />}
      size="small"
      onClick={() => updateTemporaryTag()}
    >
      Add
    </Button>
  );

  const temporaryTagList = (
    <>
      {character.character?.temporary_tags.map((tt, i) => (
        <Grid size={12} key={`${i}-${tt.id}`}>
          <TemporaryTagCard
            reference={tt}
            sx={{height: "100%"}}
          />
        </Grid>
      ))}
    </>
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

