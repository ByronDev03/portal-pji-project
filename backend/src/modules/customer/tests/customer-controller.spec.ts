import type { Request, Response } from 'express';

import {
  listCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '@/modules/customer/customer.controller';

import {
  findAllCustomers,
  findCustomerById,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
} from '@/modules/customer/customer.service';

jest.mock('@/modules/customer/customer.service', () => ({
  findAllCustomers: jest.fn(),
  findCustomerById: jest.fn(),
  createCustomerService: jest.fn(),
  updateCustomerService: jest.fn(),
  deleteCustomerService: jest.fn(),
}));

function createMockResponse(): Response {
  const res: Partial<Response> = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res as Response;
}

describe('CustomerController', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFindAll = findAllCustomers as jest.Mock;
  const mockFindById = findCustomerById as jest.Mock;
  const mockCreate = createCustomerService as jest.Mock;
  const mockUpdate = updateCustomerService as jest.Mock;
  const mockDelete = deleteCustomerService as jest.Mock;

  // ======================================================
  // listCustomers
  // ======================================================

  it('listCustomers → devuelve customers', async () => 
  {
    const fake = [{ customer_id: '1', name: 'Byron' }];

    mockFindAll.mockResolvedValue(fake);

    const res = createMockResponse();

    await listCustomers({} as Request, res);

    expect(mockFindAll).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(fake);

  });

  it('listCustomers → 500 si falla el service', async () => 
  {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mockFindAll.mockRejectedValue(new Error());

    const res = createMockResponse();

    await listCustomers({} as Request, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error listando customers',
    });

  });

  // ======================================================
  // getCustomer
  // ======================================================

  it('getCustomer → devuelve customer si existe', async () => 
  {
    const fake = { customer_id: '1', name: 'Rafael' };

    mockFindById.mockResolvedValue(fake);

    const req = { params: { id: '1' } } as unknown as Request<{ id: string }>;
    const res = createMockResponse();

    await getCustomer(req, res);

    expect(mockFindById).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith(fake);

  });

  it('getCustomer → 404 si no existe', async () => 
  {
    mockFindById.mockResolvedValue(null);

    const req = { params: { id: '10' } } as unknown as Request<{ id: string }>;
    const res = createMockResponse();

    await getCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(404);

  });

  // ======================================================
  // createCustomer
  // ======================================================

  it('createCustomer → 400 si faltan campos', async () => 
  {
    const req = {
      body: { name: 'Maria', email: 'test@mail.com' },
    } as Request;

    const res = createMockResponse();

    await createCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockCreate).not.toHaveBeenCalled();

  });

  it('createCustomer → 201 cuando se crea', async () => 
  {
    const body = {
      name: 'Maria',
      email: 'test@mail.com',
      phone: '777',
      address: 'Mexico',
      active: true,
    };

    const saved = { customer_id: '1', ...body };

    mockCreate.mockResolvedValue(saved);

    const req = { body } as Request;
    const res = createMockResponse();

    await createCustomer(req, res);

    expect(mockCreate).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(saved);

  });

  it('createCustomer → 409 si email ya existe', async () => 
  {
    const error: any = new Error();
    error.code = 'EMAIL_IN_USE';

    mockCreate.mockRejectedValue(error);

    const req = {
      body: {
        name: 'Luis',
        email: 'duplicado@mail.com',
        phone: '777',
        address: 'MX',
      },
    } as Request;

    const res = createMockResponse();

    await createCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(409);

  });

  // ======================================================
  // updateCustomer
  // ======================================================

  it('updateCustomer → actualiza correctamente', async () => 
  {
    const updated = { customer_id: '1', name: 'Nuevo' };

    mockUpdate.mockResolvedValue(updated);

    const req = {
      params: { id: '1' },
      body: { name: 'Nuevo' },
    } as unknown as Request<{ id: string }>;

    const res = createMockResponse();

    await updateCustomer(req, res);

    expect(res.json).toHaveBeenCalledWith(updated);

  });

  it('updateCustomer → 404 si no existe', async () => 
  {
    mockUpdate.mockResolvedValue(null);

    const req = {
      params: { id: '10' },
      body: {},
    } as unknown as Request<{ id: string }>;

    const res = createMockResponse();

    await updateCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(404);

  });

  // ======================================================
  // deleteCustomer
  // ======================================================

  it('deleteCustomer → 204 si elimina', async () => 
  {
    mockDelete.mockResolvedValue(1);

    const req = { params: { id: '1' } } as unknown as Request<{ id: string }>;
    const res = createMockResponse();

    await deleteCustomer(req, res);

    expect(mockDelete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(204);

  });

  it('deleteCustomer → 404 si no existe', async () => 
  {
    mockDelete.mockResolvedValue(0);

    const req = { params: { id: '10' } } as unknown as Request<{ id: string }>;
    const res = createMockResponse();

    await deleteCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(404);

  });

  it('deleteCustomer → 409 si tiene pagos activos', async () => 
  {
    const error: any = new Error();
    error.code = 'CUSTOMER_HAS_ACTIVE_PAYMENTS';

    mockDelete.mockRejectedValue(error);

    const req = { params: { id: '1' } } as unknown as Request<{ id: string }>;
    const res = createMockResponse();

    await deleteCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(409);

  });

});