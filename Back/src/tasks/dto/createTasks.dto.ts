import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTasksDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  status: boolean;
}