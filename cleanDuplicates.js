/**
 * Removes duplicate entries from a JSON file by parsing, deduplicating, and rewriting the file.
 * 
 * @param {string} filePath - Path to the JSON file to be deduplicated
 * @throws {Error} If the JSON file is invalid or does not contain an array
 * @description Reads a JSON file, removes duplicate entries using JSON stringification,
 * and writes the unique entries back to the same file with proper indentation.
 */
/**
 * Removes duplicate entries from a JSON file by parsing, deduplicating, and rewriting the file.
 * 
 * @param {string} filePath - Path to the JSON file to be deduplicated
 * @throws {Error} If the JSON file is invalid or does not contain an array
 * @description Reads a JSON file, removes duplicate entries using JSON stringification,
 * and writes the unique entries back to the same file with proper indentation.
 */
const fs = require('fs');

/**
 * Removes duplicate entries from a JSON file by parsing, deduplicating, and rewriting the file.
 * 
 * @throws {Error} If the JSON file is invalid or does not contain an array
 * @description Reads a JSON file, removes duplicate entries using JSON stringification,
 * and writes the unique entries back to the same file with proper indentation.
 */
/**
 * Removes duplicate entries from a specified JSON file.
 * 
 * @param {string} filePath - Path to the JSON file to be deduplicated
 * @throws {Error} If the JSON file contains invalid syntax or is not an array
 * @description Reads a JSON file, removes duplicate entries using JSON stringification,
 * and writes the unique entries back to the same file with proper indentation.
 */
/**
 * Removes duplicate entries from a JSON file by parsing, deduplicating, and rewriting the file.
 * 
 * @param {string} filePath - Path to the JSON file to be deduplicated
 * @throws {Error} If the JSON file is invalid or does not contain an array
 * @description Reads a JSON file, removes duplicate entries using JSON stringification,
 * and writes the unique entries back to the same file with proper indentation.
 */
/**
 * Removes duplicate entries from a JSON file by parsing, deduplicating, and rewriting the file.
 * 
 * @param {string} filePath - Path to the JSON file to be deduplicated
 * @throws {Error} If the JSON file is invalid or does not contain an array
 * @description Reads a JSON file, removes duplicate entries using JSON stringification,
 * and writes the unique entries back to the same file with proper indentation.
 */
try {
  // Lire le fichier JSON
  const filePath = 'c:\\Users\\LENOVO\\DavidKRK.github.io\\playwright-report\\report.json';
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Vérifier si le contenu est un JSON valide
  let jsonData;
  try {
    jsonData = JSON.parse(fileContent);
  } catch (error) {
    throw new Error('Le fichier JSON contient une syntaxe invalide. Veuillez corriger le fichier.');
  }

  // Vérifier si le contenu est un tableau
  if (!Array.isArray(jsonData)) {
    throw new Error('Le contenu du fichier JSON n\'est pas un tableau. Veuillez vérifier le fichier.');
  }

  // Supprimer les doublons
  const uniqueData = Array.from(new Set(jsonData.map(JSON.stringify))).map(JSON.parse);

  // Écrire le contenu nettoyé dans le fichier
  fs.writeFileSync(filePath, JSON.stringify(uniqueData, null, 2), 'utf8');
  console.log('Les doublons dans le fichier JSON ont été nettoyés.');
} catch (error) {
  console.error('Erreur :', error.message);
}