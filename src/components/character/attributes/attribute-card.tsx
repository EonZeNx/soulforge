'use client';

import {
  CardContent,
  SxProps, CardHeader
} from "@mui/material";
import {SoulforgeCard} from "@/components/soulforge-card";
import {DieSizeSelector} from "@/components/character/attributes/die-size-selector";
import {dieSizes} from "@/data/v1/die-sizes";

type Props = {
  name: string;
  attributeValue: number;
  onAttributeChange: (value: number) => void;
  flowValue: number;
  onFlowValue: (value: number) => void;
  flexDirection?: "column" | "row";
  sx?: SxProps;
};

export function AttributeCard({name, attributeValue, onAttributeChange, flowValue, onFlowValue, flexDirection = "row", sx}: Props) {
  const attributeSizes = [...dieSizes]
    .splice(1, dieSizes.length - 2);

  return (
    <SoulforgeCard sx={sx}>
      <CardHeader
        title={name}
        sx={{pb: 0}}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: {flexDirection},
          gap: 2
        }}
      >
        <DieSizeSelector
          label="Attribute"
          size="small"
          dieSizes={attributeSizes}
          value={attributeValue}
          onChange={n => onAttributeChange(n)}
          formControlSx={{width: "100%"}}
          color="primary"
        />
        <DieSizeSelector
          label="Flow"
          size="small"
          dieSizes={attributeSizes}
          value={flowValue}
          onChange={n => onFlowValue(n)}
          formControlSx={{width: "100%"}}
          color="secondary"
        />
      </CardContent>
    </SoulforgeCard>
  );
}

