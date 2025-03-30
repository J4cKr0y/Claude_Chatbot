export interface ChatService {
  /**
   * Envoie un message à l'API d'IA et retourne la réponse
   * @param conversation L'historique de la conversation actuelle
   * @returns La réponse de l'IA
   */
  sendMessage(conversation: any[]): Promise<string>;
  
  /**
   * Crée une nouvelle conversation vide
   * @returns Tableau vide pour nouvelle conversation
   */
  createConversation(): any[];
  
  /**
   * Ajoute un message à la conversation existante
   * @param conversation L'historique de conversation existant
   * @param message Le message à ajouter
   * @returns La conversation mise à jour
   */
  addMessageToConversation(conversation: any[], message: any): any[];
}