import * as fs from 'fs';

/**
 * @typedef {Object} diffObject
 * @property {string} name
 * @property {string} versionLockFile1
 * @property {string} versionLockFile2
 */

/**
 * @param {string} lockfile1
 * @param {string} lockfile2
 * @returns {diffObject[]}
 */
export function getDependenciesDiff(lockfile1, lockfile2) {
        /** @type []diffObject **/
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

        for (const p1 of Object.keys(lock1['packages'])) {
                for (const p2 of Object.keys(lock2['packages'])) {
                        if (p1 === '' || p2 === '') {
                                continue;
                        }

                        const p1Name = p1.replace('node_modules/', '');
                        const p2Name = p2.replace('node_modules/', '');

                        if (p1Name === p2Name) {
                                const v1 = lock1['packages'][p1]['version'];
                                const v2 = lock2['packages'][p2]['version'];

                                if (v1 != v2) {
                                        /** @type diffObject **/
                                        const d = {
                                                name: p1Name,
                                                versionLockFile1: v1,
                                                versionLockFile2: v2,
                                        };

                                        diff.push(d);
                                }
                        }
                }
        }

        return diff;
}
