'use client';

import {
  SxProps, CardContent, Typography, CardHeader, IconButton
} from "@mui/material";
import {SoulforgeCard} from "@/components/soulforge-card";
import {DiceResult} from "@/components/data/dice/dice-roller";
import NewReleasesIcon from '@mui/icons-material/NewReleases';

type Props = {
  diceResult: DiceResult;
  threshold: number;
  onExplode: VoidFunction;
  onRemove: VoidFunction;
  sx?: SxProps;
};

export function DiceCard({diceResult, threshold, onExplode, sx}: Props) {
  let successes = Math.floor(diceResult.result / threshold);

  if (diceResult.explode.length > 0) {
    successes += diceResult.explode.reduce((acc, edr) => acc + Math.floor(edr / threshold), 0);
  }

  const results = `${diceResult.result}` + diceResult.explode.reduce((acc, e) => `${acc} + ${e}`, '');
  const canExplode = (diceResult.result === diceResult.size && diceResult.explode.length === 0) ||
    (diceResult.explode.length !== 0 && diceResult.explode[diceResult.explode.length - 1] === diceResult.size);

  const explodeAction = (
    <IconButton
      color={canExplode ? "warning" : "inherit"}
      onClick={onExplode}
    >
      <NewReleasesIcon/>
    </IconButton>
  );

  return (
    <SoulforgeCard sx={sx}>
      <CardHeader
        title={`d${diceResult.size}`}
        subheader={`${successes} success${successes !== 1 ? 'es' : ''}`}
        action={explodeAction}
      />
      <CardContent sx={{pt: 0}}>
        <Typography variant="body1">{results}</Typography>
      </CardContent>
    </SoulforgeCard>
  );
}
