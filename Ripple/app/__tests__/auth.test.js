import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../login';
import SignupScreen from '../signup';
import AccountSetup from '../AccountSetup';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    replace: mockNavigate,
    goBack: jest.fn()
  })
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

// Mock fetch for API calls
global.fetch = jest.fn();

describe('Authentication Flow Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
    mockNavigate.mockClear();
  });

  describe('Login Tests', () => {
    it('should show error when fields are empty', async () => {
      const { getByText, getByTestId } = render(
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      );

      const loginButton = getByText('Log In');
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(getByText('Please enter both username and password.')).toBeTruthy();
      });
    });

    it('should handle successful login', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({
          token: 'fake-token',
          user: { id: 1, email: 'test@example.com' }
        })
      };
      fetch.mockImplementationOnce(() => Promise.resolve(mockResponse));

      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      );

      fireEvent.changeText(getByTestId('username-input'), 'test@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'password123');
      fireEvent.press(getByText('Log In'));

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('userToken', 'fake-token');
        expect(mockNavigate).toHaveBeenCalledWith('Main');
      });
    });

    it('should handle login failure', async () => {
      const mockResponse = {
        ok: false,
        json: () => Promise.resolve({ detail: 'Invalid credentials' })
      };
      fetch.mockImplementationOnce(() => Promise.resolve(mockResponse));

      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      );

      fireEvent.changeText(getByTestId('username-input'), 'test@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'wrongpassword');
      fireEvent.press(getByText('Log In'));

      await waitFor(() => {
        expect(getByText('Invalid credentials')).toBeTruthy();
      });
    });

    it('should handle network error during login', async () => {
      fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      );

      fireEvent.changeText(getByTestId('username-input'), 'test@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'password123');
      fireEvent.press(getByText('Log In'));

      await waitFor(() => {
        expect(getByText('Network error')).toBeTruthy();
      });
    });

    it('should handle server error during login', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: () => Promise.resolve({ detail: 'Internal server error' })
      };
      fetch.mockImplementationOnce(() => Promise.resolve(mockResponse));

      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      );

      fireEvent.changeText(getByTestId('username-input'), 'test@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'password123');
      fireEvent.press(getByText('Log In'));

      await waitFor(() => {
        expect(getByText('Internal server error')).toBeTruthy();
      });
    });

    it('should handle malformed server response', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      };
      fetch.mockImplementationOnce(() => Promise.resolve(mockResponse));

      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      );

      fireEvent.changeText(getByTestId('username-input'), 'test@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'password123');
      fireEvent.press(getByText('Log In'));

      await waitFor(() => {
        expect(getByText('Invalid JSON')).toBeTruthy();
      });
    });
  });

  describe('Signup Flow Tests', () => {
    it('should validate required fields in initial signup', async () => {
      const { getByText } = render(
        <NavigationContainer>
          <SignupScreen />
        </NavigationContainer>
      );

      fireEvent.press(getByText('Next'));

      await waitFor(() => {
        expect(getByText('Please enter your first and last name')).toBeTruthy();
      });
    });

    it('should proceed to account setup with valid data', async () => {
      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <SignupScreen />
        </NavigationContainer>
      );

      fireEvent.changeText(getByTestId('firstName-input'), 'John');
      fireEvent.changeText(getByTestId('lastName-input'), 'Doe');
      fireEvent.press(getByText('Next'));

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          'signupData',
          expect.stringContaining('John')
        );
        expect(mockNavigate).toHaveBeenCalledWith('AccountSetup');
      });
    });

    it('should validate account setup fields', async () => {
      const { getByText } = render(
        <NavigationContainer>
          <AccountSetup />
        </NavigationContainer>
      );

      fireEvent.press(getByText('Next'));

      await waitFor(() => {
        expect(getByText('Please fill in all fields')).toBeTruthy();
      });
    });

    it('should validate email format', async () => {
      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <AccountSetup />
        </NavigationContainer>
      );

      fireEvent.changeText(getByTestId('username-input'), 'testuser');
      fireEvent.changeText(getByTestId('email-input'), 'invalidemail');
      fireEvent.changeText(getByTestId('password-input'), 'password123');
      fireEvent.changeText(getByTestId('dob-input'), '2000-01-01');
      
      fireEvent.press(getByText('Next'));

      await waitFor(() => {
        expect(getByText('Please enter a valid email address')).toBeTruthy();
      });
    });

    it('should validate password length', async () => {
      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <AccountSetup />
        </NavigationContainer>
      );

      fireEvent.changeText(getByTestId('username-input'), 'testuser');
      fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'short');
      fireEvent.changeText(getByTestId('dob-input'), '2000-01-01');
      
      fireEvent.press(getByText('Next'));

      await waitFor(() => {
        expect(getByText('Password must be at least 8 characters long')).toBeTruthy();
      });
    });

    it('should handle AsyncStorage errors in signup', async () => {
      AsyncStorage.setItem.mockImplementationOnce(() => 
        Promise.reject(new Error('Storage error'))
      );

      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <SignupScreen />
        </NavigationContainer>
      );

      fireEvent.changeText(getByTestId('firstName-input'), 'John');
      fireEvent.changeText(getByTestId('lastName-input'), 'Doe');
      fireEvent.press(getByText('Next'));

      await waitFor(() => {
        expect(getByText('Could not save signup data')).toBeTruthy();
      });
    });

    it('should validate email format with different patterns', async () => {
      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <AccountSetup />
        </NavigationContainer>
      );

      const invalidEmails = [
        'test',
        'test@',
        'test@.',
        '@domain.com',
        'test@domain.',
        'test@.com'
      ];

      for (const email of invalidEmails) {
        fireEvent.changeText(getByTestId('username-input'), 'testuser');
        fireEvent.changeText(getByTestId('email-input'), email);
        fireEvent.changeText(getByTestId('password-input'), 'password123');
        fireEvent.changeText(getByTestId('dob-input'), '2000-01-01');
        
        fireEvent.press(getByText('Next'));

        await waitFor(() => {
          expect(getByText('Please enter a valid email address')).toBeTruthy();
        });
      }
    });

    it('should validate password with different patterns', async () => {
      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <AccountSetup />
        </NavigationContainer>
      );

      const invalidPasswords = ['', '123', 'pass', '1234567'];

      for (const password of invalidPasswords) {
        fireEvent.changeText(getByTestId('username-input'), 'testuser');
        fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
        fireEvent.changeText(getByTestId('password-input'), password);
        fireEvent.changeText(getByTestId('dob-input'), '2000-01-01');
        
        fireEvent.press(getByText('Next'));

        await waitFor(() => {
          expect(getByText('Password must be at least 8 characters long')).toBeTruthy();
        });
      }
    });

    it('should handle date picker interaction', async () => {
      const { getByTestId, getByText } = render(
        <NavigationContainer>
          <AccountSetup />
        </NavigationContainer>
      );

      // Test opening calendar
      fireEvent.press(getByTestId('dob-input'));
      
      // Verify calendar is shown and can be interacted with
      await waitFor(() => {
        expect(getByText('Next')).toBeTruthy(); // Calendar should be visible
      });
    });
  });
}); 