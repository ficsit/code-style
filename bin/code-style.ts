#!/usr/bin/env node
import { CLIEngine } from 'eslint';
import * as fs from 'fs';
import * as globModule from 'glob';
import ignore, { Ignore } from 'ignore';
import * as path from 'path';
import * as util from 'util';

const glob = util.promisify(globModule);
const readFile = util.promisify(fs.readFile);

const ALWAYS_IGNORE = ['.git/'];

main(...process.argv.slice(2));
async function main(...args: string[]) {
  const { command, expressions } = processArgs(args);
  const ignores = await loadIgnores(process.cwd());
  const files = await filesToProcess(ignores, ...expressions);

  process.stderr.write('\n');
  const success = await runEslint(command === 'fix', files);
  process.stderr.write('\n');
  if (!success) {
    process.exit(1);
  }
}

function processArgs([command, ...expressions]: string[]): {
  command: 'test' | 'fix';
  expressions: string[];
} {
  if (command !== 'test' && command !== 'fix') {
    process.stderr.write(`
USAGE: yarn code-style (test|fix) […globs]
\n`);
    process.exit(1);
  }

  if (!expressions.length) expressions = ['**'];

  return { command, expressions };
}

async function runEslint(fix: boolean, files: string[]) {
  const cliEngine = new CLIEngine({ fix });
  const formatter = cliEngine.getFormatter('stylish');

  let success = true;
  const results = [] as CLIEngine.LintResult[];
  for (const file of files) {
    if (cliEngine.isPathIgnored(file)) continue;

    process.stderr.write(`\r\u001b[K… ${file}`);
    const fileReport = cliEngine.executeOnFiles([file]);
    if (fix) {
      CLIEngine.outputFixes(fileReport);
    }

    const fileSuccess = !fileReport.errorCount && !fileReport.warningCount;
    success = success && fileSuccess;

    results.push(...fileReport.results);
    if (!fileSuccess) {
      process.stderr.write(`\r\u001b[K✗ ${file}\n`);
    }

    // We pause here for two reasons:
    // - Give any background processing time to catch up
    // - Give node a place where it can handle a signal (such as SIGINT).
    await new Promise(r => setTimeout(r, 0));
  }

  if (success) {
    process.stderr.write(`\r\u001b[K✔ all files pass\n`);
  } else {
    process.stderr.write(`\r\u001b[K`);
    process.stderr.write(formatter(results));
  }

  if (process.env.REPORT === 'json') {
    process.stdout.write(JSON.stringify(results, null, 2));
  }

  return success;
}

async function loadIgnores(projectRoot: string) {
  const ignores = ignore();
  ignores.add(await readGitignore(projectRoot));
  for (const expression of ALWAYS_IGNORE) {
    ignores.add(expression);
  }

  return ignores;
}

async function filesToProcess(ignores: Ignore, ...expressions: string[]) {
  const files = new Set<string>();
  const statCache = Object.create(null);
  const filter = ignores.createFilter();

  for (const expression of expressions) {
    for (const file of await glob(expression, { statCache, nodir: true, dot: true })) {
      if (!filter(file)) continue;
      files.add(file);
    }
  }

  return Array.from(files);
}

async function readGitignore(projectRoot: string) {
  try {
    return await readFile(path.join(projectRoot, '.gitignore'), 'utf-8');
  } catch {
    return 'node_modules/';
  }
}
