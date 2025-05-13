#!/usr/bin/env node
import concurrently from 'concurrently';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory of current script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup logging directory
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create a unique log file for this run
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const logFile = path.join(logsDir, `dev-run-${timestamp}.log`);

// Create file logger
const fileLogger = fs.createWriteStream(logFile, { flags: 'w' });

// Custom console that writes to both stdout and log file
const multiConsole = {
  log: (message) => {
    console.log(message);
    fileLogger.write(message + '\n');
  },
  error: (message) => {
    console.error(message);
    fileLogger.write(`ERROR: ${message}\n`);
  }
};

// Clear console
console.clear();

// Print run header
const runId = Math.random().toString(36).substring(2, 8);
multiConsole.log(chalk.bold.cyan(`=== NEW DEV SERVER RUN (${runId}) - ${new Date().toLocaleString()} ===`));
multiConsole.log(chalk.gray(`Logging to: ${logFile}`));
multiConsole.log('');

// Service configuration
const services = [
  { name: 'types',  command: 'pnpm --filter=@tenstack/types dev' },
  { name: 'db',     command: 'pnpm --filter=@tenstack/db dev' },
  { name: 'server', command: 'pnpm --filter=@tenstack/server dev' },
  { name: 'app',    command: 'pnpm --filter=@tenstack/app dev' },
];

// Define colors for each service - using concurrently's supported color names
const serviceColors = {
  types:  'magenta',
  db:     'yellow',
  server: 'green',
  app:    'red'
};

// Define service icons using simple Unicode characters that work in most terminals
const serviceIcons = {
  'types': '📦 ',   // package
  'db': '💾 ',      // database
  'server': '🖥️ ',  // computer
  'app': '📱 ',      // mobile app
};

// Show startup message with service colors
multiConsole.log('Starting development services with colors:');
Object.entries(serviceColors).forEach(([service, color]) => {
  multiConsole.log(`  ${chalk[color](`[${service}]`)} - ${color}`);
});
multiConsole.log('');

// Run services concurrently
const { result } = concurrently(
  services.map(service => ({
    command: service.command,
    name: service.name,
    prefixColor: serviceColors[service.name],
    prefix: `${serviceIcons[service.name] || ''}[{name}]`,
  })), 
  {
    killOthers: ['failure'],
    timestampFormat: 'HH:mm:ss',
    prefixLength: 17,
  }
);

// Clean up on exit
process.on('exit', () => {
  multiConsole.log(chalk.bold.cyan(`=== DEV SERVER RUN (${runId}) ENDED - ${new Date().toLocaleString()} ===`));
  fileLogger.end();
});

result.then(
  () => process.exit(0),
  () => process.exit(1)
); 