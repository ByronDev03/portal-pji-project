import express from 'express';
import request from 'supertest';

jest.mock('@/modules/session/session.controller', () => ({
  listSessions: jest.fn(),
  getSession: jest.fn(),
  createSession: jest.fn(),
  updateSession: jest.fn(),
  deleteSession: jest.fn(),
}));

import sessionRouter from '@/modules/session/session.routes';

import * as SessionController from '@/modules/session/session.controller';

describe('Session routes', () => {

  const app = express();

  app.use(express.json());
  app.use('/api/sessions', sessionRouter);

  const validUuid = 'a3b658f6-6b97-4c90-9b8d-1c2f6904c4f9';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================================
  // GET /api/sessions
  // =====================================================

  it('GET /api/sessions debería llamar a listSessions', async () => 
  {
    (SessionController.listSessions as jest.Mock).mockImplementation(
      (_req, res) => res.json([])
    );

    const res = await request(app).get('/api/sessions');

    expect(SessionController.listSessions).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);

  });

  // =====================================================
  // GET /api/sessions/:id
  // =====================================================

  it('GET /api/sessions/:id con UUID válido debería llamar a getSession', async () => 
  {
    (SessionController.getSession as jest.Mock).mockImplementation(
      (req, res) => res.json({ session_id: req.params.id })
    );

    const res = await request(app).get(`/api/sessions/${validUuid}`);

    expect(SessionController.getSession).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(res.body.session_id).toBe(validUuid);

  });

  it('GET /api/sessions/:id con UUID inválido debe responder 400', async () => 
  {
    const res = await request(app).get('/api/sessions/123');

    expect(SessionController.getSession).not.toHaveBeenCalled();
    expect(res.status).toBe(400);

  });

  // =====================================================
  // POST /api/sessions
  // =====================================================

  it('POST /api/sessions debería llamar a createSession', async () => 
  {
    (SessionController.createSession as jest.Mock).mockImplementation(
      (req, res) => res.status(201).json({ session_id: validUuid, ...req.body })
    );

    const payload = {
      customer_id: validUuid,
      user_agent: 'Chrome',
      status: 'active',
    };

    const res = await request(app)
      .post('/api/sessions')
      .send(payload);

    expect(SessionController.createSession).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(201);
    expect(res.body.session_id).toBe(validUuid);

  });

  // =====================================================
  // PUT /api/sessions/:id
  // =====================================================

  it('PUT /api/sessions/:id debería llamar a updateSession', async () => 
  {
    (SessionController.updateSession as jest.Mock).mockImplementation(
      (req, res) => res.json({ session_id: req.params.id, ...req.body })
    );

    const res = await request(app)
      .put(`/api/sessions/${validUuid}`)
      .send({ status: 'inactive' });

    expect(SessionController.updateSession).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('inactive');

  });

  // =====================================================
  // DELETE /api/sessions/:id
  // =====================================================

  it('DELETE /api/sessions/:id debería llamar a deleteSession', async () => 
  {
    (SessionController.deleteSession as jest.Mock).mockImplementation(
      (_req, res) => res.status(204).send()
    );

    const res = await request(app).delete(`/api/sessions/${validUuid}`);

    expect(SessionController.deleteSession).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(204);

  });

});