import {writable, readable} from "svelte/store";

export const isFirstLoad = writable(false);

export const selectSearch = writable(true);

export const searchBoxx = writable(false);

export const chatpage = writable(false);

export const searchBox = writable(true);

export const lisFolder = writable('structured');

export const userIdStore = writable('');

export const buttonName = writable('');



