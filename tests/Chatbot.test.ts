import { Chatbot } from '../src/Chatbot';
import { ChatService } from '../src/interfaces/ChatService';
import { UserInterface } from '../src/interfaces/UserInterface';
import { LoggerService } from '../src/interfaces/LoggerService';  

// Cr�ez des mocks pour les d�pendances
const mockChatService: jest.Mocked<ChatService> = {
  sendMessage: jest.fn(),
  addMessageToConversation: jest.fn(),
  createConversation: jest.fn().mockReturnValue([])  
};

const mockUserInterface: jest.Mocked<UserInterface> = {
  displayMessage: jest.fn(),
  getInput: jest.fn(),
  handleExit: jest.fn()
};

const mockLogger: jest.Mocked<LoggerService> = {
  info: jest.fn(),
  error: jest.fn(),
  log: jest.fn()
};

describe('Chatbot', () => {
  let chatbot: Chatbot;

  beforeEach(() => {
    // R�initialiser les mocks avant chaque test
    jest.clearAllMocks();
    
    // Cr�er une nouvelle instance de Chatbot pour chaque test
    chatbot = new Chatbot(mockChatService, mockUserInterface, mockLogger);
  });

  test('should initialize with empty conversation', () => {
    // Cette v�rification n�cessite que conversation soit accessible
    // Si c'est priv�, vous pourriez avoir besoin de tester indirectement
    expect(chatbot['conversation']).toEqual([]);
  });

  test('should display welcome message on start', async () => {
    // Configure le mock pour terminer apr�s la premi�re interaction
    mockUserInterface.getInput.mockResolvedValueOnce('exit');
    
    await chatbot.start();
    
    expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('marrage du chatbot Claude'));
    expect(mockUserInterface.displayMessage).toHaveBeenCalledWith(
      'Bonjour ! Je suis votre assistant IA Claude.'
    );
  });

  test('should exit when user types exit command', async () => {
    mockUserInterface.getInput.mockResolvedValueOnce('exit');
    
    await chatbot.start();
    
    expect(mockUserInterface.handleExit).toHaveBeenCalled();
    expect(mockLogger.info).toHaveBeenCalledWith('Fin de la conversation');
  });

  test('should process user message and respond', async () => {
    // Configure les mocks pour simuler une conversation
    mockUserInterface.getInput.mockResolvedValueOnce('Hello');
    mockUserInterface.getInput.mockResolvedValueOnce('exit');
    
    mockChatService.addMessageToConversation.mockImplementation((conv, msg) => [...conv, msg]);
    mockChatService.sendMessage.mockResolvedValueOnce('Hi there!');
    
    await chatbot.start();
    
    // V�rifie que le message a �t� ajout� � la conversation
    expect(mockChatService.addMessageToConversation).toHaveBeenCalledWith(
      expect.any(Array),
      { role: 'user', content: 'Hello' }
    );
    
    // V�rifie que la r�ponse a �t� affich�e
    expect(mockUserInterface.displayMessage).toHaveBeenCalledWith('Hi there!');
  });

  test('should handle errors gracefully', async () => {
    mockUserInterface.getInput.mockResolvedValueOnce('Hello');
    mockChatService.sendMessage.mockRejectedValueOnce(new Error('API Error'));
    mockUserInterface.getInput.mockResolvedValueOnce('oui');
    mockUserInterface.getInput.mockResolvedValueOnce('exit');
    
    await chatbot.start();
    
    expect(mockUserInterface.displayMessage).toHaveBeenCalledWith(
      'Une erreur est survenue', 
      'error'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('Erreur de conversation', expect.any(Error));
  });
});