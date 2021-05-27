import { GetBrandsJSONQuery } from '@/vehicles/application/getBrandsJSONQuery'

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
    
    const returnedBrands: string[] = await getBrandsQuery.execute()
    
    const expectedBrands = [
        'firstOne',
        'thirdOne',
        'secondOne'
    ]
    expect(returnedBrands).toEqual(expectedBrands)
  })
})
