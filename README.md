
## Testing Documentation

This project uses Jest for testing both the backend and frontend components. Below are the steps and configurations used to set up and run the tests.

### Backend Testing

1. **Install Testing Dependencies:**
   Install Jest and Supertest for testing your backend:

   ```bash
   npm install --save-dev jest supertest
   ```

2. **Update `package.json`:**
   Add the test script to your `package.json`:

   ```json
   "scripts": {
       "test": "jest",
       "start": "nodemon server.js"
   }
   ```

3. **Create Test File:**
   Create a `tests` directory at the root of your project and add a test file `items.test.js`:

   ```javascript
   const request = require('supertest');
   const express = require('express');
   const itemsRouter = require('../routes/items');

   const app = express();
   app.use(express.json());
   app.use('/api', itemsRouter);

   describe('GET /api/items', () => {
       it('should respond with a list of items', async () => {
           const response = await request(app).get('/api/items');
           expect(response.status).toBe(200);
           expect(response.body).toEqual([
               { id: 1, name: 'Item 1' },
               { id: 2, name: 'Item 2' },
               { id: 3, name: 'Item 3' }
           ]);
       });
   });
   ```

4. **Run Backend Tests:**

   ```bash
   npm run test
   ```

### Frontend Testing

1. **Install Testing Dependencies:**
   Install Jest and React Testing Library:

   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event babel-jest @babel/preset-env @babel/preset-react
   ```

2. **Configure Babel:**
   Create a `.babelrc` file in the root of your project with the following content:

   ```json
   {
     "presets": ["@babel/preset-env", "@babel/preset-react"]
   }
   ```

3. **Configure Jest:**
   Create a `jest.config.cjs` file in the root of your project:

   ```javascript
   module.exports = {
     testEnvironment: 'jest-environment-jsdom',
     moduleFileExtensions: ['js', 'jsx'],
     transform: {
       '^.+\\.jsx?$': 'babel-jest',
     },
     setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
   };
   ```

4. **Setup Tests File:**
   Create a `setupTests.js` file in the root of your project:

   ```javascript
   import '@testing-library/jest-dom';
   ```

5. **Create Test File:**
   Create a `tests` directory at the root of your frontend project and add a test file `ItemList.test.jsx`:

   ```javascript
   import React from 'react';
   import { render, screen, waitFor } from '@testing-library/react';
   import '@testing-library/jest-dom/extend-expect';
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
   ```

6. **Run Frontend Tests:**

   ```bash
   npm run test
   ```

### Directory Structure

Ensure your project has the following structure:

```plaintext
backend/
├── data/
│   └── data.json
├── routes/
│   └── items.js
├── server.js
├── package.json
└── tests/
    └── items.test.js

frontend/
├── src/
│   ├── components/
│   │   └── ItemList.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tests/
│   └── ItemList.test.jsx
├── package.json
├── jest.config.cjs
├── .babelrc
└── setupTests.js
```

### Running Tests

- **Backend:** Run `npm run test` in the backend directory.
- **Frontend:** Run `npm run test` in the frontend directory.

By following the above steps, you should be able to set up and run tests for both the backend and frontend parts of your application using Jest.