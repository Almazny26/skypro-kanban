const { spawn } = require('child_process');
const path = require('path');

console.log('Запускаю сервер...');
const vite = spawn('npx', ['-y', 'vite'], {
  cwd: path.join(__dirname),
  stdio: 'inherit',
  shell: true
});

vite.on('error', (err) => {
  console.error('Ошибка:', err);
});

vite.on('exit', (code) => {
  console.log(`Сервер завершился с кодом ${code}`);
});

