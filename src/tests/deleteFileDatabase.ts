import fs from 'fs';
import path from 'path';

export const deleteFileDatabase = async (fileName: string): Promise<void> => {
    const filePath = path.resolve(
        __dirname,
        '..',
        'database',
        `${fileName}.sqlite3`,
    );

    await fs.promises.unlink(filePath);
};
