export const actionTypes = reducers => Object.keys(reducers).reduce((types, type) => ({ ...types, [type]: type }), {})
export const connectReducers = (initialState, reducers) => (state = initialState, { type, data }) => (reducers[type] || (state => state))(state, data)

