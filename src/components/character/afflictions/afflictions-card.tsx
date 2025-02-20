'use client';

import {
  SxProps, CardContent, Stack, IconButton, TextField, Collapse, IconButtonProps, styled
} from "@mui/material";
import {SoulforgeCard} from "@/components/soulforge-card";
import {tags} from "@/data/v1/tags";
import {CharacterAffliction} from "@/data/types";
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
  affliction: CharacterAffliction;
  index: number;
  sx?: SxProps;
};

export function AfflictionsCard({affliction, index, sx}: Props) {
  const character = useCharacterContext();
  const [showDescription, setShowDescription] = useState(false);

  const updateName = (name: string) => {
    const newState = {
      data: {
        name: name,
        description: affliction.data?.description,
      }
    };

    character.updateAffliction(index, newState);
  }

  const updateDescription = (description: string) => {
    const newState = {
      data: {
        name: affliction.data?.name ?? "failed",
        description: description,
      }
    };

    character.updateAffliction(index, newState);
  }

  const removeAffliction = () => {
    character.removeAffliction(index);
  }

  const actions = (
    <Stack direction="row" alignItems="center" spacing={0}>
      <IconButton onClick={() => removeAffliction()}>
        <RemoveIcon/>
      </IconButton>
    </Stack>
  );

  let name: string | undefined = "";
  let description: string | undefined = "";

  if (!isNull(affliction.id)) {
    const tag = tags.find((t) => t.id === affliction.id);

    name = tag?.name;
    description = tag?.description;
  }
  else if (!isNull(affliction.data)) {
    name = affliction.data?.name;
    description = affliction.data?.description;
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
    </Stack>
  );

  const content = (
    <Collapse in={showDescription}>
      <CardContent sx={{pt: 1}}>
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
