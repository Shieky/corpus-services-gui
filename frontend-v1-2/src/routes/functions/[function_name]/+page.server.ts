import type { PageServerLoad } from './$types';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export const load = (async ({ params }) => {
	const filePath = path.join(process.cwd(), '/resources/', 'corpus-funktionen.csv');
	const fileContents = fs.readFileSync(filePath, 'utf-8');

	const results = await new Promise((resolve, reject) => {
		Papa.parse(fileContents, {
			complete: (parsed) => resolve(parsed.data),
			error: (error) => reject(error)
		});
	});
	let checkboxNames = [];
	let tmpObject = {};
	results.forEach((element, index) => {
		if (element[9] != '' && element[9] != undefined && index != 0) {
			tmpObject = {
				id: element[8], // id in csv
				name: element[9], // name in csv
				tooltip: element[11], // tooltip in csv
				checked: false,
				visible: true,
				functionName: element[8],
				dataType: element[6].toUpperCase(),
				fixable: element[7],
				fixActivated: false,
				uniqueName: element[8] + '_' + element[6],
				presets: {
					hiat: element[0] == 'x' ? true : false,
					gat: element[1] == 'x' ? true : false,
					transkript: element[2] == 'x' ? true : false,
					korpus: element[3] == 'x' ? true : false,
					meta: element[4] == 'x' ? true : false,
					html: element[5] == 'x' ? true : false
				}
			};
			checkboxNames.push(tmpObject);
		}
	});
	return { data: checkboxNames, params };
}) satisfies PageServerLoad;
