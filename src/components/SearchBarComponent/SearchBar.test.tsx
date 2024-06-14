// 1. displays dropdown when typing
// 2. selects a book on click
// 3. navigates dropdown with keyboard

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import SearchBarComponent from './SearchBar';
import './searchBar.css';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SearchBarComponent', () => {
  it('displays dropdown when typing', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        items: [
          { id: '1', volumeInfo: { title: 'Book 1' } },
          { id: '2', volumeInfo: { title: 'Book 2' } },
        ],
      },
    });

    render(<SearchBarComponent />);

    const input = screen.getByRole('bookinput');
    fireEvent.change(input, { target: { value: 'Book' } });

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('Book 2')).toBeInTheDocument();
    });
  });

  it('selects a book on click', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        items: [
          { id: '1', volumeInfo: { title: 'Book 1' } },
          { id: '2', volumeInfo: { title: 'Book 2' } },
        ],
      },
    });

    render(<SearchBarComponent />);

    const input = screen.getByRole('bookinput');
    fireEvent.change(input, { target: { value: 'Book' } });

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Book 1'));
    expect(input).toHaveValue('Book 1');
  });

  it('navigates dropdown with keyboard', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        items: [
          { id: '1', volumeInfo: { title: 'Book 1' } },
          { id: '2', volumeInfo: { title: 'Book 2' } },
        ],
      },
    });

    render(<SearchBarComponent />);

    const input = screen.getByRole('bookinput');
    fireEvent.change(input, { target: { value: 'Book' } });

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input).toHaveValue('Book 2');
  });
});