// Local storage utilities for offline functionality
export class Storage {
  static set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

// Encryption utilities (ready for implementation)
export class Encrypt {
  static async encrypt(text: string, key?: string): Promise<string> {
    // TODO: Implement AES encryption for production
    // For now, return base64 encoded text as placeholder
    return btoa(text);
  }

  static async decrypt(encryptedText: string, key?: string): Promise<string> {
    // TODO: Implement AES decryption for production
    // For now, return base64 decoded text as placeholder
    try {
      return atob(encryptedText);
    } catch {
      return encryptedText;
    }
  }
}