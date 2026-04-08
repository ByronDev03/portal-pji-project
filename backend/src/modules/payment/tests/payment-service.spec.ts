import { AppDataSource } from '@/config/data-source';

import {
  findAllPayments,
  findPaymentById,
  createPaymentService,
  updatePaymentService,
  deletePaymentService,
} from '@/modules/payment/payment.service';

import { Payment } from '@/modules/payment/payment.entity';
import { Customer } from '@/modules/customer/customer.entity';
import { Product } from '@/modules/product/product.entity';

jest.mock('@/config/data-source');

describe('PaymentService', () => {

  const mockPaymentRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockCustomerRepo = {
    findOneBy: jest.fn(),
  };

  const mockProductRepo = {
    findOneBy: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {

      if (entity === Payment) return mockPaymentRepo;
      if (entity === Customer) return mockCustomerRepo;
      if (entity === Product) return mockProductRepo;

    });
  });

  // =================================================
  // findAllPayments
  // =================================================

  it('findAllPayments → devuelve lista', async () => 
  {

    const payments = [{ payment_id: 'pay-1' }];

    mockPaymentRepo.find.mockResolvedValue(payments);

    const result = await findAllPayments();

    expect(mockPaymentRepo.find).toHaveBeenCalledWith({
      relations: { customer: true, product: true }
    });

    expect(result).toEqual(payments);

  });

  // =================================================
  // findPaymentById
  // =================================================

  it('findPaymentById → devuelve payment', async () => 
  {

    const payment = { payment_id: 'pay-1' };

    mockPaymentRepo.findOne.mockResolvedValue(payment);

    const result = await findPaymentById('pay-1');

    expect(mockPaymentRepo.findOne).toHaveBeenCalledWith({
      where: { payment_id: 'pay-1' },
      relations: { customer: true, product: true }
    });

    expect(result).toEqual(payment);

  });

  // =================================================
  // createPaymentService
  // =================================================

  it('createPaymentService → crea payment', async () => 
  {

    const dto = {
      customer_id: 'cust-1',
      product_id: 'prod-1',
      method: 'card'
    };

    const customer = { customer_id: 'cust-1' };
    const product = { product_id: 'prod-1', min_monthly_rent: '3500.000' };

    const entity = { id: 'entity' };
    const saved = { payment_id: 'pay-1' };

    mockCustomerRepo.findOneBy.mockResolvedValue(customer);
    mockProductRepo.findOneBy.mockResolvedValue(product);

    mockPaymentRepo.create.mockReturnValue(entity);
    mockPaymentRepo.save.mockResolvedValue(saved);

    const result = await createPaymentService(dto);

    expect(mockCustomerRepo.findOneBy).toHaveBeenCalledWith({
      customer_id: dto.customer_id
    });

    expect(mockProductRepo.findOneBy).toHaveBeenCalledWith({
      product_id: dto.product_id
    });

    expect(mockPaymentRepo.create).toHaveBeenCalled();

    expect(result).toEqual(saved);

  });

  it('createPaymentService → CUSTOMER_NOT_FOUND', async () => 
  {

    mockCustomerRepo.findOneBy.mockResolvedValue(null);

    const dto = {
      customer_id: 'cust-x',
      product_id: 'prod-1',
      method: 'card'
    };

    await expect(createPaymentService(dto))
      .rejects.toMatchObject({ code: 'CUSTOMER_NOT_FOUND' });

  });

  it('createPaymentService → PRODUCT_NOT_FOUND', async () => 
  {

    mockCustomerRepo.findOneBy.mockResolvedValue({ customer_id: 'cust-1' });

    mockProductRepo.findOneBy.mockResolvedValue(null);

    const dto = {
      customer_id: 'cust-1',
      product_id: 'prod-x',
      method: 'card'
    };

    await expect(createPaymentService(dto))
      .rejects.toMatchObject({ code: 'PRODUCT_NOT_FOUND' });

  });

  // =================================================
  // updatePaymentService
  // =================================================

  it('updatePaymentService → actualiza status y paid_at', async () => 
  {

    const existing = {
      payment_id: 'pay-1',
      status: 'pending',
      method: 'card',
      paid_at: null
    };

    mockPaymentRepo.findOne.mockResolvedValue(existing);
    mockPaymentRepo.save.mockResolvedValue(existing);

    const result = await updatePaymentService('pay-1', {
      status: 'paid'
    });

    expect(existing.status).toBe('paid');
    expect(existing.paid_at).toBeInstanceOf(Date);

    expect(result).toEqual(existing);

  });

  it('updatePaymentService → payment no existe', async () => 
  {

    mockPaymentRepo.findOne.mockResolvedValue(null);

    const result = await updatePaymentService('pay-x', {
      status: 'paid'
    });

    expect(result).toBeNull();

  });

  // =================================================
  // deletePaymentService
  // =================================================

  it('deletePaymentService → elimina payment', async () => 
  {

    mockPaymentRepo.delete.mockResolvedValue({
      affected: 1
    });

    const result = await deletePaymentService('pay-1');

    expect(result).toBe(1);

  });

  it('deletePaymentService → payment no existe', async () => 
  {

    mockPaymentRepo.delete.mockResolvedValue({
      affected: 0
    });

    const result = await deletePaymentService('pay-x');

    expect(result).toBe(0);

  });

});