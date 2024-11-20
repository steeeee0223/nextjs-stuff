import type { Emoji, EmojiMartData } from "@emoji-mart/data";

import _tags from "./tags.json";

const tags = Object.entries<string[]>(_tags);
console.log("tags", tags.length);
export const lib: EmojiMartData = {
  categories: [{ id: "custom", emojis: tags.map(([name]) => name) }],
  emojis: tags.reduce<Record<string, Emoji>>(
    (acc, [name, keywords]) => ({
      ...acc,
      [name]: {
        id: name,
        name,
        keywords,
        skins: [],
        version: 1.4,
      },
    }),
    {},
  ),
  aliases: {},
  sheet: {
    cols: 12,
    rows: Math.ceil(1539 / 12),
  },
};
