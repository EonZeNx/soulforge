'use client';

import {
  Box,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  SxProps, useTheme
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {useCharacterContext} from "@/context/character/character-context";
import {aspirations} from "@/data/v1/aspirations";
import {useCallback} from "react";
import {coreValues} from "@/data/v1/core_values";
import {vices} from "@/data/v1/vices";
import {SoulforgeCard} from "@/components/soulforge-card";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";
import {SelectRenderSubtitle} from "@/components/select-render-subtitle";

type Props = {
  sx?: SxProps;
};

export function Lore({sx}: Props) {
  const character = useCharacterContext();
  const theme = useTheme();
  const isSmall = useBreakpointMediaQuery(theme.breakpoints.down("sm"));

  const updateAspiration = useCallback((id: number | string) => {
    let idNumber = 0;

    if (typeof id === 'string')
      idNumber = parseInt(id, 10);
    else
      idNumber = id;

    character.updateAspiration(idNumber);
  }, [character]);

  const updateCoreValue = useCallback((id: number | string) => {
    let idNumber = 0;

    if (typeof id === 'string')
      idNumber = parseInt(id, 10);
    else
      idNumber = id;

    character.updateCoreValue(idNumber);
  }, [character]);

  const updateVice = useCallback((id: number | string) => {
    let idNumber = 0;

    if (typeof id === 'string')
      idNumber = parseInt(id, 10);
    else
      idNumber = id;

    character.updateVice(idNumber);
  }, [character]);


  const nameTextField = (
    <TextField
      label="Name"
      variant="outlined"
      margin="dense"
      size="small"
      fullWidth
      value={character.character?.lore.name}
      onChange={e => character.updateName(e.target.value)}
    />
  );

  const trueNameTextField = (
    <TextField
      label="True name"
      variant="outlined"
      margin="dense"
      size="small"
      fullWidth
      value={character.character?.lore.true_name}
      onChange={e => character.updateTrueName(e.target.value)}
    />
  );

  const aspirationSelect = (
    <SelectRenderSubtitle
      label="Aspiration"
      value={character.character?.lore.aspiration.id ?? -1}
      updateValue={updateAspiration}
      valueList={aspirations}
    />
  );

  const coreValueSelect = (
    <SelectRenderSubtitle
      label="Core Value"
      value={character.character?.lore.core_value.id ?? -1}
      updateValue={updateCoreValue}
      valueList={coreValues}
    />
  );

  const viceSelect = (
    <SelectRenderSubtitle
      label="Vice"
      value={character.character?.lore.vice.id ?? -1}
      updateValue={updateVice}
      valueList={vices}
    />
  );

  const aspirationNoteTextField = (
    <TextField
      label="Aspiration notes"
      variant="outlined"
      margin="dense"
      size="small"
      multiline
      minRows={3}
      maxRows={6}
      fullWidth
      value={character.character?.lore.aspiration.note}
      onChange={e => character.updateAspirationNote(e.target.value)}
    />
  );
  const coreValueNoteTextField = (
    <TextField
      label="Core Value notes"
      variant="outlined"
      margin="dense"
      size="small"
      multiline
      minRows={3}
      maxRows={6}
      fullWidth
      value={character.character?.lore.core_value.note}
      onChange={e => character.updateCoreValueNote(e.target.value)}
    />
  );
  const viceNoteTextField = (
    <TextField
      label="Vice notes"
      variant="outlined"
      margin="dense"
      size="small"
      multiline
      minRows={3}
      maxRows={6}
      fullWidth
      value={character.character?.lore.vice.note}
      onChange={e => character.updateViceNote(e.target.value)}
    />
  );


  const smallGridLayout = (<>
    <Grid size={12}>
      <SoulforgeCard>
        <CardContent sx={{display: "flex", flexDirection: "column", gap: 2}}>
          {nameTextField}
          {trueNameTextField}
        </CardContent>
      </SoulforgeCard>
    </Grid>


    <Grid size={12}>
      <SoulforgeCard>
        <CardContent>
          {aspirationSelect}
          {aspirationNoteTextField}
        </CardContent>
      </SoulforgeCard>
    </Grid>

    <Grid size={12}>
      <SoulforgeCard>
        <CardContent>
          {coreValueSelect}
          {coreValueNoteTextField}
        </CardContent>
      </SoulforgeCard>
    </Grid>

    <Grid size={12}>
      <SoulforgeCard>
        <CardContent>
          {viceSelect}
          {viceNoteTextField}
        </CardContent>
      </SoulforgeCard>
    </Grid>
  </>);

  const largeGridLayout = (<>
    <Grid size={12}>
      <SoulforgeCard>
        <CardContent sx={{display: "flex", flexDirection: "row", gap: 2}}>
          {nameTextField}
          {trueNameTextField}
        </CardContent>
      </SoulforgeCard>
    </Grid>


    <Grid size={4}>
      <SoulforgeCard>
        <CardContent>
          {aspirationSelect}
          {aspirationNoteTextField}
        </CardContent>
      </SoulforgeCard>
    </Grid>

    <Grid size={4}>
      <SoulforgeCard>
        <CardContent>
          {coreValueSelect}
          {coreValueNoteTextField}
        </CardContent>
      </SoulforgeCard>
    </Grid>

    <Grid size={4}>
      <SoulforgeCard>
        <CardContent>
          {viceSelect}
          {viceNoteTextField}
        </CardContent>
      </SoulforgeCard>
    </Grid>
  </>);

  return (
    <Box sx={sx}>
      <Typography
        variant="h5"
        component="h5"
      >
        Lore
      </Typography>

      <Grid container spacing={2}>
        {isSmall ? smallGridLayout : largeGridLayout}
      </Grid>
    </Box>
  );
}

