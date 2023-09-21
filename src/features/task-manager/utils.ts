import { Store } from "./types";

export const createId = (store: Store) => (store?.[store.length - 1]?.id ?? 0) + 1;
