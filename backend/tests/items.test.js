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
