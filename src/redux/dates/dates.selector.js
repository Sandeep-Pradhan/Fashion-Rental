import { createSelector } from "reselect";

const selectedDates = state => state.dates;

export const selectDates = createSelector(
  [selectedDates],
  dates => dates.selectedDates
);
