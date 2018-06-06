export const getActionTypes = reducers => Object.keys(reducers).reduce((types, type) => (types[type] = type, types), {})
export const connectReducers = (initialState, reducers, dataProp = 'data') => {
  return (state = initialState, action) => (reducers[action.type] || (state => state))(state, dataProp ? action[dataProp] : action)
}
