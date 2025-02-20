'use client';

import {
  Box,
  Typography,
  SxProps, Button, CardContent
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {useCharacterContext} from "@/context/character/character-context";
import AddIcon from "@mui/icons-material/Add";
import {AfflictionsCard} from "@/components/character/afflictions/afflictions-card";
import {SoulforgeCard} from "@/components/soulforge-card";

type Props = {
  sx?: SxProps;
};

export function Afflictions({sx}: Props) {
  const character = useCharacterContext();

  const addAffliction = () => {
    character.addAffliction({
      data: {name: ""},
    });
  };

  const addButton = (
    <Button
      variant="outlined"
      startIcon={<AddIcon />}
      size="small"
      onClick={() => addAffliction()}
    >
      Add
    </Button>
  );

  const afflictionsList = (character.character?.afflictions ?? []).length !== 0
    ? (
      <>
        {character.character?.afflictions.map((a, i) => (
          <Grid size={12} key={i}>
            <AfflictionsCard
              affliction={a}
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
        <Typography variant="h5">Afflictions</Typography>
        {addButton}
      </Box>

      <Grid container spacing={2} sx={{mt: 2}}>
        {afflictionsList}
      </Grid>
    </Box>
  );
}
