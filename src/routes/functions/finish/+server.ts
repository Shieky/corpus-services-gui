import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import http from 'http';
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const formData = await request.json();

	/* Parse the formdata and get the functionnames and if they are checked or not */
	const fixFunctions: string[] = [];
	const checkFunctions: string[] = [];
	const internalCodeString: string[] = [];
	let codeString = `java -Xmx3g -jar <your_corpus_services_path> corpus-services -i <your_input_path> -o <your_output_path>`;
	formData.forEach((element: any) => {
		if (element.checked === true && element.fixable === '1') {
			fixFunctions.push(element.functionName);
		} else {
			checkFunctions.push(element.functionName);
		}
	});
	checkFunctions.forEach((element) => {
		codeString += '-c';
		codeString += ' ' + element + ' ';
		internalCodeString.push('-c');
		internalCodeString.push(element);
	});
	fixFunctions.forEach((element) => {
		codeString += '-c ' + element + ' -f ';
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
		/* return the file for download */
		let response = new Response(file, {
			status: 200,
			headers: {
				'Content-Type': 'application/zip',
				'Content-Disposition': `attachment; filename=corpus.zip`
			}
		});
		return response;
	} catch (error) {
		console.log(error);
	}
}

export async function DELETE({ url }) {
	try {
		const params = url.searchParams.get('file');
		const host = path.join(process.cwd(), 'static', 'uploads');
		/* delete the file */
		fs.unlinkSync(host + '/' + params);
		/* remove file extension and delete the folder */
		const folder = params?.split('.')[0];
		fs.rm(host + '/' + folder, { recursive: true }, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('folder deleted');
			}
		});
		return json({ success: true });
	} catch (error) {
		console.log(error);
		return json({ success: false });
	}
}
