import type { PageServerLoad } from './$types';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

type TempCheckboxObject = {
	id: string;
	name: string;
	tooltip: string;
	checked: boolean;
	visible: boolean;
	functionName: string;
	dataType: string;
	fixable: string;
	fixActivated: boolean;
	uniqueName: string;
	presets: {
		hiat: boolean;
		gat: boolean;
		transkript: boolean;
		korpus: boolean;
		meta: boolean;
		html: boolean;
	};
};

type CsvParsingObject = {
	HIAT: string;
	GAT: string;
	Transkript: string;
	Korpus: string;
	Meta: string;
	HTML: string;
	Data: string;
	Fix: string;
	Name: string;
	Anzeigename: string;
	'Web?': string;
	Beschreibung: string;
	Parameter: string;
	Anmerkung: string;
};

export const load = (async ({ params }) => {
	const filePath = path.join(process.cwd(), '/resources/', 'corpus-funktionen.csv');
	const fileContents = fs.readFileSync(filePath, 'utf-8');

	// const results = await new Promise((resolve, reject) => {
	// 	Papa.parse<CsvParsingObject>(fileContents, {
	// 		complete: (parsed) => resolve(parsed.data),
	// 		error: (error: Error) => reject(error)
	// 	});
	// });

	let tmpObject: TempCheckboxObject;

	const checkboxNames: TempCheckboxObject[] = [];

	/* The presets are built through an CSV file, which is provided in the resources folder */
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

async function parseFile(fileContents: string) {
	const res = Papa.parse<CsvParsingObject>(fileContents, {
		delimiter: ';',
		dynamicTyping: true,
		header: true,
		skipEmptyLines: true,
		complete: (parsed) => {
			return parsed.data;
		},
		error: (error: Error) => {
			console.error(error);
		}
	});
}
