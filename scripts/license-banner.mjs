///
/// SPDX-FileCopyrightText: Copyright 2016 ThingsBoard, Inc.
/// SPDX-License-Identifier: Apache-2.0
///
/*
 * Stamps the licence banner onto the built artifact.
 *
 * Usage: node scripts/license-banner.mjs [--check]
 *
 * The source headers do not survive the build in any predictable shape: rollup
 * keeps only some of them and drops them mid-bundle, and the component styles
 * and the type definitions lose theirs entirely. The release branches are the
 * built output, so this puts exactly one notice at the head of each file a
 * consumer actually loads. --check fails instead of writing, for use as a
 * release gate.
 *
 * The banner uses the /*! form so that downstream minifiers which keep legal
 * comments preserve it.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const PACKAGE = 'dist/ngx-flowchart/package.json';
const TARGETS = ['dist/ngx-flowchart/fesm2022/ngx-flowchart.mjs', 'dist/ngx-flowchart/index.d.ts'];
const THIRD_PARTY = [
  '',
  'Angular port of ngFlowchart, Copyright (c) 2015 ONE LOGIC, MIT licensed.',
  'See LICENSE, NOTICE and licenses/LICENSE-ngFlowchart in this package.'
];

if (!existsSync(PACKAGE)) {
  console.error(`${PACKAGE} not found — run \`yarn build\` first.`);
  process.exit(1);
}

const headerLines = readFileSync('license-header.txt', 'utf8').trimEnd().split('\n');
const { name } = JSON.parse(readFileSync(PACKAGE, 'utf8'));
const banner = [
  '/*!',
  ...[name, ...headerLines, ...THIRD_PARTY].map(line => (line ? ` * ${line}` : ' *')),
  ' */'
].join('\n');

const check = process.argv.includes('--check');
const unstamped = [];

for (const target of TARGETS) {
  if (!existsSync(target)) {
    console.error(`${target} not found — run \`yarn build\` first.`);
    process.exit(1);
  }
  const content = readFileSync(target, 'utf8');
  if (content.startsWith(banner)) {
    continue;
  }
  if (check) {
    unstamped.push(target);
  } else {
    writeFileSync(target, `${banner}\n${content}`);
  }
}

if (unstamped.length) {
  console.error(`Licence banner missing in ${unstamped.length} built file(s):`);
  unstamped.forEach(target => console.error(`  ${target}`));
  console.error('\nRun `yarn build` (or `node scripts/license-banner.mjs`) to add it.');
  process.exit(1);
}

console.log(`${TARGETS.length} built file(s) carry the licence banner.`);
