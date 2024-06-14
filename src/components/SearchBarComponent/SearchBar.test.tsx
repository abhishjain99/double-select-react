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
          { id: '1', volumeInfo: { title: 'Harry Potter and the Deathly Hallows' } },
          { id: '2', volumeInfo: { title: 'Harry Potter and the Prisoner of Azkaban' } },
        ],
      },
    });

    render(<SearchBarComponent />);

    const input = screen.getByRole('bookinput');
    fireEvent.change(input, { target: { value: 'Harry Potter' } });

    await waitFor(() => {
      expect(screen.getByText('Harry Potter and the Deathly Hallows')).toBeInTheDocument();
      expect(screen.getByText('Harry Potter and the Prisoner of Azkaban')).toBeInTheDocument();
    });
  });

  it('selects a book on click', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        items: [
          { id: '1', volumeInfo: { title: 'Harry Potter and the Deathly Hallows' } },
          { id: '2', volumeInfo: { title: 'Harry Potter and the Prisoner of Azkaban' } },
        ],
      },
    });

    render(<SearchBarComponent />);

    const input = screen.getByRole('bookinput');
    fireEvent.change(input, { target: { value: 'Harry Potter' } });

    await waitFor(() => {
      expect(screen.getByText('Harry Potter and the Deathly Hallows')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Harry Potter and the Deathly Hallows'));
    expect(input).toHaveValue('Harry Potter and the Deathly Hallows');
  });

  it('navigates dropdown with keyboard', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        items: [
          { id: '1', volumeInfo: { title: 'Harry Potter and the Deathly Hallows' } },
          { id: '2', volumeInfo: { title: 'Harry Potter and the Prisoner of Azkaban' } },
        ],
      },
    });

    render(<SearchBarComponent />);

    const input = screen.getByRole('bookinput');
    fireEvent.change(input, { target: { value: 'Harry Potter' } });

    await waitFor(() => {
      expect(screen.getByText('Harry Potter and the Deathly Hallows')).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input).toHaveValue('Harry Potter and the Prisoner of Azkaban');
  });
});
