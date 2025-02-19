'use client';

import {
  SxProps, CardContent, CardHeader, Stack, IconButton, Typography
} from "@mui/material";
import {SoulforgeCard} from "@/components/soulforge-card";
import {tags} from "@/data/v1/tags";
import {TagReference} from "@/data/types";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import {useCharacterContext} from "@/context/character/character-context";

type Props = {
  reference: TagReference;
  sx?: SxProps;
};

export function TemporaryTagCard({reference, sx}: Props) {
  const character = useCharacterContext();

  const tag = tags.find((t) => t.id === reference.id);
  if (!tag)
    return null;

  const updateTemporaryTag = (stacks?: number) => {
    const safeStacks = stacks !== undefined && stacks !== null
      ? stacks : 1;

    character.updateTemporaryTag(reference.id, safeStacks);
  };

  const actions = (
    <Stack direction="row" alignItems="center" spacing={0}>
      <IconButton>
        <RemoveIcon onClick={() => updateTemporaryTag(-1)}/>
      </IconButton>

      <IconButton>
        <AddIcon onClick={() => updateTemporaryTag(1)}/>
      </IconButton>
    </Stack>
  );

  const stacks = reference.stacks !== undefined && reference.stacks !== null
    ? reference.stacks : 1;
  const title = (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="h6">{tag.name}</Typography>
      <Typography variant="body1" color="textSecondary">x {stacks}</Typography>
    </Stack>
  );

  return (
    <SoulforgeCard sx={sx}>
      <CardHeader
        title={title}
        subtitle={reference.stacks}
        sx={{pb: 0}}
        action={actions}
      />
      <CardContent>
        {tag.description}
      </CardContent>
    </SoulforgeCard>
  );
}
