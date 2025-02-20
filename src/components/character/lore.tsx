'use client';

import {
  Box,
  CardContent,
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
      onChange={e => character.updateNotes(e.target.value)}
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
      value={character.character?.lore.aspiration ?? -1}
      updateValue={updateAspiration}
      valueList={aspirations}
    />
  );

  const coreValueSelect = (
    <SelectRenderSubtitle
      label="Core Value"
      value={character.character?.lore.core_value ?? -1}
      updateValue={updateCoreValue}
      valueList={coreValues}
    />
  );

  const viceSelect = (
    <SelectRenderSubtitle
      label="Vice"
      value={character.character?.lore.vice ?? -1}
      updateValue={updateVice}
      valueList={vices}
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
          <Grid container spacing={2}>
            <Grid size={12}>
              {aspirationSelect}
            </Grid>

            <Grid size={12}>
              {coreValueSelect}
            </Grid>

            <Grid size={12}>
              {viceSelect}
            </Grid>
          </Grid>
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

    <Grid size={12}>
      <SoulforgeCard>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={4}>
              {aspirationSelect}
            </Grid>

            <Grid size={4}>
              {coreValueSelect}
            </Grid>

            <Grid size={4}>
              {viceSelect}
            </Grid>
          </Grid>
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

