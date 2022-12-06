import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app/app.js';
chai.should();

use(chaiHttp);

const newCategory = {
  name: 'name',
  description: 'description'
};

describe('/Category CRUD operations', () => {
  it('It should add a new category', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/categories')
      .send(newCategory);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('code');
    expect(res.body).to.have.property('status').equal(true);
  });
});
