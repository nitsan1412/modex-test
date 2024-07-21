const request = require('supertest'); 
const app = require('../user-api/server');     

jest.mock('../models/user');        

describe('User routes', () => {
  afterAll(() => jest.clearAllMocks()); 

  it('GET /api/users should retrieve all users', async () => {
    const User = require('../user-api/models/user'); 
    User.find.mockResolvedValueOnce([ {_id: "0239742p49fh9843", name:"999hi", email:"ema567bil@mm.cm"}, {_id: "0239742p49fh9843", name:"8", email:"email@mm.com"}, {_id: "0239742p49fh9843", name:"hi", email:"email@mm.com"}, {_id: "0239742p49fh9843", name:"hi", email:"email@mm.com"} ]);

    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Array)); 
  });

  it('GET /api/users/:id should retrieve a user by ID', async () => {
    const User = require('../user-api/models/user');
    const userId = '0239742p49fh9843'; 
  
    User.findById.mockResolvedValueOnce({_id: "0239742p49fh9843", name:"hi", email:"email@mm.com"});
  
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object)); // Expect a user object
  });

  it('GET /api/users/:id should return 404 for non-existent user', async () => {
    const User = require('../user-api/models/user');
    const userId = '0239742p49fh9843'; 

    User.findById.mockResolvedValueOnce(null);
  
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: 'User not found' });
  });

  it('POST /api/users should create a new user', async () => {
    const User = require('../user-api/models/user');
    const newUser = { name: 'John Doe', email: 'john.doe@example.com' };
  
    User.create.mockResolvedValueOnce(newUser);
  
    const res = await request(app)
      .post('/api/users')
      .send(newUser);
  
    expect(res.statusCode).toBe(201); 
    expect(res.body).toEqual(expect.any(Object)); 
  });
  
  it('POST /api/users should return 400 for invalid data', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({}); 
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: 'Please provide name and email' }); 
  });

  it('PUT /api/users/:id should update a user', async () => {
    const User = require('../user-api/models/user');
    const userId = '0239742p49fh9843';
    const updateData = { name: 'Jane Doe' };
  
    User.findByIdAndUpdate.mockResolvedValueOnce({ /* Updated user object */ });
  
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send(updateData);
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object)); // Expect updated user object
  });
  
  it('PUT /api/users/:id should return 404 for non-existent user', async () => {
    const User = require('../user-api/models/user');
    const userId = '02397843';
    const updateData = { name: 'Jane Doe' };
  
    User.findByIdAndUpdate.mockResolvedValueOnce(null);
  
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send(updateData);
  
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: 'User not found' });
  });

    
  it('DELETE /api/users/:id should return 404 for non-existent user', async () => {
    const User = require('../user-api/models/user');
    const userId = '02397843';
  
    User.findById.mockResolvedValueOnce(null);
  
    const res = await request(app)
      .delete(`/api/users/${userId}`);
  
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: 'User not found' });
  });

  it('DELETE /api/users should delete a user', async () => {
    const User = require('../user-api/models/user');
    const userId = '0239742p49fh9843';
  
    User.delete.mockResolvedValueOnce(userId);
  
    const res = await request(app)
    .delete(`/api/users/${userId}`);
  
    expect(res.statusCode).toBe(201); 
    expect(res.body).toEqual(expect.any(Object)); 
  });


});