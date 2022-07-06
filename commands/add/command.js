"use strict";

const filterable = require("@lerna/filter-options");

/**
 * @see https://github.com/yargs/yargs/blob/master/docs/advanced.md#providing-a-command-module
 */
exports.command = "add <pkg> [globs..]";

exports.describe = "Add a single dependency to matched packages";

exports.builder = yargs => {
  yargs
    .positional("pkg", {
      describe: "Package name to add as a dependency",
      type: "string",
    })
    .positional("globs", {
      describe: "Optional package directory globs to match",
      type: "array",
    })
    .options({
      D: {
        group: "Command Options:",
        type: "boolean",
        alias: "dev",
        describe: "Save to devDependencies",
      },
      E: {
        group: "Command Options:",
        type: "boolean",
        alias: "exact",
        describe: "Save version exactly",
      },
      registry: {
        group: "Command Options:",
        describe: "Use the specified registry for all npm client operations.",
        type: "string",
        requiresArg: true,
      },
      bootstrap: {
        group: "Command Options:",
        describe: "Automatically chain `lerna bootstrap`.\nPass --no-bootstrap to avoid this.",
        type: "boolean",
        defaultDescription: "true",
      },
    })
    .example(
      "$0 add module-1 packages/prefix-*",
      "Adds the module-1 package to the packages in the 'prefix-' prefixed folders"
    )
    .example("$0 add module-1 --scope=module-2", "Install module-1 to module-2")
    .example("$0 add module-1 --scope=module-2 --dev", "Install module-1 to module-2 in devDependencies")
    .example("$0 add module-1", "Install module-1 in all modules except module-1")
    .example("$0 add module-1 --no-bootstrap", "Skip automatic `lerna bootstrap`")
    .example("$0 add babel-core", "Install babel-core in all modules");

  return filterable(yargs);
};

exports.handler = function handler(argv) {
  return require(".")(argv);
};
