export enum EAfflictionCategory {
  DAMAGE,
  STATUS,
  REMOVEABLE,
  UNREMOVABLE
}

export enum ETagCategories {
  KEYSTONE = "Keystone",
  KINFOLK = "Kinfolk",
  ARCHETYPE = "Archetype",
  PARTY_WIDE = "Party-wide",
  DAMAGE = "Damage",
  BUFF = "Buff",
  DEBUFF = "Debuff",
  UTILITY = "Utility",
  MATERIAL_MUNDANE = "Material Mundane",
  MATERIAL_ENHANCED = "Material Enhanced",
  MATERIAL_EXOTIC = "Material Exotic",
  MATERIAL_MYTHICAL = "Material Mythical",
  ELEMENT = "Element",
  CREATURE = "Creature",
  ULTIMATE = "Ultimate",
}

export enum ETraitCategories {
  PERSONALITY,
  GOALS,
}

export type Affliction = {
  id: number;
  name: string;
  description?: string;
  categories: EAfflictionCategory[];
};

export type AfflictionReference = {
  id: number;
};

export type Exhaust = {
  description: string;
  afflictions?: AfflictionReference[];
  tags?: TagReference[];
};

export type Tag = {
  id: number;
  name: string;
  description?: string;
  categories: ETagCategories[];
  afflictions?: AfflictionReference[];
  tags?: TagReference[];
  exhaust?: Exhaust;
};

export type TagReference = {
  id: number; // references a TagId
};

export type Aspiration = {
  id: number;
  name: string;
  description?: string;
};

export type CoreValue = {
  id: number;
  name: string;
  description?: string;
};

export type Vice = {
  id: number;
  name: string;
  description?: string;
};

export type Keystone = {
  id: number;
  name: string;
  description?: string;
  tags: TagReference[];
};

export type Kinfolk = {
  id: number;
  name: string;
  description?: string;
  tags: TagReference[];
};

export type Archetype = {
  id: number;
  name: string;
  description?: string;
  tags: TagReference[];
};

export type Trait = {
  id: number;
  name: string;
  description?: string;
  categories: ETraitCategories[];
  tag: TagReference;
};

export type Attribute = {
  id: number;
  name: string;
  description?: string;
};

export type CharacterAttribute = {
  id: number;
  value: number;
  flow: number;
};

export type Resource = {
  name: string;
  value: number;
  description?: string;
  bounds?: {
    min?: number;
    max?: number;
  }
};

export type CharacterLore = {
  name: string;
  true_name: string;
  aspiration: number; // references TagId
  core_value: number; // references TagId
  vice: number; // references TagId
};

export type CharacterTag = {
  id: number; // references TagId
  unlocked: boolean;
  exhausted: boolean;
};

export type CharacterKeystone = {
  id: number; // references KeystoneId
  note: string;
  tags: CharacterTag[];
};

export type CharacterArchetype = {
  id: number; // references ArchetypeId
  note: string;
  tags: CharacterTag[];
};

export type CharacterKinfolk = {
  id: number; // references KinfolkId
  note: string;
  tags: CharacterTag[];
};

export type CharacterTrait = {
  id: number; // references TraitId
  note: string;
  tags: CharacterTag[];
};

export type CharacterResources = {
  fate: Resource;
  downtime: Resource;
  other: Resource[];
};

export type TemporaryTag = {
  id?: number; // references TagId
  data?: {
    name: string;
    description?: string;
  };
  stacks: number;
};

export type CharacterAffliction = {
  id?: number; // references AfflictionId
  data?: {
    name: string;
    description?: string;
  };
};

export type Character = {
  id: number;
  lore: CharacterLore;
  attributes: CharacterAttribute[];
  keystone: CharacterKeystone;
  archetype: CharacterArchetype;
  kinfolk: CharacterKinfolk;
  traits: CharacterTrait[];
  temporary_tags: TemporaryTag[];
  afflictions: CharacterAffliction[];
  resources: CharacterResources;
  notes: string;
};
