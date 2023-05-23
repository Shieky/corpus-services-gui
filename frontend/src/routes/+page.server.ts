import type { PageServerLoad } from './$types';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';


export const load = (async ({  }) => {

    const filePath = path.join(process.cwd(), '/resources/', 'corpus-funktionen.csv');
    const fileContents = fs.readFileSync(filePath, 'utf-8');

    const results = await new Promise((resolve, reject) => {
      Papa.parse(fileContents, {
        complete: (parsed) => resolve(parsed.data),
        error: (error) => reject(error)
      });
    });

	return { data: results };
}) satisfies PageServerLoad;
