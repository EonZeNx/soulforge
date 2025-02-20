'use client';

import {PropsWithChildren, useCallback, useMemo} from "react";
import {CharacterContext} from "@/context/character/character-context";
import {Character, CharacterAffliction, TemporaryTag} from "@/data/types";
import {useLocalStorage} from "usehooks-ts";
import {DEFAULT_CHARACTER, DEFAULT_CHARACTER_ABILITY} from "@/data/defaults";
import {archetypes} from "@/data/v1/archetypes";
import {keystones} from "@/data/v1/keystones";
import {kinfolks} from "@/data/v1/kinfolks";
import {isNull} from "@/libraries/general";
import {attributes} from "@/data/v1/attributes";


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

    characters[index].lore.aspiration = id;

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

    characters[index].lore.core_value = id;

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

    characters[index].lore.vice = id;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateNotes = useCallback((value: string) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    characters[index].notes = value;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);


  // Attributes
  const updateAttributeValue = useCallback((id: number, value: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    const attributeIndex = attributes.findIndex(a => a.id === id);
    if (attributeIndex < 0 || attributeIndex >= characters[index].attributes.length) {
      console.error(`failed to find keystone with id ${id}`);
      return;
    }

    characters[index].attributes[attributeIndex].value = value;

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateAttributeFlow = useCallback((id: number, flow: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    const attributeIndex = attributes.findIndex(a => a.id === id);
    if (attributeIndex < 0 || attributeIndex >= characters[index].attributes.length) {
      console.error(`failed to find keystone with id ${id}`);
      return;
    }

    characters[index].attributes[attributeIndex].flow = flow;

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


  // Temporary tags
  const addTemporaryTag = useCallback((temporaryTag: TemporaryTag) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return -1;
    }

    characters[index].temporary_tags.push(temporaryTag);
    const tagIndex = characters[index].temporary_tags.length - 1;

    charactersUpdate(characters);

    return tagIndex;
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateTemporaryTag = useCallback((temporaryTagIndex: number, temporaryTag: TemporaryTag) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    if (temporaryTagIndex < 0 || temporaryTagIndex >= characters[index].temporary_tags.length) {
      console.error(`index ${temporaryTagIndex} outside temporary tag bounds`);
      return;
    }

    characters[index].temporary_tags[temporaryTagIndex].stacks += temporaryTag.stacks;

    if (characters[index].temporary_tags[temporaryTagIndex].stacks > 0) {
      characters[index].temporary_tags[temporaryTagIndex].id = temporaryTag.id;

      if (isNull(temporaryTag.id)) {
        characters[index].temporary_tags[temporaryTagIndex].data = temporaryTag.data;
      }
    }
    else {
      characters[index].temporary_tags.splice(temporaryTagIndex, 1);
    }

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);


  // Afflictions
  const addAffliction = useCallback((affliction: CharacterAffliction) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return -1;
    }

    characters[index].afflictions.push(affliction);
    const afflictionIndex = characters[index].afflictions.length - 1;

    charactersUpdate(characters);

    return afflictionIndex;
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const updateAffliction = useCallback((afflictionIndex: number, affliction: CharacterAffliction) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    if (afflictionIndex < 0 || afflictionIndex >= characters[index].afflictions.length) {
      console.error(`index ${afflictionIndex} outside afflictions bounds`);
      return;
    }

    characters[index].afflictions[afflictionIndex].id = affliction.id;

    if (isNull(affliction.id)) {
      characters[index].afflictions[afflictionIndex].data = affliction.data;
    }

    charactersUpdate(characters);
  }, [
    characters,
    charactersUpdate,
    selectedCharacter,
    getSelectedCharacterIndex
  ]);

  const removeAffliction = useCallback((afflictionIndex: number) => {
    const index = getSelectedCharacterIndex();

    if (index < 0) {
      console.error(`failed to find character with id ${selectedCharacter}`);
      return;
    }

    if (afflictionIndex < 0 || afflictionIndex >= characters[index].afflictions.length) {
      console.error(`index ${afflictionIndex} outside afflictions bounds`);
      return;
    }

    characters[index].afflictions.splice(afflictionIndex, 1);

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
      updateNotes: updateNotes,

      updateAttributeValue: updateAttributeValue,
      updateAttributeFlow: updateAttributeFlow,

      updateFate: updateFate,
      updateDowntime: updateDowntime,

      updateKeystone: updateKeystone,
      updateKeystoneAbility: updateKeystoneAbility,

      updateArchetype: updateArchetype,
      updateArchetypeAbility: updateArchetypeAbility,

      updateKinfolk: updateKinfolk,
      updateAllKinfolkAbilities: updateAllKinfolkAbilities,
      updateKinfolkAbility: updateKinfolkAbility,

      addTemporaryTag: addTemporaryTag,
      updateTemporaryTag: updateTemporaryTag,

      addAffliction: addAffliction,
      updateAffliction: updateAffliction,
      removeAffliction: removeAffliction,
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
    updateNotes,

    updateAttributeValue,
    updateAttributeFlow,

    updateFate,
    updateDowntime,

    updateKeystone,
    updateKeystoneAbility,

    updateArchetype,
    updateArchetypeAbility,

    updateKinfolk,
    updateAllKinfolkAbilities,
    updateKinfolkAbility,

    addTemporaryTag,
    updateTemporaryTag,

    addAffliction,
    updateAffliction,
    removeAffliction,
  ]);

  return (
    <CharacterContext.Provider value={memo}>
      {children}
    </CharacterContext.Provider>
  );
}
