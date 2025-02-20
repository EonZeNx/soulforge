'use client';

import {
  Box,
  Typography,
  SxProps, Button, Stack, IconButton, useTheme
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import CasinoIcon from '@mui/icons-material/Casino';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {DiceCard} from "@/components/data/dice/dice-card";
import {clamp, randomInt, rollDie} from "@/libraries/general";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";

type Props = {
  sx?: SxProps;
};

export type DiceResult = {
  size: number;
  result: number;
  explode: number[];
};

export function DiceRoller({sx}: Props) {
  const [diceResults, setDiceResults] = useState<DiceResult[]>([]);
  const [edges, setEdges] = useState(0);
  const theme = useTheme();
  const isSmall = useBreakpointMediaQuery(theme.breakpoints.down("sm"));

  const cardSize = !isSmall ? 2 : 6;

  const threshold = clamp(5 - edges, 1, 10);
  const successes = diceResults.reduce((acc, dr) => {
    const diceSuccesses = Math.floor(dr.result / threshold);
    if (diceSuccesses > 0)
      return acc + diceSuccesses;
    return acc;
  }, 0);

  const updateEdge = (value: number) => {
    setEdges(clamp(value, -5, 4));
  };

  const addDice = (size: number) => {
    setDiceResults([...diceResults, {
      size: size,
      result: randomInt(1, size),
      explode: []
    }]);
  };

  const explodeDice = (index: number) => {
    const newDiceResults = [...diceResults];
    newDiceResults[index].explode.push(rollDie(newDiceResults[index].size));

    setDiceResults(newDiceResults);
  }

  const addButtons = (
    <Stack spacing={2} direction="row" sx={{mt: 1, width: "100%"}}>
      <Button
        variant="outlined"
        startIcon={<CasinoIcon />}
        color="primary"
        onClick={() => addDice(6)}
        sx={{flexGrow: 1}}
      >
        d6
      </Button>
      <Button
        variant="outlined"
        startIcon={<CasinoIcon />}
        color="secondary"
        onClick={() => addDice(8)}
        sx={{flexGrow: 1}}
      >
        d8
      </Button>
      <Button
        variant="outlined"
        startIcon={<CasinoIcon />}
        color="primary"
        onClick={() => addDice(10)}
        sx={{flexGrow: 1}}
      >
        d10
      </Button>
      <Button
        variant="outlined"
        startIcon={<CasinoIcon />}
        color="secondary"
        onClick={() => addDice(12)}
        sx={{flexGrow: 1}}
      >
        d12
      </Button>
    </Stack>
  );

  const diceGrid = (
    <>
      {diceResults.map((r, i) => (
        <Grid size={cardSize} key={i}>
          <DiceCard
            diceResult={r}
            threshold={clamp(5 - edges, 0, 10)}
            onRemove={() => {}}
            onExplode={() => explodeDice(i)}
            sx={{height: "100%"}}
          />
        </Grid>
      ))}
    </>
  );

  return (
    <Box sx={sx}>
      <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start">
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography variant="h5">Dice roller</Typography>
          <Typography variant="body1" color="textSecondary">{successes} successes</Typography>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <IconButton
              size="small"
              color="warning"
              onClick={() => updateEdge(edges - 1)}
              sx={{border: 1, borderRadius: 2, p: 0.1}}
            >
              <RemoveIcon/>
            </IconButton>

            <Typography variant="body1">{edges} Edge</Typography>

            <IconButton
              size="small"
              color="primary"
              onClick={() => updateEdge(edges + 1)}
              sx={{border: 1, borderRadius: 2, p: 0.15}}
            >
              <AddIcon/>
            </IconButton>
          </Stack>
        </Stack>

        {addButtons}
      </Box>

      <Grid container spacing={2} sx={{mt: 2}}>
        {diceGrid}
      </Grid>
    </Box>
  );
}
