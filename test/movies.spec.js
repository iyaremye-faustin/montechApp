import chai, { expect,use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app/app.js';
;
chai.should();

use(chaiHttp);


const movie = {
  title: 'Test Movie',
  description: 'Best movie',
  category:"name",
  image: 'http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/asteroid_blue.png',
};

describe('/Handle Movie CRUD operations', () => {
  it('It should add a new movie ', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/movies')
      .send(movie);  
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status').equal(true);
    expect(res.body.data).to.have.property('message');
  });

  it('It should get all movies', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/all/movies')
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status').equal(true);
    expect(res.body.data).to.have.property('data');
  });

  it('It should get a movie  by Id', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/1/movies`)
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status').equal(true);
    expect(res.body.data).to.have.property('data');
  });

  it('It should update Accomodation ', async () => {
    const movieupdate = {
      title: 'Test Movie update',
      description: 'Best movie update',
      image: 'http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/asteroid_blue.png',
    };
    const res = await chai
      .request(app)
      .patch(`/api/v1/1/movies/update`)
      .send(movieupdate);
    expect(res.body).to.have.property('status').equal(true);
    expect(res.body.data).to.have.property('data');
    expect(res).to.have.status(200);
  });
});
