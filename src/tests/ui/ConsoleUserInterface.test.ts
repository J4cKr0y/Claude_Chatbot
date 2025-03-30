import { Chatbot } from '../src/Chatbot';
import { ChatService } from '../src/interfaces/ChatService';
import { UserInterface } from '../src/interfaces/UserInterface';
import { LoggerService } from '../src/services/LoggerService';

// Mocks
class MockChatService implements ChatService {
  sendMessage = jest.fn();
  createConversation = jest.fn();
  addMessageToConversation = jest.fn();
}

class MockUserInterface implements UserInterface {
  getInput = jest.fn();
  displayMessage = jest.fn();
  handleExit = jest.fn();
}

class MockLoggerService implements LoggerService {
  log = jest.fn();
  error = jest.fn();
  info = jest.fn();
}

describe('Chatbot', () => {
  let chatbot: Chatbot;
  let mockChatService: MockChatService;
  let mockUserInterface: MockUserInterface;
  let mockLoggerService: MockLoggerService;

  beforeEach(() => {
    mockChatService = new MockChatService();
    mockUserInterface = new MockUserInterface();
    mockLoggerService = new MockLoggerService();

    chatbot = new Chatbot(
      mockChatService,
      mockUserInterface,
      mockLoggerService
    );
  });

  it('should start and display initial message', async () => {
    // Simule une conversation avec une sortie immédiate
    mockUserInterface.getInput.mockResolvedValueOnce('au revoir');

    await chatbot.start();

    // Vérifie que le message initial est affiché
    expect(mockUserInterface.displayMessage).toHaveBeenCalledWith(
      'Bonjour ! Je suis votre assistant IA Claude.'
    );
  });

  it('should handle user input and get bot response', async () => {
    // Simule une conversation
    mockUserInterface.getInput
      .mockResolvedValueOnce('Bonjour')
      .mockResolvedValueOnce('au revoir');

    // Prépare la réponse du service de chat
    mockChatService.sendMessage.mockResolvedValue('Bonjour! Comment puis-je vous aider?');
    mockChatService.addMessageToConversation.mockImplementation((conv, msg) => [...conv, msg]);

    await chatbot.start();

    // Vérifie les interactions
    expect(mockUserInterface.getInput).toHaveBeenCalledTimes(2);
    expect(mockChatService.sendMessage).toHaveBeenCalledTimes(1);
    expect(mockUserInterface.displayMessage).toHaveBeenCalledWith(
      'Bonjour! Comment puis-je vous aider?'
    );
  });

  it('should handle exit command', async () => {
    // Simule une commande de sortie
    mockUserInterface.getInput.mockResolvedValueOnce('au revoir');

    await chatbot.start();

    // Vérifie que la méthode de sortie est appelée
    expect(mockUserInterface.handleExit).toHaveBeenCalled();
    expect(mockLoggerService.info).toHaveBeenCalled();
  });

  it('should handle errors during conversation', async () => {
    // Simule une erreur lors de l'envoi du message
    mockUserInterface.getInput
      .mockResolvedValueOnce('Bonjour')
      .mockResolvedValueOnce('au revoir');

    mockChatService.sendMessage.mockRejectedValue(new Error('API Error'));

    await chatbot.start();

    // Vérifie la gestion des erreurs
    expect(mockUserInterface.displayMessage).toHaveBeenCalledWith(
      'Une erreur est survenue', 
      'error'
    );
    expect(mockLoggerService.error).toHaveBeenCalled();
  });
});