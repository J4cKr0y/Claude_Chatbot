export interface LoggerService {
  /**
   * Enregistre un message d'information
   * @param message Le message � enregistrer
   * @param meta M�tadonn�es optionnelles
   */
  info(message: string, meta?: any): void;
  
  /**
   * Enregistre un message d'erreur
   * @param message Le message d'erreur
   * @param error L'objet d'erreur ou m�tadonn�es
   */
  error(message: string, error?: any): void;
  
  /**
   * Enregistre un message de log g�n�ral
   * @param message Le message � enregistrer
   * @param meta M�tadonn�es optionnelles
   */
  log(message: string, meta?: any): void;
}