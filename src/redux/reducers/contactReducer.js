const initialState = [
  { id: 0, name: "maede",family:"naseri",email: "email@email.com", phone: 1234567890 ,relative:'friend'},
  { id: 1, name: "zahra",family:"gorji", email: "test@test.com", phone: 4567891230,relative:"family" },
];

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "DELETE_CONTACT":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;
    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;
    case "RESET_CONTACT":
      state = [{ name: null, email: null, phone: null ,family:null,relative:null}];
      return state;
    default:
      return state;
  }
};
