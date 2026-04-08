import type { Request, Response } from 'express';

import {
  listSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
} from '@/modules/session/session.controller';

import {
  findAllSessions,
  findSessionById,
  createSessionService,
  updateSessionService,
  deleteSessionService,
} from '@/modules/session/session.service';

jest.mock('@/modules/session/session.service', () => ({
  findAllSessions: jest.fn(),
  findSessionById: jest.fn(),
  createSessionService: jest.fn(),
  updateSessionService: jest.fn(),
  deleteSessionService: jest.fn(),
}));

function createMockResponse(): Response {

  const res: Partial<Response> = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res as Response;

}

describe('SessionController', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFindAll = findAllSessions as jest.Mock;
  const mockFindById = findSessionById as jest.Mock;
  const mockCreate = createSessionService as jest.Mock;
  const mockUpdate = updateSessionService as jest.Mock;
  const mockDelete = deleteSessionService as jest.Mock;

  // ======================================================
  // listSessions
  // ======================================================

  it('listSessions → devuelve sessions', async () => 
  {
    const fake = [{ session_id: '1' }];

    mockFindAll.mockResolvedValue(fake);

    const res = createMockResponse();

    await listSessions({} as Request, res);

    expect(mockFindAll).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(fake);

  });

  it('listSessions → 500 si falla el service', async () => 
  {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mockFindAll.mockRejectedValue(new Error());

    const res = createMockResponse();

    await listSessions({} as Request, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error listando sessions',
    });

  });

  // ======================================================
  // getSession
  // ======================================================

  it('getSession → devuelve session si existe', async () => 
  {
    const fake = { session_id: '1' };

    mockFindById.mockResolvedValue(fake);

    const req = { params: { id: '1' } } as unknown as Request<{ id: string }>;
    const res = createMockResponse();

    await getSession(req, res);

    expect(mockFindById).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith(fake);

  });

  it('getSession → 404 si no existe', async () => 
  {
    mockFindById.mockResolvedValue(null);

    const req = { params: { id: '10' } } as unknown as Request<{ id: string }>;
    const res = createMockResponse();

    await getSession(req, res);

    expect(res.status).toHaveBeenCalledWith(404);

  });

  // ======================================================
  // createSession
  // ======================================================

  it('createSession → 400 si faltan campos', async () => 
  {
    const req = {
      body: { customer_id: '1' },
      headers: {},
      socket: { remoteAddress: '127.0.0.1' }
    } as any;

    const res = createMockResponse();

    await createSession(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockCreate).not.toHaveBeenCalled();

  });

  it('createSession → 201 cuando se crea', async () => 
  {
    const body = {
      customer_id: '1',
      user_agent: 'Chrome',
      status: 'active',
    };

    const saved = { session_id: '1', ...body };

    mockCreate.mockResolvedValue(saved);

    const req = {
      body,
      headers: {},
      socket: { remoteAddress: '127.0.0.1' }
    } as any;

    const res = createMockResponse();

    await createSession(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(saved);

  });

  // ======================================================
  // updateSession
  // ======================================================

  it('updateSession → actualiza correctamente', async () => 
  {
    const updated = { session_id: '1', status: 'inactive' };

    mockUpdate.mockResolvedValue(updated);

    const req = {
      params: { id: '1' },
      body: { status: 'inactive' },
      headers: {},
      socket: { remoteAddress: '127.0.0.1' }
    } as any;

    const res = createMockResponse();

    await updateSession(req, res);

    expect(res.json).toHaveBeenCalledWith(updated);

  });

  it('updateSession → 404 si no existe', async () => 
  {
    mockUpdate.mockResolvedValue(null);

    const req = {
      params: { id: '10' },
      body: {},
      headers: {},
      socket: { remoteAddress: '127.0.0.1' }
    } as any;

    const res = createMockResponse();

    await updateSession(req, res);

    expect(res.status).toHaveBeenCalledWith(404);

  });

  // ======================================================
  // deleteSession
  // ======================================================

  it('deleteSession → 204 si elimina', async () => 
  {
    mockDelete.mockResolvedValue(1);

    const req = { params: { id: '1' } } as unknown as Request<{ id: string }>;
    const res = createMockResponse();

    await deleteSession(req, res);

    expect(mockDelete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(204);

  });

  it('deleteSession → 404 si no existe', async () => 
  {
    mockDelete.mockResolvedValue(0);

    const req = { params: { id: '10' } } as unknown as Request<{ id: string }>;
    const res = createMockResponse();

    await deleteSession(req, res);

    expect(res.status).toHaveBeenCalledWith(404);

  });

});