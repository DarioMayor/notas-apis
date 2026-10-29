import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateNotaDto {
  @ApiProperty({ example: 'Llamar al veterinario' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Pedir turno para la semana próxima' })
  @IsString()
  text: string;

  @ApiProperty({ example: 30, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  minutes: number;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  notified?: boolean;
}
