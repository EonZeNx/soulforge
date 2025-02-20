import {Archetype, Character, CharacterTag, CharacterArchetype, Tag} from "@/data/types";

export const DEFAULT_CHARACTER: Character = {
  afflictions: [],
  archetype: {
    id: 0,
    note: "",
    tags: []
  },
  id: 0,
  keystone: {
    id: 0,
    note: "",
    tags: []
  },
  kinfolk: {
    id: 0,
    note: "",
    tags: []
  },
  lore: {
    name: "",
    true_name: "",
    aspiration: -1,
    core_value: -1,
    vice: -1
  },
  resources: {
    fate: {
      name: "Fate",
      value: 0,
      bounds: {
        min: 0
      }
    },
    downtime: {
      name: "Downtime",
      value: 0,
      bounds: {
        min: 0
      }
    },
    other: []
  },
  temporary_tags: [],
  traits: [],
  notes: "",
  attributes: [
    {
      id: 0,
      value: 6,
      flow: 0
    },
    {
      id: 1,
      value: 6,
      flow: 0
    },
    {
      id: 2,
      value: 6,
      flow: 0
    },
    {
      id: 3,
      value: 6,
      flow: 0
    },
  ],
};

export const DEFAULT_TAG: Tag = {
  id: -1,
  name: "",
  categories: [],
};

export const DEFAULT_CHARACTER_ABILITY: CharacterTag = {
  id: -1,
  exhausted: false,
  unlocked: true
};

export const DEFAULT_ARCHETYPE: Archetype = {
  id: -1,
  name: "DEFAULT",
  tags: []
};

export const DEFAULT_CHARACTER_ARCHETYPE: CharacterArchetype = {
  id: -1,
  tags: [],
  note: ""
};
