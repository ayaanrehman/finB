import {writable, readable} from "svelte/store";

export const isFirstLoad = writable(false);