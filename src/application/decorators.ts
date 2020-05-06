export function tryActionAndGetError(action: any): Function {
  return async function (actionArguments: any): Promise<Error> {
    let thrownError
    try {
      await action.execute(actionArguments)
    } catch(error) {
      thrownError = error
    }
    return thrownError
  }
}
