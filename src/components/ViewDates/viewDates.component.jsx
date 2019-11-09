import "./viewDates.component.scss";

import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class viewDates extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: [],
      disableDays: [{ before: new Date() }, new Date()]
    };
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

  render() {
    // console.log(new Date());
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
          <button className="save">Save</button>
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

// const mapStateToProps = (state, ownProps) => {
//   return { stream: state.streams[ownProps.match.params.id] };
// };

export default withRouter(connect(null)(viewDates));
