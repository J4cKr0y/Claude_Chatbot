import dotenv from 'dotenv';
import path from 'path';

// Charge les variables d'environnement depuis le fichier .env
dotenv.config();

/**
 * Configuration de l'application
 */
const config = {
  // Cl� API pour le service Anthropic
  apiKey: process.env.ANTHROPIC_API_KEY || '',
  apiGroqKey: process.env.GROK_API_KEY || '',
  
  // Mod�le Claude � utiliser
  model: process.env.CLAUDE_MODEL || 'claude-3-sonnet-20240229',
  
  // R�pertoire pour les logs
  logDirectory: process.env.LOG_DIRECTORY || path.join(process.cwd(), 'logs'),
  
  // Configurations suppl�mentaires
  maxTokens: parseInt(process.env.MAX_TOKENS || '1024', 10),
  temperature: parseFloat(process.env.TEMPERATURE || '0.7'),
  
  // Message d'accueil personnalis�
  welcomeMessage: process.env.WELCOME_MESSAGE || 'Bonjour ! Je suis votre assistant IA Claude.'
};

// V�rifie si la cl� API est d�finie
if (!config.apiKey) {
  console.warn('?? ATTENTION: La cl� API Anthropic n\'est pas d�finie. Veuillez la configurer dans le fichier .env');
}

export default config;