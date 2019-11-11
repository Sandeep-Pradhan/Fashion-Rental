import { DatesActionTypes } from "./dates.types";

const INITIAL_STATE = {
  selectedDates: {}
};

const dateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DatesActionTypes.SELECTED_DATES:
      //   return {
      //     ...state,
      //     selectedDates: [
      //       ...state.selectedDates,
      //       {
      //         id: action.payload.id,
      //         dates: action.payload.dates
      //       }
      //     ]
      //   };
      console.log("bdajhbahcbaj");
      console.log(state);
      return {
        ...state,
        selectedDates: {
          ...state.selectedDates,
          [action.payload.id]:
            // ...state.selectedDates[action.payload.id],
            action.payload.dates || []
        }
      };

    case DatesActionTypes.CLEAR_DATES:
      return {
        ...state,
        selectedDates: []
      };

    default:
      return state;
  }
};

export default dateReducer;
