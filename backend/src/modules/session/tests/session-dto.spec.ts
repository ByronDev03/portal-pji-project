import { validate } from 'class-validator';

import { CreateSessionDto } from '@/modules/session/dtos/create-session.dto';
import { UpdateSessionDto } from '@/modules/session/dtos/update-session.dto';

describe('CreateSessionDto', () => {

  it('es válido con datos correctos', async () => 
  {
    const dto = Object.assign(new CreateSessionDto(), {
      customer_id: '550e8400-e29b-41d4-a716-446655440000',
      ip_address: '127.0.0.1',
      user_agent: 'Chrome',
      status: 'active',
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);

  });

  it('falla si faltan campos obligatorios', async () => 
  {
    const dto = Object.assign(new CreateSessionDto(), {
      customer_id: '550e8400-e29b-41d4-a716-446655440000',
    } as any);

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });

  it('falla si customer_id no es UUID', async () => 
  {
    const dto = Object.assign(new CreateSessionDto(), {
      customer_id: '123',
      ip_address: '127.0.0.1',
      user_agent: 'Chrome',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });

  it('falla si status es inválido', async () => 
  {
    const dto = Object.assign(new CreateSessionDto(), {
      customer_id: '550e8400-e29b-41d4-a716-446655440000',
      ip_address: '127.0.0.1',
      user_agent: 'Chrome',
      status: 'invalid',
    } as any);

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });

});


describe('UpdateSessionDto', () => {

  it('permite objeto vacío', async () => 
  {
    const dto = new UpdateSessionDto();

    const errors = await validate(dto);

    expect(errors.length).toBe(0);

  });

  it('es válido con subset de campos', async () => 
  {
    const dto = Object.assign(new UpdateSessionDto(), {
      status: 'ended',
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });
});