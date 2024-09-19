/** @typedef {import('./package-lock-adapter').diffObject} diffObject **/

/** @enum {string} **/
const COLORS = {
        RED: '\x1b[31m',
        GREEN: '\x1b[32m',
        YELLOW: '\x1b[33m',
        RESET: '\x1b[0m'
};

/** @enum {string} **/
const DIFFERENCES = {
        MAJOR: 'major',
        MINOR: 'minor',
        PATCH: 'patch'
}

/**
 * @param {diffObject[]} diff
 */
export function printReport(diff) {
        const report = diff.map(d => {
                const v1 = d.versionLockFile1.split('-')[0].split('.');
                const v2 = d.versionLockFile2.split('-')[0].split('.');

                /** @type {DIFFERENCES} **/
                let difference;

                if (v1[0] !== v2[0]) {
                        difference = DIFFERENCES.MAJOR;
                } else if (v1[1] !== v2[1]) {
                        difference = DIFFERENCES.MINOR;
                } else {
                        difference = DIFFERENCES.PATCH;
                }

                return {
                        Dependency: d.name,
                        file1: d.versionLockFile1,
                        file2: d.versionLockFile2,
                        difference,
                };
        });

        // I dont want to use external libraries and I do not know how to use colors in console.table :c
        printCustomTable(report)
}

function getColumnWidths(data) {
        const headers = Object.keys(data[0]);
        const columnWidths = headers.map(header => header.length);

        data.forEach(row => {
                Object.values(row).forEach((value, index) => {
                        columnWidths[index] = Math.max(columnWidths[index], String(value).length);
                });
        });

        return columnWidths;
}

function printCustomTable(data) {
        const headers = Object.keys(data[0]);
        const columnWidths = getColumnWidths(data);

        const headerRow = headers.map((header, index) =>
                header.padEnd(columnWidths[index])
        ).join(' | ');
        console.log(headerRow);

        console.log('-'.repeat(headerRow.length));

        data.forEach(row => {
                const formattedRow = Object.values(row).map((value, index) => {
                        if (headers[index] === 'difference') {
                                // if (headers[index] === 'file1' || headers[index] === 'file2') {
                                if (value === DIFFERENCES.MAJOR) {
                                        return `${COLORS.RED}${String(value).padEnd(columnWidths[index])}${COLORS.RESET}`;
                                } else if (value === DIFFERENCES.MINOR) {
                                        return `${COLORS.YELLOW}${String(value).padEnd(columnWidths[index])}${COLORS.RESET}`;
                                } else if (value === DIFFERENCES.PATCH) {
                                        return `${COLORS.GREEN}${String(value).padEnd(columnWidths[index])}${COLORS.RESET}`;
                                }
                        }

                        return String(value).padEnd(columnWidths[index]);
                }).join(' | ');

                console.log(formattedRow);
        });
}
