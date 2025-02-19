'use client';

import {
  SxProps, CardContent, Stack, IconButton, Typography, TextField, Collapse, IconButtonProps, styled
} from "@mui/material";
import {SoulforgeCard} from "@/components/soulforge-card";
import {tags} from "@/data/v1/tags";
import {TemporaryTag} from "@/data/types";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useCharacterContext} from "@/context/character/character-context";
import {useState} from "react";
import {isNull} from "@/libraries/general";


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));


type Props = {
  temporaryTag: TemporaryTag;
  index: number;
  sx?: SxProps;
};

export function TemporaryTagCard({temporaryTag, index, sx}: Props) {
  const character = useCharacterContext();
  const [showDescription, setShowDescription] = useState(false);

  const updateStacks = (stacks: number) => {
    character.updateTemporaryTag(index, {...temporaryTag, stacks: stacks});
  };

  const updateName = (name: string) => {
    const newState = {
      stacks: 0,
      data: {
        name: name,
        description: temporaryTag.data?.description,
      }
    };

    character.updateTemporaryTag(index, newState);
  }

  const updateDescription = (description: string) => {
    const newState = {
      stacks: 0,
      data: {
        name: temporaryTag.data?.name ?? "failed",
        description: description,
      }
    };

    character.updateTemporaryTag(index, newState);
  }

  const actions = (
    <Stack direction="row" alignItems="center" spacing={0}>
      <IconButton onClick={() => updateStacks(-1)}>
        <RemoveIcon/>
      </IconButton>

      <IconButton onClick={() => updateStacks(1)}>
        <AddIcon/>
      </IconButton>
    </Stack>
  );

  let name: string | undefined = "";
  let description: string | undefined = "";

  if (!isNull(temporaryTag.id)) {
    const tag = tags.find((t) => t.id === temporaryTag.id);

    name = tag?.name;
    description = tag?.description;
  }
  else if (!isNull(temporaryTag.data)) {
    name = temporaryTag.data?.name;
    description = temporaryTag.data?.description;
  }

  const title = (
    <Stack direction="row" spacing={1} alignItems="center" sx={{width: "100%"}}>
      <TextField
        size="small"
        variant="outlined"
        value={name}
        onChange={e => updateName(e.target.value)}
        fullWidth
      />
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{minWidth: "fit-content"}}
      >
        x {temporaryTag.stacks}
      </Typography>
    </Stack>
  );

  const validDescription = !isNull(description) && (description?.length ?? 0) > 0;

  const content = (
    <Collapse in={showDescription}>
      <CardContent sx={{pt: 0}}>
        <TextField
          size="small"
          variant="outlined"
          label="Description"
          value={description}
          onChange={e => updateDescription(e.target.value)}
          multiline
          minRows={3}
          maxRows={6}
          fullWidth
          disabled={validDescription}
        />
      </CardContent>
    </Collapse>
  );

  return (
    <SoulforgeCard sx={sx}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          p: 2,
          pl: 1
        }}
      >
        <ExpandMore
          expand={showDescription}
          onClick={() => setShowDescription(!showDescription)}
        >
          <ExpandMoreIcon />
        </ExpandMore>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{width: "100%"}}
        >
          {title}

          {actions}
        </Stack>
      </Stack>

      {content}
    </SoulforgeCard>
  );
}
