export class GetBrandsJSONQuery {
    private brands: brandsDto

    constructor(brands: brandsDto) {
        this.brands = brands
    }

    execute(): string[] {
        return this.brands.brands
    }
}

interface brandsDto {
    brands: string[]
}