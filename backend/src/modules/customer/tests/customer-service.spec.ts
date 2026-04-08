import { AppDataSource } from '@/config/data-source';
import { Customer } from '@/modules/customer/customer.entity';
import { Payment } from '@/modules/payment/payment.entity';

import {
  findAllCustomers,
  findCustomerById,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
} from '@/modules/customer/customer.service';

jest.mock('@/config/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

const mockGetRepository = AppDataSource.getRepository as jest.Mock;

function customerRepo() {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };
}

function paymentRepo() {
  return {
    count: jest.fn(),
  };
}

describe('CustomerService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ======================================================
  // findAllCustomers
  // ======================================================

  it('findAllCustomers → devuelve customers', async () => {

    const repo = customerRepo();

    mockGetRepository.mockReturnValue(repo);

    const fake = [{ customer_id: '1', name: 'Juan' }];

    repo.find.mockResolvedValue(fake);

    const result = await findAllCustomers();

    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual(fake);

  });

  // ======================================================
  // findCustomerById
  // ======================================================

  it('findCustomerById → devuelve customer', async () => {

    const repo = customerRepo();

    mockGetRepository.mockReturnValue(repo);

    const fake = { customer_id: '1', name: 'Juan' };

    repo.findOneBy.mockResolvedValue(fake);

    const result = await findCustomerById('1');

    expect(repo.findOneBy).toHaveBeenCalledWith({ customer_id: '1' });
    expect(result).toEqual(fake);

  });

  it('findCustomerById → devuelve null si no existe', async () => {

    const repo = customerRepo();

    mockGetRepository.mockReturnValue(repo);

    repo.findOneBy.mockResolvedValue(null);

    const result = await findCustomerById('x');

    expect(result).toBeNull();

  });

  // ======================================================
  // createCustomerService
  // ======================================================

  it('createCustomerService → crea customer', async () => {

    const repo = customerRepo();

    mockGetRepository.mockReturnValue(repo);

    repo.findOne.mockResolvedValue(null);

    const dto = {
      name: 'Juan',
      email: 'juan@test.com',
      phone: '55 1234-5678',
      address: 'CDMX',
      active: true,
    };

    const created = { ...dto, phone: '5512345678' };
    const saved = { customer_id: '1', ...created };

    repo.create.mockReturnValue(created);
    repo.save.mockResolvedValue(saved);

    const result = await createCustomerService(dto as any);

    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
    expect(result).toEqual(saved);

  });

  it('createCustomerService → EMAIL_IN_USE si email duplicado', async () => {

    const repo = customerRepo();

    mockGetRepository.mockReturnValue(repo);

    repo.findOne.mockResolvedValue({ customer_id: '1' });

    await expect(
      createCustomerService({
        name: 'Juan',
        email: 'dup@test.com',
        phone: '55',
        address: 'CDMX',
      } as any)
    ).rejects.toMatchObject({
      code: 'EMAIL_IN_USE',
    });

  });

  // ======================================================
  // updateCustomerService
  // ======================================================

  it('updateCustomerService → null si no existe', async () => {

    const repo = customerRepo();

    mockGetRepository.mockReturnValue(repo);

    repo.findOneBy.mockResolvedValue(null);

    const result = await updateCustomerService('1', {} as any);

    expect(result).toBeNull();

  });

  it('updateCustomerService → actualiza datos', async () => {

    const repo = customerRepo();

    mockGetRepository.mockReturnValue(repo);

    const existing = {
      customer_id: '1',
      name: 'Old',
      email: 'old@test.com',
      phone: '5511111111',
    };

    repo.findOneBy.mockResolvedValue(existing);
    repo.findOne.mockResolvedValue(null);

    repo.save.mockImplementation(async (e) => e);

    const result = await updateCustomerService('1', {
      email: 'new@test.com',
    } as any);

    expect(repo.save).toHaveBeenCalled();
    expect(result!.email).toBe('new@test.com');

  });

  it('updateCustomerService → EMAIL_IN_USE si email duplicado', async () => {

    const repo = customerRepo();

    mockGetRepository.mockReturnValue(repo);

    repo.findOneBy.mockResolvedValue({ customer_id: '1' });

    repo.findOne.mockResolvedValue({ customer_id: '2' });

    await expect(
      updateCustomerService('1', { email: 'dup@test.com' } as any)
    ).rejects.toMatchObject({
      code: 'EMAIL_IN_USE',
    });

  });

  // ======================================================
  // deleteCustomerService
  // ======================================================

  it('deleteCustomerService → 0 si no existe', async () => {

    const cRepo = customerRepo();
    const pRepo = paymentRepo();

    mockGetRepository.mockImplementation((e) => {
      if (e === Customer) return cRepo;
      if (e === Payment) return pRepo;
    });

    cRepo.findOneBy.mockResolvedValue(null);

    const result = await deleteCustomerService('1');

    expect(result).toBe(0);

  });

  it('deleteCustomerService → error si tiene pagos', async () => {

    const cRepo = customerRepo();
    const pRepo = paymentRepo();

    mockGetRepository.mockImplementation((e) => {
      if (e === Customer) return cRepo;
      if (e === Payment) return pRepo;
    });

    cRepo.findOneBy.mockResolvedValue({ customer_id: '1' });

    pRepo.count.mockResolvedValue(2);

    await expect(deleteCustomerService('1')).rejects.toMatchObject({
      code: 'CUSTOMER_HAS_ACTIVE_PAYMENTS',
    });

  });

  it('deleteCustomerService → elimina customer', async () => {

    const cRepo = customerRepo();
    const pRepo = paymentRepo();

    mockGetRepository.mockImplementation((e) => {
      if (e === Customer) return cRepo;
      if (e === Payment) return pRepo;
    });

    cRepo.findOneBy.mockResolvedValue({ customer_id: '1' });

    pRepo.count.mockResolvedValue(0);

    cRepo.delete.mockResolvedValue({ affected: 1 });

    const result = await deleteCustomerService('1');

    expect(cRepo.delete).toHaveBeenCalled();
    expect(result).toBe(1);

  });

});