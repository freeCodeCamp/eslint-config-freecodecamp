import eslint from 'eslint';
import test from 'ava';
import config from '../';

const isObject = obj => !!obj && typeof obj === 'object';

test('test basic properties of config', t => {
  t.truthy(isObject(config.env));
  t.truthy(isObject(config.globals));
  t.truthy(isObject(config.rules));
});

test('validate all rule syntax is correct', t => {
  const CLIEngine = eslint.CLIEngine;

  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: 'eslintrc.json'
  });

  const code = 'const foo = 1\n; const bar = function() {};\nbar(foo);\n';

  t.is(cli.executeOnText(code).errorCount, 0);
});
