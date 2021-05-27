export class GetBrandsJSONQuery {
    private brands: brandsDto

    constructor(brands: brandsDto) {
        this.brands = brands
    }

    execute(): brandsDto {
        return this.brands
    }
}

export interface brandsDto {
    brands: string[]
}