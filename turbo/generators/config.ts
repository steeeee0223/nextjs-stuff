import type { PlopTypes } from "@turbo/gen";

import { component, init, story } from "./generators";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("init", init);
  plop.setGenerator("component", component);
  plop.setGenerator("story", story);
}
