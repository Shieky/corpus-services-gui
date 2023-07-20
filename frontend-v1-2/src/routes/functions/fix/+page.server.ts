import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import type { PageServerLoad, Actions } from './$types';

export const actions: Actions = {
	fix: async ({ request }) => {
		const formData = await request.formData();

		const data = {};
		for (let [key, value] of formData.entries()) {
			data[key] = key;
		}
		let checkboxData = await getCSVData(data);
		return {
			body: data,
			data: checkboxData
		};
	}
};

async function getCSVData(data: {}) {
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
				dataType: element[6],
				fixable: element[7],
				fixActivated: false,
				presets: {
					hiat: element[0] == 'x' ? true : false,
					gat: element[1] == 'x' ? true : false,
					transkript: element[2] == 'x' ? true : false,
					korpus: element[3] == 'x' ? true : false,
					meta: element[4] == 'x' ? true : false,
					html: element[5] == 'x' ? true : false
				}
			};
			// check if data key is == to id in csv
			if (data[tmpObject.functionName] == tmpObject.functionName) {
				//only push if not already in array
				if (!checkboxNames.includes(tmpObject)) {
					checkboxNames.push(tmpObject);
				}
			}
		}
	});
	return { data: checkboxNames };
}
