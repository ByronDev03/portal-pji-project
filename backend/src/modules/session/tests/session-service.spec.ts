import { AppDataSource } from '@/config/data-source';

import { Session } from '@/modules/session/session.entity';
import { Customer } from '@/modules/customer/customer.entity';

import {
  findAllSessions,
  findSessionById,
  createSessionService,
  updateSessionService,
  deleteSessionService,
} from '@/modules/session/session.service';

jest.mock('@/config/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

const mockGetRepository = AppDataSource.getRepository as jest.Mock;

function createSessionRepoMock() {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };
}

function createCustomerRepoMock() {
  return {
    findOneBy: jest.fn(),
  };
}

describe('SessionService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ======================================================
  // findAllSessions
  // ======================================================

  it('findAllSessions → devuelve todas las sessions', async () => 
  {
    const repo = createSessionRepoMock();

    mockGetRepository.mockImplementation((entity) => {
      if (entity === Session) return repo;
    });

    const fake = [{ session_id: '1' }];

    repo.find.mockResolvedValue(fake);

    const result = await findAllSessions();

    expect(repo.find).toHaveBeenCalledWith({
      relations: { customer: true },
    });

    expect(result).toEqual(fake);

  });

  // ======================================================
  // findSessionById
  // ======================================================

  it('findSessionById → devuelve session si existe', async () => 
  {
    const repo = createSessionRepoMock();

    mockGetRepository.mockImplementation((entity) => {
      if (entity === Session) return repo;
    });

    const fake = { session_id: '1' };

    repo.findOne.mockResolvedValue(fake);

    const result = await findSessionById('1');

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { session_id: '1' },
      relations: { customer: true },
    });

    expect(result).toEqual(fake);

  });

  it('findSessionById → devuelve null si no existe', async () => 
  {
    const repo = createSessionRepoMock();

    mockGetRepository.mockImplementation((entity) => {
      if (entity === Session) return repo;
    });

    repo.findOne.mockResolvedValue(null);

    const result = await findSessionById('no-existe');

    expect(result).toBeNull();

  });

  // ======================================================
  // createSessionService
  // ======================================================

  it('createSessionService → crea session correctamente', async () => 
  {
    const sessionRepo = createSessionRepoMock();
    const customerRepo = createCustomerRepoMock();

    mockGetRepository.mockImplementation((entity) => {
      if (entity === Session) return sessionRepo;
      if (entity === Customer) return customerRepo;
    });

    const dto = {
      customer_id: 'cust-1',
      ip_address: '127.0.0.1',
      user_agent: 'Chrome',
      status: 'active',
    };

    const customer = { customer_id: 'cust-1' };

    const created = { ...dto };
    const saved = { session_id: '1', ...dto };

    customerRepo.findOneBy.mockResolvedValue(customer);

    sessionRepo.create.mockReturnValue(created);
    sessionRepo.save.mockResolvedValue(saved);

    const result = await createSessionService(dto as any);

    expect(customerRepo.findOneBy).toHaveBeenCalledWith({
      customer_id: dto.customer_id,
    });

    expect(sessionRepo.save).toHaveBeenCalledWith(created);

    expect(result).toEqual(saved);

  });

  it('createSessionService → lanza CUSTOMER_NOT_FOUND', async () => 
  {
    const sessionRepo = createSessionRepoMock();
    const customerRepo = createCustomerRepoMock();

    mockGetRepository.mockImplementation((entity) => {
      if (entity === Session) return sessionRepo;
      if (entity === Customer) return customerRepo;
    });

    customerRepo.findOneBy.mockResolvedValue(null);

    const dto = {
      customer_id: 'no-existe',
      ip_address: '127.0.0.1',
      user_agent: 'Chrome',
    };

    await expect(createSessionService(dto as any)).rejects.toMatchObject({
      code: 'CUSTOMER_NOT_FOUND',
    });

  });

  // ======================================================
  // updateSessionService
  // ======================================================

  it('updateSessionService → devuelve null si session no existe', async () => 
  {
    const sessionRepo = createSessionRepoMock();

    mockGetRepository.mockImplementation((entity) => {
      if (entity === Session) return sessionRepo;
    });

    sessionRepo.findOne.mockResolvedValue(null);

    const result = await updateSessionService('no-existe', {});

    expect(result).toBeNull();

  });

  it('updateSessionService → actualiza session', async () => 
  {
    const sessionRepo = createSessionRepoMock();
    const customerRepo = createCustomerRepoMock();

    mockGetRepository.mockImplementation((entity) => {
      if (entity === Session) return sessionRepo;
      if (entity === Customer) return customerRepo;
    });

    const existing = {
      session_id: '1',
      user_agent: 'Old',
      ip_address: '127.0.0.1',
      status: 'active',
    };

    sessionRepo.findOne.mockResolvedValue(existing);

    sessionRepo.save.mockImplementation(async (entity) => entity);

    const result = await updateSessionService('1', {
      status: 'active',
    });

    expect(sessionRepo.save).toHaveBeenCalled();

    expect(result).toEqual(
      expect.objectContaining({
        session_id: '1',
        status: 'active',
      })
    );

  });

  // ======================================================
  // deleteSessionService
  // ======================================================

  it('deleteSessionService → devuelve 1 si elimina', async () => 
  {
    const repo = createSessionRepoMock();

    mockGetRepository.mockImplementation((entity) => {
      if (entity === Session) return repo;
    });

    repo.delete.mockResolvedValue({ affected: 1 });

    const result = await deleteSessionService('1');

    expect(repo.delete).toHaveBeenCalledWith({
      session_id: '1',
    });

    expect(result).toBe(1);

  });

  it('deleteSessionService → devuelve 0 si no elimina', async () => 
  {
    const repo = createSessionRepoMock();

    mockGetRepository.mockImplementation((entity) => {
      if (entity === Session) return repo;
    });

    repo.delete.mockResolvedValue({ affected: 0 });

    const result = await deleteSessionService('no-existe');

    expect(result).toBe(0);

  });

});