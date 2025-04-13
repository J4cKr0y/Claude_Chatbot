import { Chatbot } from './Chatbot';
import { AnthropicChatService } from './services/AnthropicChatService';
import { ConsoleUserInterface } from './ui/ConsoleUserInterface';
import { ConsoleLoggerService } from './services/LoggerService';

async function main() {
  // Initialisation des services
  const logger = new ConsoleLoggerService();
  const chatService = new AnthropicChatService(logger);
  const userInterface = new ConsoleUserInterface();

  // Cr�ation et d�marrage du chatbot
  const chatbot = new Chatbot(chatService, userInterface, logger);
  
  try {
    await chatbot.start();
  } catch (error) {
    logger.error('Erreur fatale dans l\'application', error);
    process.exit(1);
  }
}

// D�marrage de l'application
main().catch(console.error);