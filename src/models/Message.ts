export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  /**
   * Rôle du message (user, assistant ou system)
   */
  role: MessageRole;
  
  /**
   * Contenu du message
   */
  content: string;
  
  /**
   * Horodatage optionnel du message
   */
  timestamp?: Date;
}