import { LoggerService } from '../interfaces/LoggerService';
export { LoggerService };
import fs from 'fs';
import path from 'path';
import config from '../config/config';

export class ConsoleLoggerService implements LoggerService {
  private logDirectory: string;
  
  constructor(logDir = config.logDirectory) {
    this.logDirectory = logDir;
    this.ensureLogDirectoryExists();
  }
  
  /**
   * Enregistre un message d'information
   * @param message Le message à enregistrer
   * @param meta Métadonnées optionnelles
   */
  info(message: string, meta?: any): void {
    this.writeLog('INFO', message, meta);
    console.info(`[INFO] ${message}`);
  }
  
  /**
   * Enregistre un message d'erreur
   * @param message Le message d'erreur
   * @param error L'objet d'erreur ou métadonnées
   */
  error(message: string, error?: any): void {
    this.writeLog('ERROR', message, error);
    console.error(`[ERROR] ${message}`, error || '');
  }
  
  /**
   * Enregistre un message de log général
   * @param message Le message à enregistrer
   * @param meta Métadonnées optionnelles
   */
  log(message: string, meta?: any): void {
    this.writeLog('LOG', message, meta);
    console.log(`[LOG] ${message}`);
  }
  
  /**
   * S'assure que le répertoire de logs existe
   */
  private ensureLogDirectoryExists(): void {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }
  }
  
  /**
   * Écrit un message de log dans le fichier
   */
  private writeLog(level: string, message: string, meta?: any): void {
    try {
      const timestamp = new Date().toISOString();
      const logEntry = {
        timestamp,
        level,
        message,
        meta: meta || null
      };
      
      const logFile = path.join(this.logDirectory, `app-${new Date().toISOString().split('T')[0]}.log`);
      fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    } catch (err) {
      console.error('Erreur lors de l\'écriture des logs:', err);
    }
  }
}