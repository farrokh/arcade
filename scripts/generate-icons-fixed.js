const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '../public/logo.svg');
const outputIcon = path.join(__dirname, '../src/app/icon.png');
const outputApple = path.join(__dirname, '../src/app/apple-icon.png');

async function generate() {
  console.log('Generating icons with contain fit...');
  
  try {
    // Generate icon.png (512x512)
    await sharp(input)
      .resize({
        width: 512,
        height: 512,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputIcon);
    console.log('Generated src/app/icon.png');

    // Generate apple-icon.png (512x512)
    await sharp(input)
      .resize({
        width: 512,
        height: 512,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputApple);
    console.log('Generated src/app/apple-icon.png');
    
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generate();
