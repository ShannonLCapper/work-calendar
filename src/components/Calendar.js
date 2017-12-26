import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import colors from '../colors';

const verticalCellPadding = `15px`;

const styles = StyleSheet.create({
    table: {
        borderSpacing: 0,
        borderCollapse: `collapse`,
        textAlign: `center`,
    },
    tableHead: {
        backgroundColor: colors.darkGray,
    },
    tableHeadCell: {
        width: `${(100 / 7) - 10}%`,
        fontWeight: `normal`,
        padding: `${verticalCellPadding} 10px`,
    },
    tableBodyCell: {
        padding: `${verticalCellPadding} 0`,
    },
});

function getNumDaysInMonth(year, month) {
    return new Date(year, (month + 1), 0).getDate();
}

const dayStrings = [`Su`, `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`];

class Calendar extends Component {
    render() {
        return (
            <table className={css(styles.table, this.props.textStyles)}>
                <thead className={css(styles.tableHead)}>
                    <tr>
                        {this.getDaysOfWeekHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.getDaysOfMonth(this.props.year, this.props.month)}
                </tbody>
            </table>
        );
    }

    getDaysOfWeekHeader() {
        return dayStrings.map(day => <th key={day} className={css(styles.tableHeadCell)}>{day}</th>);
    }

    getDaysOfMonth(year, month) {
        const numDaysInMonth = getNumDaysInMonth(year, month);

        const rows = [];
        const daysOfMonth = [];
        for (let i = 0; i < numDaysInMonth; i++) {
            const displayDayOfMonth = i + 1;
            daysOfMonth.push(displayDayOfMonth);
        }

        const startingDayOfWeek = new Date(year, month, 1).getDay();

        let allDaysFilled = false;
        let weekCompleted = false;

        let i = 0;
        let currentWeekTds = [];
        while (!(allDaysFilled && weekCompleted)) {
            let contents = null;
            let style = null;
            if (!allDaysFilled && i >= startingDayOfWeek) {
                const dayOfMonth = daysOfMonth.shift();
                const date = new Date(year, month, dayOfMonth);
                contents = dayOfMonth;
                style = this.props.getStyleForDate(date);
            }

            currentWeekTds.push(<td key={i} className={css(styles.tableBodyCell, style)}>{contents}</td>);

            if ((i + 1) % 7 === 0) {
                weekCompleted = true;
                rows.push(<tr key={rows.length}>{currentWeekTds}</tr>);
                currentWeekTds = [];
            }
            else {
                weekCompleted = false;
            }

            if (!daysOfMonth.length) {
                allDaysFilled = true;
            }
            i++;
        }

        return rows;
    }
}

Calendar.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    getStyleForDate: PropTypes.func.isRequired,
    textStyles: PropTypes.object.isRequired,
};

export default Calendar;
