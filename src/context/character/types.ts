import {Character, CharacterAffliction, TemporaryTag} from "@/data/types";

export type CharacterValueProps = {
  character: Character | null;
  allCharacterMetaData: {
    id: number;
    name: string;
  }[];
};

export enum EIdOrIndex {
  ID,
  INDEX
}

export type CharacterContextProps = {
  updateSelectedCharacter: (id: number) => void;

  // Lore
  updateTrueName: (value: string) => void;
  updateAspiration: (id: number) => void;
  updateCoreValue: (id: number) => void;
  updateVice: (id: number) => void;
  updateNotes: (value: string) => void;

  // Attributes
  updateAttributeValue: (id: number, value: number) => void;
  updateAttributeFlow: (id: number, flow: number) => void;

  // Resources
  updateFate: (value: number) => void;
  updateDowntime: (value: number) => void;

  // Keystone
  updateKeystone: (id: number) => void;
  updateKeystoneAbility: (id: number, value: {unlocked?: boolean, exhausted?: boolean}) => void;

  // Archetype
  updateArchetype: (id: number) => void;
  updateArchetypeAbility: (id: number, value: {unlocked?: boolean, exhausted?: boolean}) => void;

  // Kinfolk
  updateKinfolk: (id: number) => void;
  updateAllKinfolkAbilities: (ids: number[]) => void;
  updateKinfolkAbility: (id: number, value: {unlocked?: boolean, exhausted?: boolean}) => void;

  // Traits
  // updateTrait: (oldId: number, newId: number) => void;
  // updateTraitAbility: (id: number, value: {unlocked?: boolean, exhausted?: boolean}) => void;

  // Temporary tags
  addTemporaryTag: (temporaryTag: TemporaryTag) => number;
  updateTemporaryTag: (temporaryTagIndex: number, temporaryTag: TemporaryTag) => void;

  // Afflictions
  addAffliction: (affliction: CharacterAffliction) => number;
  updateAffliction: (afflictionIndex: number, affliction: CharacterAffliction) => void;
  removeAffliction: (afflictionIndex: number) => void;
} & CharacterValueProps;
