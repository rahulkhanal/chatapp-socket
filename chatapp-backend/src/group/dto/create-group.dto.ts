import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateGroupDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsArray()
    // @IsNumber({}, { each: true })  // Ensures each item in the array is a number
    userIds: number[];
}
