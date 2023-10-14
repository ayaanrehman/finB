/** @type {import('./$types').LayoutLoad} */
export const load = async ({ url: { pathname } }) => {
	return { pathname };
};
// export const prerender = true;
export const trailingSlash = 'always'; 
// export const ssr = false;

// export let isFirstLoad = false;