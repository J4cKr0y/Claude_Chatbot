import { ChatService } from '../interfaces/ChatService';
import { LoggerService } from '../interfaces/LoggerService';
import config from '../config/config';

export class AnthropicChatService implements ChatService {
  constructor(private logger: LoggerService, private apiKey = config.apiKey) {}

  /**
   * Envoie un message à l'API Anthropic et retourne la réponse
   * @param conversation L'historique de la conversation
   * @returns La réponse de Claude
   */
  async sendMessage(conversation: any[]): Promise<string> {
    try {
      this.logger.info('Envoi de message à l\'API Anthropic');
      
      // Construction de la requête pour l'API Anthropic
      const messages = conversation.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          messages: messages,
          max_tokens: 1024
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Erreur API Anthropic: ${response.status} - ${errorData}`);
      }
      
      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      this.logger.error('Erreur lors de l\'envoi du message', error);
      throw error;
    }
  }
  
  /**
   * Crée une nouvelle conversation vide
   * @returns Tableau vide pour nouvelle conversation
   */
  createConversation(): any[] {
    return [];
  }
  
  /**
   * Ajoute un message à la conversation existante
   * @param conversation L'historique de conversation existant
   * @param message Le message à ajouter
   * @returns La conversation mise à jour
   */
  addMessageToConversation(conversation: any[], message: any): any[] {
    return [...conversation, message];
  }
}