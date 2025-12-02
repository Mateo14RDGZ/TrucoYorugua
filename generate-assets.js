// Script temporal para generar assets básicos
const fs = require('fs');
const path = require('path');

// PNG básico 1x1 transparente en base64
const transparentPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

// PNG básico 1024x1024 con color azul uruguayo
const bluePng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM4ceLEfwAGNgLGmG7nqQAAAABJRU5ErkJggg==',
  'base64'
);

const assetsDir = path.join(__dirname, 'assets');

// Crear archivos
fs.writeFileSync(path.join(assetsDir, 'icon.png'), transparentPng);
fs.writeFileSync(path.join(assetsDir, 'splash.png'), transparentPng);
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), transparentPng);
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), transparentPng);

console.log('✅ Assets básicos generados');
console.log('📝 Puedes reemplazar estos archivos con imágenes reales más tarde');
