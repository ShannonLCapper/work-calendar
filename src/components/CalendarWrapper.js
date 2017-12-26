import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import MonthPicker from './MonthPicker';
import Calendar from './Calendar';
import CalendarLegend from './CalendarLegend';
import ParamPicker from './ParamPicker';
import colors from '../colors';

const styles = StyleSheet.create({
    defaultText: {
        color: colors.defaultText,
    },
    container: {
        maxWidth: 600,
        minWidth: 300,
        margin: `0 auto`,
    },
    calendarWrapper: {
        backgroundColor: colors.gray,
    },
    workDay: {
        backgroundColor: colors.red,
    },
    offDay: {
        backgroundColor: colors.green,
    },
    currentDay: {
        color: colors.darkText,
        fontWeight: `bold`,
    },
    metadata: {
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `space-between`,
    },
});

function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

class CalendarWrapper extends Component {
    constructor(props) {
        super(props);

        const storedStartDate = window.localStorage.getItem(`startDate`);
        const storedDaysOn = window.localStorage.getItem(`daysOn`);
        const storedDaysOff = window.localStorage.getItem(`daysOff`);

        const startDate = storedStartDate ? new Date(storedStartDate) : new Date(2018, 6, 15);
        const currentDate = new Date();
        const useCurrentDate = currentDate > startDate;

        this.state = {
            year: useCurrentDate ? currentDate.getFullYear() : startDate.getFullYear(),
            month: useCurrentDate ? currentDate.getMonth() : startDate.getMonth(),
            startDate,
            numDaysOn: storedDaysOn ? parseInt(storedDaysOn) : 8,
            numDaysOff: storedDaysOff ? parseInt(storedDaysOff) : 12,
        };

        this.goToPrevMonth = this.goToPrevMonth.bind(this);
        this.goToNextMonth = this.goToNextMonth.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleDaysOnChange = this.handleDaysOnChange.bind(this);
        this.handleDaysOffChange = this.handleDaysOffChange.bind(this);
        this.getStyleForDate = this.getStyleForDate.bind(this);
    }

    render() {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.calendarWrapper)}>
                    <MonthPicker
                        month={this.state.month}
                        year={this.state.year}
                        goToPrevMonth={this.goToPrevMonth}
                        goToNextMonth={this.goToNextMonth}
                    />
                    <Calendar
                        month={this.state.month}
                        year={this.state.year}
                        getStyleForDate={this.getStyleForDate}
                        textStyles={styles.defaultText}
                    />
                </div>
                <div className={css(styles.metadata)}>
                    <CalendarLegend
                        textStyle={styles.defaultText}
                        offDayStyles={styles.offDay}
                        workDayStyles={styles.workDay}
                    />
                    <ParamPicker
                        startDate={this.state.startDate}
                        numDaysOn={this.state.numDaysOn}
                        numDaysOff={this.state.numDaysOff}
                        handleStartDateChange={this.handleStartDateChange}
                        handleDaysOnChange={this.handleDaysOnChange}
                        handleDaysOffChange={this.handleDaysOffChange}
                    />
                </div>
            </div>
        );
    }

    handleStartDateChange(newDate) {
        this.setState({
            startDate: newDate,
            month: newDate.getMonth(),
            year: newDate.getFullYear(),
        });
        window.localStorage.setItem(`startDate`, newDate.toString());
    }

    handleDaysOnChange(newValue) {
        this.setState({
            numDaysOn: newValue,
        });
        window.localStorage.setItem(`daysOn`, newValue);
    }

    handleDaysOffChange(newValue) {
        this.setState({
            numDaysOff: newValue,
        });
        window.localStorage.setItem(`daysOff`, newValue);
    }

    getStyleForDate(date) {
        const stylesForDate = [];
        if (isSameDay(date, new Date())) {
            stylesForDate.push(styles.currentDay);
        }
        if (date >= this.state.startDate) {
            const workdayStyle = this.calculateIfWorkDay(date) ? styles.workDay : styles.offDay;
            stylesForDate.push(workdayStyle);
        }
        return stylesForDate;
    }

    calculateIfWorkDay(date) {
        const msFromStartDate = date - this.state.startDate;
        const daysAfterStartDate = msFromStartDate / 1000 / 60 / 60 / 24;

        const index = daysAfterStartDate % (this.state.numDaysOn + this.state.numDaysOff);
        return index < this.state.numDaysOn;
    }

    goToPrevMonth() {
        if (this.state.month === 0) {
            this.setState({
                month: 11,
                year: this.state.year - 1,
            });
            return;
        }
        this.setState({
            month: this.state.month - 1,
        });
    }

    goToNextMonth() {
        if (this.state.month === 11) {
            this.setState({
                month: 0,
                year: this.state.year + 1,
            });
            return;
        }
        this.setState({
            month: this.state.month + 1,
        });
    }
}

export default CalendarWrapper;
