#!/usr/bin/env node

import lockdiff from './src/lockdiff.js';

lockdiff.execute(process.argv.slice(1));
