import * as fs from 'fs';

/**
 * @typedef {Object} DiffObject
 * @property {string} name
 * @property {string} versionLockFile1
 * @property {string} versionLockFile2
 */

/**
 * @typedef {Object.<string, {version: string}>} Dependencies
 */

/**
 * @param {string} lockfile1
 * @param {string} lockfile2
 * @returns {DiffObject[]}
 */
export function getDependenciesDiff(lockfile1, lockfile2) {
        /** @type []DiffObject **/
        const diff = [];

        let lock1;
        let lock2;

        try {
                lock1 = JSON.parse(fs.readFileSync(lockfile1, 'utf8'));
                lock2 = JSON.parse(fs.readFileSync(lockfile2, 'utf8'));

                if (lock1['packages'] === undefined) {
                        lock1['packages'] = lock1['dependencies']
                }

                if (lock2['packages'] === undefined) {
                        lock2['packages'] = lock2['dependencies']
                }
        } catch (e) {
                console.error('Error comparing dependencies form lock files', e);
                process.exit(2);
        }

        /** @type {Dependencies} **/
        const set1 = lock1['packages'];
        /** @type {Dependencies} **/
        const updatedSet1 = Object.entries(set1).reduce((acc, [key, value]) => {
                const newKey = key.replace('node_modules/', '');
                acc[newKey] = value;
                return acc;
        }, {});

        /** @type {Dependencies} **/
        const set2 = lock2['packages'];

        for (const dep2 of Object.keys(set2)) {
                if (dep2 === '') {
                        continue;
                }

                const formattedName = dep2.replace('node_modules/', '');

                if (!updatedSet1[formattedName]) {
                        continue;
                }

                const v1 = updatedSet1[formattedName].version;
                const v2 = set2[dep2].version;

                if (v1 === v2) {
                        continue;
                }

                /** @type DiffObject **/
                const d = {
                        name: formattedName,
                        versionLockFile1: v1,
                        versionLockFile2: v2,
                };

                diff.push(d);
        }

        return diff;
}
