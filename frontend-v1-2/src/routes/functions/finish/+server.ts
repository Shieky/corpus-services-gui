import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const formData = await request.json();

	/* Parse the formdata and get the functionnames and if they are checked or not */
	let fixFunctions: string[] = [];
	let checkFunctions: string[] = [];
	let internalCodeString: string[] = [];
	let codeString = `java -Xmx3g -jar <your_corpus_services_path> corpus-services -i <your_input_path> -o <your_output_path>`;
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
		codeString += '-c';
		codeString += ' ' + element + ' ';
		/* 	internalCodeString += '-c';
		internalCodeString += element; */
		internalCodeString.push('-c');
		internalCodeString.push(element);
	});
	fixFunctions.forEach((element) => {
		codeString += '-c ' + element + ' -f ';
		//internalCodeString += '-c ' + element + ' -f ';
		internalCodeString.push('-c');
		internalCodeString.push(element);
		internalCodeString.push('-f');
	});

	return json({
		codeString: codeString,
		internalCodeString: internalCodeString
	});
}

export async function GET({ url }) {
	try {
		const params = url.searchParams.get('file');
		const host = path.join(process.cwd(), 'static', 'uploads');
		/* read the query param */
		const file = fs.readFileSync(host + '/' + params);
		/* return the file for download as a response object*/
		return new Response(file, {
			status: 200,
			headers: {
				'Content-Type': 'application/zip',
				'Content-Disposition': `attachment; filename=corpus.zip`
			}
		});
	} catch (error) {
		console.log(error);
	}
}
