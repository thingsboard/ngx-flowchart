///
/// SPDX-FileCopyrightText: Copyright 2016 ThingsBoard, Inc.
/// SPDX-License-Identifier: Apache-2.0
///
/*
 * Checks (or adds) the licence header on the first-party sources.
 *
 * Usage: node scripts/license.mjs [check|format]
 *
 * The header text lives in license-header.txt, which is also the source of the
 * banner stamped onto the built artifact by scripts/license-banner.mjs.
 *
 * The file list is an allow list on purpose: only the directories below are
 * walked, so nothing a contributor happens to have in their working copy
 * (.idea/, coverage/, a stale dist/) can fail the check.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SOURCE_DIRS = ['projects', 'scripts', 'src'];
const SOURCE_FILES = ['eslint.config.mjs'];

const FORMATS = {
  '.mjs': lines => ['///', ...lines.map(line => `/// ${line}`), '///'],
  '.scss': lines => ['/**', ...lines.map(line => ` * ${line}`), ' */'],
  '.ts': lines => ['///', ...lines.map(line => `/// ${line}`), '///']
};

const headerLines = readFileSync('license-header.txt', 'utf8').trimEnd().split('\n');

const formatOf = file => FORMATS[Object.keys(FORMATS).find(extension => file.endsWith(extension))];

const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});

const format = process.argv[2] === 'format';
const files = [...SOURCE_DIRS.flatMap(walk), ...SOURCE_FILES].filter(formatOf).sort();
const missing = [];

for (const file of files) {
  const header = formatOf(file)(headerLines).join('\n');
  const content = readFileSync(file, 'utf8');
  if (content.startsWith(header)) {
    continue;
  }
  if (format) {
    writeFileSync(file, `${header}\n${content}`);
  } else {
    missing.push(file);
  }
}

if (missing.length) {
  console.error(`Licence header missing in ${missing.length} file(s):`);
  missing.forEach(file => console.error(`  ${file}`));
  console.error('\nRun `yarn license:format` to add it.');
  process.exit(1);
}

console.log(`${files.length} source file(s) carry the licence header.`);
