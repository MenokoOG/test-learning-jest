import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ItemList from '../src/components/ItemList';

jest.mock('axios');

describe('ItemList Component', () => {
  it('fetches and displays items', async () => {
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];

    axios.get.mockResolvedValue({ data: items });

    render(<ItemList />);

    expect(screen.getByText('Item List')).toBeInTheDocument();

    await waitFor(() => {
      items.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });
  });

  it('handles fetch error', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching data'));

    render(<ItemList />);

    await waitFor(() => {
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
    });
  });
});
