import { ChatService } from '../interfaces/ChatService';
import { LoggerService } from '../interfaces/LoggerService';
import config from '../config/config';

export class GroqChatService implements ChatService {
  constructor(private logger: LoggerService, private apiKey = config.apiGroqKey) {}

  /**
   * Envoie un message à l'API Groq et retourne la réponse
   * @param conversation L'historique de la conversation
   * @returns La réponse de Groq
   */
  async sendMessage(conversation: any[]): Promise<string> {
    try {
      this.logger.info('Envoi de message à l\'API Groq');
      
      // Construction des messages pour l'API Groq
      const messages = conversation.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Envoi de la requête à l'API Groq
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // Modèle Groq spécifié
          messages: messages,
          max_tokens: 1024
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Erreur API Groq: ${response.status} - ${errorData}`);
      }
      
      const data = await response.json();
      return data.choices[0].message.content; // Accès au texte de la réponse
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