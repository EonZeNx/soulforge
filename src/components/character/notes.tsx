'use client';

import {
  Box,
  TextField,
  Typography,
  SxProps, CardContent
} from "@mui/material";
import {useCharacterContext} from "@/context/character/character-context";
import {SoulforgeCard} from "@/components/soulforge-card";

type Props = {
  sx?: SxProps;
};

export function Notes({sx}: Props) {
  const character = useCharacterContext();

  return (
    <Box sx={sx}>
      <Typography
        variant="h5"
        component="h5"
      >
        Notes
      </Typography>

      <SoulforgeCard>
        <CardContent>
          <TextField
            label="Notes"
            variant="outlined"
            margin="dense"
            size="small"
            fullWidth
            multiline
            minRows={4}
            maxRows={16}
            value={character.character?.notes}
            onChange={e => character.updateNotes(e.target.value)}
          />
        </CardContent>
      </SoulforgeCard>
    </Box>
  );
}

