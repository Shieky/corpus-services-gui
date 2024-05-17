import fs from 'fs/promises';
import fs_sync from 'fs';
import path from 'path';

import fsFile from 'fs';
import http from 'http';

import type { Actions } from './$types';
import { exec, spawn } from 'child_process';
export const actions: Actions = {
	upload: async ({ request, url }) => {
		try {
			// const data = Object.fromEntries(await request.formData())
			// console.log(data);
			//get all files when multiple files are uploaded
			const fsData = await request.formData();
			const EXBFiles = fsData.getAll('exb_files');
			const COMAFiles = fsData.getAll('coma_files');
			const miscFiles = fsData.getAll('misc_files');
			let codeArray: string[] = [];
			/* get the internal code hidden value */
			const code: string = fsData.get('internalCode') as string;
			/* split the code and push it to the array */
			await code.split(',').forEach((element) => {
				codeArray.push(element);
			});

			// create a temporary folder in /static/uploads
			const randomString = Math.random().toString(36).substring(7);
			const tmpDir = await fs.mkdtemp(
				path.join(process.cwd(), 'static', 'uploads', 'corpus-services-' + randomString)
			);
			if (EXBFiles.length > 0) {
				await uploadFiles(tmpDir, EXBFiles, 'exb_files');
			}

			if (COMAFiles.length > 0) {
				await uploadFiles(tmpDir, COMAFiles, 'coma_files');
			}

			if (miscFiles.length > 0) {
				await uploadFiles(tmpDir, miscFiles, 'misc_files');
			}

			const corpusServicesPath = path.join(process.cwd(), 'resources', 'corpus-services.jar');

			const corpusResponse = await runCorpusServices(corpusServicesPath, tmpDir, codeArray).then(
				(response) => {
					return {
						log: response,
						errorLog: ''
					};
				}
			);

			//make a zip file of the tmpDir folder
			const zipName = await makeZip(tmpDir).then((zipFile) => {
				return zipFile;
			});

			//return the zip file for download
			return {
				status: 200,
				headers: {
					'Content-Type': 'application/zip',
					'Content-Disposition': 'attachement; filename=corpus.zip'
				},
				body: {
					zipName: zipName,
					log: corpusResponse.log['log'],
					errorLog: corpusResponse.log['errorLog']
				}
			};
		} catch (err) {
			console.log('RETURNING ERROR LOG');
			return {
				status: 500,
				body: {
					errorLog: err.message
				}
			};
		}
		// return { success: true };
	}
};

async function uploadFiles(tmpDir: string, allFiles: any, subFolderName: string) {
	//check if folder /exb_files exists, if not create it
	try {
		const exbFilesDir = tmpDir + '/' + subFolderName;
		if (!fs_sync.existsSync(exbFilesDir)) {
			fs_sync.mkdirSync(exbFilesDir);
		}
		// loop through the files and save them to the temporary folder
		for (const file of allFiles) {
			const fl = file as File;
			//sanitize the filename but keep the extension
			const filename = fl.name.replace(/[^a-zA-Z0-9.]/g, '');
			//save the file

			if (filename !== '') {
				fs.writeFile(
					tmpDir + '/' + subFolderName + '/' + filename,
					Buffer.from(await fl.arrayBuffer())
				);
			}
		}
	} catch (error) {
		console.log(error);
	}
}

async function _download(uri: string, url: string) {
	const file = fsFile.createWriteStream('corpus2.zip');
	console.log(uri);
	const hostUrl = url + '/uploads/' + uri;
	const request = http.get(hostUrl, function (response) {
		console.log('downloading');

		response.pipe(file);
		// finish the download
		file.on('finish', function () {
			console.log('finished downloading');

			file.close();
		});
	});
}

async function makeZip(tmpDir: never) {
	return new Promise((resolve, reject) => {
		const zipFile = tmpDir + '.zip';
		const zip = spawn('zip', ['-r', zipFile, tmpDir]);
		zip.stdout.on('data', (data: unknown) => {
			console.log(`stdout: ${data}`);
		});
		zip.stderr.on('data', (data: unknown) => {
			console.error(`stderr: ${data}`);
		});
		zip.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
			if (code === 0) {
				// return the filename
				resolve(zipFile.split('/').pop());
			} else {
				reject(new Error(`Child process exited with code ${code}\n`)); // Reject the promise with the error log
			}
		});
	});
}

function runCorpusServices(corpusServicesPath: string, tmpDir: string, code: string[]) {
	return new Promise((resolve, reject) => {
		/* Create output folder */
		fs_sync.mkdirSync(`${tmpDir}/output`, { recursive: true });
		const tmpdirOutput = `${tmpDir}/output/report_output.html`;

		console.log(code);

		const child = spawn('java', [
			'-Xmx3g',
			'-jar',
			corpusServicesPath,
			'-i',
			tmpDir,
			'-o',
			tmpdirOutput,
			...code
		]);

		let log = '';
		let errorLog = '';
		const logArray: string[] = [];
		child.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
			log += data;
		});

		child.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
			errorLog += data;
		});

		child.on('close', (code) => {
			logArray['log'] = log;
			logArray['errorLog'] = errorLog;
			console.log(`child process exited with code ${code}`);
			if (code === 0) {
				resolve(logArray); // Resolve the promise successfully with the log
			} else {
				reject(new Error(`Child process exited with code ${code}\nError Log: ${errorLog}`)); // Reject the promise with the error log
			}
		});
	});
}
