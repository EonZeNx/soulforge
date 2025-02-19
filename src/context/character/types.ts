import {Character, TemporaryTag} from "@/data/types";

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
  updateName: (value: string) => void;
  updateTrueName: (value: string) => void;
  updateAspiration: (id: number) => void;
  updateCoreValue: (id: number) => void;
  updateVice: (id: number) => void;

  updateAspirationNote: (value: string) => void;
  updateCoreValueNote: (value: string) => void;
  updateViceNote: (value: string) => void;

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

  addTemporaryTag: (temporaryTag: TemporaryTag) => number;
  updateTemporaryTag: (temporaryTagIndex: number, temporaryTag: TemporaryTag) => void;
} & CharacterValueProps;
