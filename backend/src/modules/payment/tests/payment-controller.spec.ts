import { Request, Response } from 'express';
import { findProductById } from '@/modules/product/product.service';

jest.mock('@/modules/product/product.service', () => ({
  findProductById: jest.fn(),
}));

import {
  listPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
} from '@/modules/payment/payment.controller';

import {
  findAllPayments,
  findPaymentById,
  createPaymentService,
  updatePaymentService,
  deletePaymentService,
} from '@/modules/payment/payment.service';

jest.mock('@/modules/payment/payment.service');

function createMockResponse(): Response {
  const res: Partial<Response> = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res as Response;
}

describe('PaymentController', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFindAllPayments = findAllPayments as jest.Mock;
  const mockFindPaymentById = findPaymentById as jest.Mock;
  const mockCreatePaymentService = createPaymentService as jest.Mock;
  const mockUpdatePaymentService = updatePaymentService as jest.Mock;
  const mockDeletePaymentService = deletePaymentService as jest.Mock;
  const mockFindProductById = findProductById as jest.Mock;

  // =================================================
  // LIST PAYMENTS
  // =================================================

  it('GET listPayments → 200 devuelve lista', async () => 
  {
    const fakePayments = [
      {
        payment_id: 'pay-1',
        customer: { customer_id: 'cust-1' },
        product: { product_id: 'prod-1' },
        amount: '3500.000',
        currency: 'MXN',
        method: 'card',
        status: 'paid',
        external_ref: 'ABC123',
      }
    ];

    mockFindAllPayments.mockResolvedValue(fakePayments);

    const req = {} as Request;
    const res = createMockResponse();

    await listPayments(req, res);

    expect(mockFindAllPayments).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(fakePayments);
  });

  it('GET listPayments → 500 error', async () => 
  {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mockFindAllPayments.mockRejectedValue(new Error());

    const req = {} as Request;
    const res = createMockResponse();

    await listPayments(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error listando payments'
    });

  });

  // =================================================
  // GET PAYMENT
  // =================================================

  it('GET getPayment → 200 encontrado', async () => 
  {
    const fakePayment = {
      payment_id: 'pay-1',
      customer: { customer_id: 'cust-1' },
      product: { product_id: 'prod-1' },
      amount: '3500.000',
      currency: 'MXN',
      method: 'card',
      status: 'paid',
      external_ref: 'ABC123',
    };

    mockFindPaymentById.mockResolvedValue(fakePayment);

    const req = { params: { id: 'pay-1' } } as any;
    const res = createMockResponse();

    await getPayment(req, res);

    expect(mockFindPaymentById).toHaveBeenCalledWith('pay-1');
    expect(res.json).toHaveBeenCalledWith(fakePayment);

  });

  it('GET getPayment → 404', async () => 
  {
    mockFindPaymentById.mockResolvedValue(null);

    const req = { params: { id: 'no-existe' } } as any;
    const res = createMockResponse();

    await getPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  // =================================================
  // CREATE PAYMENT
  // =================================================

  it('POST createPayment → 201 creado', async () =>
  {
    mockFindProductById.mockResolvedValue({
      product_id: 'prod-1'
    });

    const body = {
      customer_id: 'cust-1',
      product_id: 'prod-1',
      method: 'card'
    };

    const saved = {
      payment_id: 'pay-1',
      ...body
    };

    mockCreatePaymentService.mockResolvedValue(saved);

    const req = { body } as Request;
    const res = createMockResponse();

    await createPayment(req, res);

    expect(mockCreatePaymentService).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(saved);

  });

  it('POST createPayment → 400 datos incompletos', async () => 
  {
    const req = {
      body: {
        customer_id: 'cust-1'
      }
    } as Request;

    const res = createMockResponse();

    await createPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

  });

  it('POST createPayment → CUSTOMER_NOT_FOUND', async () => 
  {
    const error: any = new Error();
    error.code = 'CUSTOMER_NOT_FOUND';

    mockCreatePaymentService.mockRejectedValue(error);

    const req = {
      body: {
        customer_id: 'cust-x',
        product_id: 'prod-1',
        method: 'card'
      }
    } as Request;

    const res = createMockResponse();

    await createPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

  });

  // =================================================
  // UPDATE PAYMENT
  // =================================================

  it('PUT updatePayment → 200 actualizado', async () => 
  {
    const body = { status: 'paid' };

    const updated = {
      payment_id: 'pay-1',
      status: 'paid'
    };

    mockUpdatePaymentService.mockResolvedValue(updated);

    const req = {
      params: { id: 'pay-1' },
      body
    } as any;

    const res = createMockResponse();

    await updatePayment(req, res);

    expect(mockUpdatePaymentService).toHaveBeenCalledWith('pay-1', body);
    expect(res.json).toHaveBeenCalledWith(updated);

  });

  it('PUT updatePayment → 404', async () => 
  {
    mockUpdatePaymentService.mockResolvedValue(null);

    const req = {
      params: { id: 'pay-x' },
      body: { status: 'paid' }
    } as any;

    const res = createMockResponse();

    await updatePayment(req, res);

    expect(res.status).toHaveBeenCalledWith(404);

  });

  // =================================================
  // DELETE PAYMENT
  // =================================================

  it('DELETE deletePayment → 204', async () => 
  {
    mockDeletePaymentService.mockResolvedValue(1);

    const req = { params: { id: 'pay-1' } } as any;
    const res = createMockResponse();

    await deletePayment(req, res);

    expect(res.status).toHaveBeenCalledWith(204);

  });

  it('DELETE deletePayment → 404', async () => 
  {
    mockDeletePaymentService.mockResolvedValue(0);

    const req = { params: { id: 'pay-x' } } as any;
    const res = createMockResponse();

    await deletePayment(req, res);

    expect(res.status).toHaveBeenCalledWith(404);

  });
});