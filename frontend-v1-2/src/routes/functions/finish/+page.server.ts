import { fail, type Actions } from '@sveltejs/kit';
import fs, { writeFile, writeFileSync } from 'fs';
import os from 'os';
import path from 'path';
export const actions: Actions = {
	/* form action: upload data to temp folder, then process the files with the corpus-services.jar
	then return the temporary output folder to the user */
	upload: async ({ request }) => {
		let tmpDir: never;
		let tmpdirOutput;
		const randomString = Math.random().toString(36).substring(7);
		/* get uploaded data */
		const formData = await request.formData();
		// check if one file is uploaded

		if (formData.get('exb_files')?.name != undefined) {
			/* create a temporary folder */
			try {
				tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'corpus-services-' + randomString));
				tmpdirOutput = tmpDir + '/output';
				/* create the command string */
				const commandString =
					'java -Xmx3g -jar ../../../../resources/corpus-services-ng-1.0.jar corpus-services -i ' +
					tmpDir +
					' -o ' +
					tmpdirOutput +
					' ';

				/* save the uploaded files to the temporary folder */
				formData.forEach((value, key) => {
					if (key == 'exb_files') {
						const file = value as File;
						console.info(file);
						writeFileSync(tmpDir + '/' + file.name, Buffer.from(file?.arrayBuffer()));
					}
				});
			} catch (err) {
				console.error(err);
			}
		}
		return { success: true };
	}
};
