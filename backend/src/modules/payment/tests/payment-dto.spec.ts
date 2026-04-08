import { validate } from 'class-validator';
import { CreatePaymentDto } from '@/modules/payment/dtos/create-payment.dto';
import { UpdatePaymentDto } from '@/modules/payment/dtos/update-payment.dto';

describe('CreatePaymentDto', () => {

  it('es válido con datos correctos', async () => 
  {

    const dto = Object.assign(new CreatePaymentDto(), {
      customer_id: '550e8400-e29b-41d4-a716-446655440000',
      product_id: '550e8400-e29b-41d4-a716-446655440001',
      method: 'card',
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);

  });

  it('falla si falta customer_id', async () => 
  {

    const dto = Object.assign(new CreatePaymentDto(), {
      product_id: '550e8400-e29b-41d4-a716-446655440001',
      method: 'card',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });

  it('falla si product_id no es UUID', async () => 
  {

    const dto = Object.assign(new CreatePaymentDto(), {
      customer_id: '550e8400-e29b-41d4-a716-446655440000',
      product_id: '123',
      method: 'card',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });

  it('falla si method excede longitud', async () => 
  {

    const dto = Object.assign(new CreatePaymentDto(), {
      customer_id: '550e8400-e29b-41d4-a716-446655440000',
      product_id: '550e8400-e29b-41d4-a716-446655440001',
      method: 'x'.repeat(60),
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });

});


describe('UpdatePaymentDto', () => {

  it('permite objeto vacío', async () => 
  {

    const dto = new UpdatePaymentDto();

    const errors = await validate(dto);

    expect(errors.length).toBe(0);

  });

  it('es válido con status permitido', async () => 
  {

    const dto = Object.assign(new UpdatePaymentDto(), {
      status: 'paid',
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);

  });

  it('falla si status es inválido', async () => 
  {

    const dto = Object.assign(new UpdatePaymentDto(), {
      status: 'unknown',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });

  it('falla si method excede longitud', async () => 
  {

    const dto = Object.assign(new UpdatePaymentDto(), {
      method: 'x'.repeat(60),
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

  });

});