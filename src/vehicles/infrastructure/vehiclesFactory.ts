import { GetBrandsJSONQuery } from '@/vehicles/application/getBrandsJSONQuery'
import brands from '@/vehicles/infrastructure/brands.json'

export class VehiclesFactory {
  static GetBrandsQuery(): GetBrandsJSONQuery {
    return new GetBrandsJSONQuery(brands)
  }
}
