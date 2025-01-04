import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string

    @IsNumber({
        maxDecimalPlaces: 2
    })
    @IsPositive()
    price: number
}
