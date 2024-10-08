import { IsNotEmpty, IsString } from "class-validator";

export class CreateTasksDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
