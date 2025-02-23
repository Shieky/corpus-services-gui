import type { PageLoad } from './$types';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import type { ParseResult } from 'papaparse';

export type TempCheckboxObject = {
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

export const load: PageLoad = async ({ params }) => {
	console.log('load');
	const filePath = path.join(process.cwd(), '/resources/', 'corpus-funktionen.csv');
	const fileContents = fs.readFileSync(filePath, 'utf-8');

	const results = await parseFile(fileContents);
	console.log(results);
	let tmpObject: TempCheckboxObject;
	const checkboxNames: TempCheckboxObject[] = [];

	/* The presets are built through an CSV file, which is provided in the resources folder */
	// to remove any type we need a seperate object and map the results to it, this will do it for now
	results.forEach((element: any, index) => {
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
};

async function parseFile(fileContents: string) {
	const res: ParseResult<CsvParsingObject> = Papa.parse<CsvParsingObject>(fileContents);
	return res.data;
}
