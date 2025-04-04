const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'images';
const outputDir = 'images/optimized';

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Fonction pour optimiser une image
async function optimizeImage(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .resize(1920, 1080, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ quality: 80 })
            .toFile(outputPath);
        
        console.log(`Optimized: ${inputPath} -> ${outputPath}`);
    } catch (error) {
        console.error(`Error optimizing ${inputPath}:`, error);
    }
}

// Parcourir le dossier d'images
fs.readdir(inputDir, async (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, path.basename(file, path.extname(file)) + '.webp');
            await optimizeImage(inputPath, outputPath);
        }
    }
}); 