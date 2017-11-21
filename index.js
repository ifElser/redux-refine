export const actionTypes = reducers => Object.keys(reducers).reduce((types, type) => ({ ...types, [type]: type }), {})
export const connectReducers = (initialState, reducers, dataPropName = 'data') => {
  return (state = initialState, action) => (reducers[action.type] || (state => state))(state, dataPropName ? action[dataPropName] : action)
}
