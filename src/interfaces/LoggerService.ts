export interface LoggerService {
  /**
   * Enregistre un message d'information
   * @param message Le message à enregistrer
   * @param meta Métadonnées optionnelles
   */
  info(message: string, meta?: any): void;
  
  /**
   * Enregistre un message d'erreur
   * @param message Le message d'erreur
   * @param error L'objet d'erreur ou métadonnées
   */
  error(message: string, error?: any): void;
  
  /**
   * Enregistre un message de log général
   * @param message Le message à enregistrer
   * @param meta Métadonnées optionnelles
   */
  log(message: string, meta?: any): void;
}