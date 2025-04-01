import { IsDecimal, IsNotEmpty, Min } from 'class-validator';

export class CreatePricingDto {
  @IsDecimal({ decimal_digits: '0,2' }, { message: "Le prix doit être un nombre décimal comportant jusqu'à deux chiffres après la virgule. " })
  @IsNotEmpty({ message: 'Le prix par minute est obligatoire' })
  @Min(0, { message: 'Le prix par minute doit être positif' })
  price_per_min: number;
}