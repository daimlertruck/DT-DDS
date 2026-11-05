import { exec } from 'node:child_process';

// Pure function to filter DT packages
export const filterDtPackages = (packages) =>
  packages.filter(
    (pkg) =>
      pkg.packageJson.name.startsWith('@dt-dds/') &&
      pkg.dir.includes('/packages/')
  );

// Error handling wrapper
export const runWithErrorHandling = async (fn) => {
  try {
    await fn();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Execute simple shell command (async wrapper).
export const sh = async (cmd) => {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};
