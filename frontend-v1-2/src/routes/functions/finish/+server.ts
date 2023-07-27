import { json } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

// export const actions: Actions = {
// 	upload: async ({ request }) => {
// 		//const formData = await request.body;
// 		const data = {};
// 		/*    for (let [key, value] of formData.entries()) {
//             data[key] = key;
//         }
//         let checkboxData = await getCSVData(data); */
// 		return {
// 			status: 200,
// 			body: 'checkboxData'
// 		};
// 	}
// };

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const formData = await request.json();

	/* Parse the formdata and get the functionnames and if they are checked or not */
	let fixFunctions: string[] = [];
	let checkFunctions: string[] = [];
	let codeString = 'corpus-services ';
	formData.forEach((element: any) => {
		if (element.checked === true && element.fixable === '1') {
			//	functionNames[element.functionName] = element.fixable;
			//codeString += element.functionName + ' -f ';
			fixFunctions.push(element.functionName);
		} else {
			//codeString += element.functionName + ' -c ';
			checkFunctions.push(element.functionName);
		}
	});

	checkFunctions.forEach((element) => {
		codeString += element + ' -c ';
	});
	fixFunctions.forEach((element) => {
		codeString += element + ' -f ';
	});

	return json(codeString);
}
