import fs from 'fs/promises'
import fs_sync from 'fs'
import path from 'path'
import type {Actions } from './$types'
import {spawn} from 'child_process';
export const actions: Actions = {

	upload: async ({ request }) => {

		try {
			// const data = Object.fromEntries(await request.formData())
			// console.log(data);
				//get all files when multiple files are uploaded
			const fsData = await request.formData();
			const EXBFiles = fsData.getAll('exb_files');
			const COMAFiles = fsData.getAll('coma_files');
			const miscFiles = fsData.getAll('misc_files');
			// create a temporary folder in /static/uploads
			const randomString = Math.random().toString(36).substring(7);
			const tmpDir = await fs.mkdtemp(path.join(process.cwd(), 'static', 'uploads', 'corpus-services-' + randomString));
			const tmpdirOutput = tmpDir + '/output';
			//run exb first
			await uploadFiles(tmpDir, EXBFiles, 'exb_files');
			//run coma upload next
			await uploadFiles(tmpDir, COMAFiles, 'coma_files');
			//then misc files
			await uploadFiles(tmpDir, miscFiles, 'misc_files');

			//run the corpus java program
			// const child = spawn('java', ['-jar', 'corpus-services.jar', tmpDir, tmpdirOutput]);
			// child.stdout.on('data', (data: any) => {
			// 	console.log(`stdout: ${data}`);
			// });
			// child.stderr.on('data', (data: any) => {
			// 	console.error(`stderr: ${data}`);
			// });
			// child.on('close', (code: any) => {
			// 	console.log(`child process exited with code ${code}`);
			// });

			//make a zip file of the tmpDir folder
			const zipFile = tmpDir + '.zip';
			const zip = spawn('zip', ['-r', zipFile, tmpDir]);
			zip.stdout.on('data', (data: any) => {
				console.log(`stdout: ${data}`);
			});
			zip.stderr.on('data', (data: any) => {
				console.error(`stderr: ${data}`);
			});
			zip.on('close', (code: any) => {
				console.log(`child process exited with code ${code}`);
			});
			//get zip filename
			const zipFilename = zipFile.split('/').pop();
			//return the zip file for download
			return {
				status: 200,
				headers: {
					"Content-Type": "application/zip",
					"Content-Disposition": "attachement; filename=dummy.zip"
				}, body: "/uploads/"+zipFilename
			};
		} catch (err) {
			console.error(err);
		}
		// return { success: true };
	}

};

async function uploadFiles(tmpDir: string, allFiles: any, subFolderName: string) {
			//check if folder /exb_files exists, if not create it
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
				fs.writeFile(tmpDir + '/' + subFolderName + '/' + filename, Buffer.from(await fl.arrayBuffer()));
			}

}