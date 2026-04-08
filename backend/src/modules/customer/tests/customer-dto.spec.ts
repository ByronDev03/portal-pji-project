import { validate } from 'class-validator';

import { CreateCustomerDto } from '@/modules/customer/dtos/create-customer.dto';
import { UpdateCustomerDto } from '@/modules/customer/dtos/update-customer.dto';

describe('CreateCustomerDto', () => {

  it('es válido con datos correctos', async () => 
  {
    const dto = Object.assign(new CreateCustomerDto(), {
      name: 'Juan Pérez',
      email: 'juan@test.com',
      phone: '5512345678',
      address: 'CDMX',
      active: true,
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);

  });


  it('falla si faltan campos obligatorios', async () => 
  {
    const dto = Object.assign(new CreateCustomerDto(), {
      name: 'Juan',
    } as any);

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });


  it('falla si email tiene formato inválido', async () => 
  {
    const dto = Object.assign(new CreateCustomerDto(), {
      name: 'Juan',
      email: 'correo-invalido',
      phone: '5512345678',
      address: 'CDMX',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });


  it('falla si name excede longitud máxima', async () => 
  {

    const dto = Object.assign(new CreateCustomerDto(), {
      name: 'a'.repeat(101),
      email: 'juan@test.com',
      phone: '5512345678',
      address: 'CDMX',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });


  it('falla si phone excede longitud máxima', async () => 
  {

    const dto = Object.assign(new CreateCustomerDto(), {
      name: 'Juan',
      email: 'juan@test.com',
      phone: '1'.repeat(21),
      address: 'CDMX',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });


  it('falla si active no es booleano', async () => 
  {

    const dto = Object.assign(new CreateCustomerDto(), {
      name: 'Juan',
      email: 'juan@test.com',
      phone: '5512345678',
      address: 'CDMX',
      active: 'true',
    } as any);

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });

});


describe('UpdateCustomerDto', () => {

  it('permite objeto vacío', async () => 
  {

    const dto = new UpdateCustomerDto();

    const errors = await validate(dto);

    expect(errors.length).toBe(0);

  });


  it('es válido con subset de campos', async () => 
  {

    const dto = Object.assign(new UpdateCustomerDto(), {
      name: 'Nuevo Nombre',
      email: 'nuevo@test.com',
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);

  });


  it('falla si email es inválido', async () => 
  {

    const dto = Object.assign(new UpdateCustomerDto(), {
      email: 'correo-malo',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });


  it('falla si phone excede longitud', async () => 
  {

    const dto = Object.assign(new UpdateCustomerDto(), {
      phone: '1'.repeat(30),
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });

});