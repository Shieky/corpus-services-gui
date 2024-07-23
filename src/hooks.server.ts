import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {
	return redirect(301, '/');
}
