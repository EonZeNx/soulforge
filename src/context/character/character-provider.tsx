'use client';

import {PropsWithChildren, useCallback, useMemo} from "react";
import {CharacterContext} from "@/context/character/character-context";
import {Character} from "@/data/types";
import {useLocalStorage} from "usehooks-ts";
import {DEFAULT_CHARACTER, DEFAULT_CHARACTER_ABILITY} from "@/data/defaults";
import {archetypes} from "@/data/v1/archetypes";
import {keystones} from "@/data/v1/keystones";
import {kinfolks} from "@/data/v1/kinfolks";


const CHARACTER_STORAGE_KEY = 'characters';
const SELECTED_CHARACTER_STORAGE_KEY = 'selected_character';


type Props = {
} & PropsWithChildren;

export function CharacterProvider({ children }: Props) {
  const [characters, charactersUpdate] = useLocalStorage<Character[]>(CHARACTER_STORAGE_KEY, [DEFAULT_CHARACTER]);
  const [selectedCharacter, selectedCharacterUpdate] = useLocalStorage(SELECTED_CHARACTER_STORAGE_KEY, 0);

  const getSelectedCharacterIndex = useCallback((): number => {
    return characters.findIndex(c => c.id === selectedCharacter);
  }, [characters, selectedCharacter]);

  // Lore
  const updateName = useCallback((value: string) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].lore.name = value;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateTrueName = useCallback((value: string) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].lore.true_name = value;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateAspiration = useCallback((id: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].lore.aspiration.id = id;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateCoreValue = useCallback((id: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].lore.core_value.id = id;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateVice = useCallback((id: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].lore.vice.id = id;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateAspirationNote = useCallback((value: string) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].lore.aspiration.note = value;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateCoreValueNote = useCallback((value: string) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].lore.core_value.note = value;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateViceNote = useCallback((value: string) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].lore.vice.note = value;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);


  // Resources
  const clampResource = (value: number, bounds?: {min?: number, max?: number}): number => {
    let clamped = value;

    const min = bounds?.min;
    if (min !== undefined && min !== null) {
      clamped = Math.max(clamped, min);
    }

    const max = bounds?.max;
    if (max !== undefined && max !== null) {
      clamped = Math.min(clamped, max);
    }

    return clamped;
  };

  const updateFate = useCallback((value: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].resources.fate.value = clampResource(value, characters[index].resources.fate.bounds);

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateDowntime = useCallback((value: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].resources.downtime.value = clampResource(value, characters[index].resources.downtime.bounds);

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);


  // Keystone
  const updateKeystone = useCallback((id: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].keystone.id = id;

    const keystone = keystones.find(k => k.id === id);
    if (keystone === undefined || keystone === null) {
      console.error(`failed to find keystone with id ${id}`);
      return;
    }

    characters[index].keystone.tags = keystone.tags.map(t => ({
      id: t.id,
      unlocked: true,
      exhausted: false,
    }));

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateKeystoneAbility = useCallback((id: number, value: {unlocked?: boolean, exhausted?: boolean}) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    const tagIndex = characters[index].keystone.tags.findIndex(a => a.id === id);
    if (tagIndex < 0) {
      console.error(`failed to find archetype ability with id ${id}`);
      return;
    }

    if (value.unlocked !== undefined && value.unlocked !== null) {
      characters[index].keystone.tags[tagIndex].unlocked = value.unlocked;
    }

    if (value.exhausted !== undefined && value.exhausted !== null) {
      characters[index].keystone.tags[tagIndex].exhausted = value.exhausted;
    }

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);


  // Archetype
  const updateArchetype = useCallback((id: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].archetype.id = id;

    const archetype = archetypes.find(a => a.id === id);
    if (archetype === undefined || archetype === null) {
      console.error(`failed to find archetype with id ${id}`);
      return;
    }

    characters[index].archetype.tags = archetype.tags.map(a => ({
      id: a.id,
      unlocked: true,
      exhausted: false,
    }));

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);
  const updateArchetypeAbility = useCallback((id: number, value: {unlocked?: boolean, exhausted?: boolean}) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    const abilityIndex = characters[index].archetype.tags.findIndex(a => a.id === id);
    if (abilityIndex < 0) {
      console.error(`failed to find archetype ability with id ${id}`);
      return;
    }

    if (value.unlocked !== undefined && value.unlocked !== null) {
      characters[index].archetype.tags[abilityIndex].unlocked = value.unlocked;
    }

    if (value.exhausted !== undefined && value.exhausted !== null) {
      characters[index].archetype.tags[abilityIndex].exhausted = value.exhausted;
    }

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);


  // Kinfolk
  const updateKinfolk = useCallback((id: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].kinfolk.id = id;

    const kinfolk = kinfolks.find(a => a.id === id);
    if (kinfolk === undefined || kinfolk === null) {
      console.error(`failed to find archetype with id ${id}`);
      return;
    }

    characters[index].kinfolk.tags = kinfolk.tags.map(a => ({
      id: a.id,
      unlocked: true,
      exhausted: false,
    }));

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);
  const updateAllKinfolkAbilities = useCallback((ids: number[]) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].kinfolk.tags = ids.map(id => {
      const matchingAbilities = characters[index].kinfolk.tags.filter(a => ids.indexOf(a.id) >= 0);
      const existingAbility = matchingAbilities.length > 0
        ? matchingAbilities[0]
        : {...DEFAULT_CHARACTER_ABILITY};

      if (id === existingAbility.id) {
        return existingAbility;
      }

      return {
        id: id,
        unlocked: true,
        exhausted: false
      };
    });

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);
  const updateKinfolkAbility = useCallback((id: number, value: {unlocked?: boolean, exhausted?: boolean}) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    const abilityIndex = characters[index].kinfolk.tags.findIndex(a => a.id === id);
    if (abilityIndex < 0) {
      console.error(`failed to find archetype ability with id ${id}`);
      return;
    }

    if (value.unlocked !== undefined && value.unlocked !== null) {
      characters[index].kinfolk.tags[abilityIndex].unlocked = value.unlocked;
    }

    if (value.exhausted !== undefined && value.exhausted !== null) {
      characters[index].kinfolk.tags[abilityIndex].exhausted = value.exhausted;
    }

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);



  const updateTemporaryTag = useCallback((id: number, stacks?: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    const safeStacks = stacks !== undefined && stacks !== null
      ? stacks : 1;

    let tagIndex = characters[index].temporary_tags.findIndex(tt => tt.id === id);
    if (tagIndex >= 0) {
      characters[index].temporary_tags[tagIndex].stacks += safeStacks;
    }
    else {
      characters[index].temporary_tags.push({
        id: id,
        stacks: safeStacks,
      });

      tagIndex = characters[index].temporary_tags.length - 1;
    }

    if (characters[index].temporary_tags[tagIndex].stacks <= 0) {
      characters[index].temporary_tags.splice(tagIndex, 1);
    }

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);


  const memo = useMemo(() => {
    const index = getSelectedCharacterIndex();
    const character = index < 0 ? null : characters[index];

    const metaData = characters.map(c => ({id: c.id, name: c.lore.name}));

    return {
      character: character,
      allCharacterMetaData: metaData,
      updateSelectedCharacter: selectedCharacterUpdate,

      updateName: updateName,
      updateTrueName: updateTrueName,

      updateAspiration: updateAspiration,
      updateCoreValue: updateCoreValue,
      updateVice: updateVice,
      updateAspirationNote: updateAspirationNote,
      updateCoreValueNote: updateCoreValueNote,
      updateViceNote: updateViceNote,

      updateFate: updateFate,
      updateDowntime: updateDowntime,

      updateKeystone: updateKeystone,
      updateKeystoneAbility: updateKeystoneAbility,

      updateArchetype: updateArchetype,
      updateArchetypeAbility: updateArchetypeAbility,

      updateKinfolk: updateKinfolk,
      updateAllKinfolkAbilities: updateAllKinfolkAbilities,
      updateKinfolkAbility: updateKinfolkAbility,

      updateTemporaryTag: updateTemporaryTag
    };
  }, [
    characters,
    getSelectedCharacterIndex,
    selectedCharacterUpdate,

    updateName,
    updateTrueName,

    updateAspiration,
    updateCoreValue,
    updateVice,
    updateAspirationNote,
    updateCoreValueNote,
    updateViceNote,

    updateFate,
    updateDowntime,

    updateKeystone,
    updateKeystoneAbility,

    updateArchetype,
    updateArchetypeAbility,

    updateKinfolk,
    updateAllKinfolkAbilities,
    updateKinfolkAbility,

    updateTemporaryTag
  ]);

  return (
    <CharacterContext.Provider value={memo}>
      {children}
    </CharacterContext.Provider>
  );
}
