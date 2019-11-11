import "./viewDates.component.scss";

import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectedDates } from "../../redux/dates/dates.actions";
import { selectDates } from "../../redux/dates/dates.selector";

class viewDates extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      //    selectedDays: [],
      selectedDays: props.selectDates[props.match.params.id] || [],
      disableDays: [{ before: new Date() }, new Date()]
    };
    // console.log((props.selectDates[props.match.params.id] || []).length);
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;

    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }

    this.setState({ selectedDays });
  }

  save = () => {
    // console.log(this.state.selectedDays);
    // console.log(this.props.match.params.id);
    this.props.selectedDates(
      this.props.match.params.id,
      this.state.selectedDays
    );
    this.props.history.goBack();
  };

  render() {
    // console.log(this.props);
    // console.log(this.props.selectDates[this.props.match.params.id]);
    return (
      <div className="view-date">
        <DayPicker
          numberOfMonths={2}
          canChangeMonth={false}
          disabledDays={this.state.disableDays}
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />
        <div className="btn">
          <button className="save" onClick={this.save}>
            Save
          </button>
          <button
            className="cancel"
            onClick={() => this.props.history.goBack()}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectDates: selectDates
});

const mapDispatchToProps = dispatch => ({
  selectedDates: (item, id) => dispatch(selectedDates(item, id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(viewDates)
);
