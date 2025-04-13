export interface UserInterface {
  /**
   * Récupère l'entrée de l'utilisateur
   * @param prompt Message optionnel à afficher avant de récupérer l'entrée
   * @returns La saisie de l'utilisateur
   */
  getInput(prompt?: string): Promise<string>;
  
  /**
   * Affiche un message à l'utilisateur
   * @param message Le message à afficher
   * @param type Le type de message (info, error, etc.)
   */
  displayMessage(message: string, type?: string): void;
  
  /**
   * Gère la sortie de l'application
   */
  handleExit(): void;
}