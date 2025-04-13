import { UserInterface } from '../interfaces/UserInterface';
import * as readline from 'readline';

export class ConsoleUserInterface implements UserInterface {
  private rl: readline.Interface;
  
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
  
  /**
   * R�cup�re l'entr�e de l'utilisateur depuis la console
   * @param prompt Message optionnel � afficher avant de r�cup�rer l'entr�e
   * @returns Promise avec la saisie de l'utilisateur
   */
  getInput(prompt: string = '> '): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }
  
  /**
   * Affiche un message � l'utilisateur dans la console
   * @param message Le message � afficher
   * @param type Le type de message (info, error, etc.)
   */
  displayMessage(message: string, type: string = 'info'): void {
    switch (type) {
      case 'error':
        console.error('\x1b[31m' + message + '\x1b[0m'); // Rouge pour erreur
        break;
      case 'warning':
        console.warn('\x1b[33m' + message + '\x1b[0m');  // Jaune pour avertissement
        break;
      case 'success':
        console.log('\x1b[32m' + message + '\x1b[0m');   // Vert pour succ�s
        break;
      case 'info':
      default:
        console.log('\x1b[34m[Claude]:\x1b[0m', message); // Bleu pour Claude
        break;
    }
  }
  
  /**
   * G�re la sortie de l'application en fermant l'interface readline
   */
  handleExit(): void {
    this.displayMessage('Au revoir ! Merci d\'avoir discut� avec Claude.', 'success');
    this.rl.close();
  }
}