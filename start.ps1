# 🎴 Truco Yorugua - Quick Start Script

Write-Host "🇺🇾 Iniciando Truco Yorugua..." -ForegroundColor Blue
Write-Host ""

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
}
else {
    Write-Host "✗ Node.js no encontrado. Por favor instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar npm
Write-Host "Verificando npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ npm instalado: $npmVersion" -ForegroundColor Green
}
else {
    Write-Host "✗ npm no encontrado" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Verificar si node_modules existe
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error al instalar dependencias" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencias instaladas correctamente" -ForegroundColor Green
}
else {
    Write-Host "✓ Dependencias ya instaladas" -ForegroundColor Green
}

Write-Host ""

# Verificar Firebase config
Write-Host "Verificando configuración de Firebase..." -ForegroundColor Yellow
$firebaseConfig = Get-Content "src\services\firebase.js" -Raw
if ($firebaseConfig -match "TU_API_KEY") {
    Write-Host "⚠️  ADVERTENCIA: Firebase aún no está configurado" -ForegroundColor Yellow
    Write-Host "   Por favor configura Firebase siguiendo FIREBASE_SETUP.md" -ForegroundColor Yellow
}
else {
    Write-Host "✓ Firebase configurado" -ForegroundColor Green
}

Write-Host ""

# Verificar logo
Write-Host "Verificando assets..." -ForegroundColor Yellow
if (Test-Path "assets\logo.png") {
    Write-Host "✓ Logo encontrado" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Logo no encontrado. Por favor agrega logo.png en la carpeta assets/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Iniciando servidor de desarrollo..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Instrucciones:" -ForegroundColor White
Write-Host "1. Escanea el código QR con Expo Go desde tu móvil" -ForegroundColor White
Write-Host "2. Presiona 'r' para recargar" -ForegroundColor White
Write-Host "3. Presiona 'c' para limpiar caché" -ForegroundColor White
Write-Host "4. Presiona 'q' para salir" -ForegroundColor White
Write-Host ""

# Iniciar Expo
npm start
