import { GetBrandsJSONQuery, brandsDto } from '@/vehicles/application/getBrandsJSONQuery'

describe('getBrandsJSONQuery integration tests', () => {
  it('gets all the brands', async() => {
    const givenBrands = {
        brands: [
            'firstOne',
            'thirdOne',
            'secondOne'
        ]
    }
    const getBrandsQuery = new GetBrandsJSONQuery(givenBrands)
    
    const returnedBrands: brandsDto = await getBrandsQuery.execute()
    
    const expectedBrands: brandsDto = {
        brands: [
        'firstOne',
        'thirdOne',
        'secondOne'
        ]
    }
    expect(returnedBrands).toEqual(expectedBrands)
  })
})
