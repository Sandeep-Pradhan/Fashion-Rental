import { DatesActionTypes } from "./dates.types";

export const selectedDates = (id, dates) => ({
  type: DatesActionTypes.SELECTED_DATES,
  payload: { id: id, dates: dates }
});

export const clearDates = () => ({
  type: DatesActionTypes.CLEAR_DATES
});
