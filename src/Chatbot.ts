import { ChatService } from './interfaces/ChatService';
import { UserInterface } from './interfaces/UserInterface';
import { LoggerService } from './interfaces/LoggerService';

export class Chatbot {
  private conversation: any[] = [];

  constructor(
    private chatService: ChatService,
    private userInterface: UserInterface,
    private logger: LoggerService
  ) {}

  async start(): Promise<void> {
    this.logger.info('Démarrage du chatbot Claude');
    this.userInterface.displayMessage('Bonjour ! Je suis votre assistant IA Claude.');

    // Ajout d'une condition de sortie plus explicite
    let shouldContinue = true;
    while (shouldContinue) {
      try {
        const userInput = await this.userInterface.getInput();

        if (this.shouldExit(userInput)) {
          this.userInterface.handleExit();
          shouldContinue = false;
          break;
        }

        const userMessage = { 
          role: 'user' as const, 
          content: userInput 
        };

        this.conversation = this.chatService.addMessageToConversation(
          this.conversation, 
          userMessage
        );

        const botResponse = await this.chatService.sendMessage(this.conversation);

        const assistantMessage = { 
          role: 'assistant' as const, 
          content: botResponse 
        };

        this.conversation = this.chatService.addMessageToConversation(
          this.conversation, 
          assistantMessage
        );

        this.userInterface.displayMessage(botResponse);
      } catch (error) {
        this.userInterface.displayMessage(
          'Une erreur est survenue', 
          'error'
        );
        this.logger.error('Erreur de conversation', error);
        
        // Gestion d'erreur sans arrêter la boucle
        const continueChat = await this.userInterface.getInput('Voulez-vous continuer ? (oui/non)');
        shouldContinue = continueChat.toLowerCase() === 'oui';
      }
    }

    this.logger.info('Fin de la conversation');
  }

  private shouldExit(input: string): boolean {
    const exitCommands = ['au revoir', 'exit', 'quit'];
    return exitCommands.includes(input.toLowerCase());
  }
}