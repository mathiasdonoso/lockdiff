import { getDependenciesDiff } from './package-lock-adapter.js';
import { printReport } from './report-adapter.js';

/**
 * @param {string[]} args
 */
function execute(args) {
        if (args.length < 3) {
                showHelp();
                process.exit(1);
        }

        const diff = getDependenciesDiff(args[1], args[2]);

        if (diff.length === 0) {
                console.log('No dependencies found');
                process.exit(0);
        }

        printReport(diff);

        process.exit(0);
}

function showHelp() {
        console.log(`Usage: npx lockdiff <path/to/package-lock1.json> <path/to/package-lock2.json>

Description:
Compare two package-lock.json files and display the version differences of shared dependencies.

Example:
npx lockdiff ./package-lock1.json ./package-lock2.json
`)
}

export default {
        execute,
};

