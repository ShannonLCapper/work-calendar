import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import colors from '../colors';

const styles = StyleSheet.create({
    container: {
        display: `flex`,
        justifyContent: `space-between`,
        backgroundColor: colors.primary,
        color: `white`,
        height: 120,
    },
    header: {
        textAlign: `center`,
        textTransform: `uppercase`,
        letterSpacing: 3,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
    },
    headerText: {
        fontWeight: `normal`,
        margin: 0,
    },
    button: {
        color: `inherit`,
        backgroundColor: `transparent`,
        border: `none`,
        cursor: `pointer`,
        padding: 20,
    },
});

const mapMonthToString = {
    0: `January`,
    1: `February`,
    2: `March`,
    3: `April`,
    4: `May`,
    5: `June`,
    6: `July`,
    7: `August`,
    8: `September`,
    9: `October`,
    10: `November`,
    11: `December`,
};

const MonthPicker = (props) => {
    const displayMonth = mapMonthToString[props.month];
    return (
        <div className={css(styles.container)}>
            <MonthPickerButton
                handleClick={props.goToPrevMonth}
            >
                &#10094;
            </MonthPickerButton>
            <div className={css(styles.header)}>
                <h2 className={css(styles.headerText)}>{displayMonth}</h2>
                <h3 className={css(styles.headerText)}>{props.year}</h3>
            </div>
            <MonthPickerButton
                handleClick={props.goToNextMonth}
            >
                &#10095;
            </MonthPickerButton>
        </div>
    );
};

MonthPicker.propTypes = {
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    goToPrevMonth: PropTypes.func.isRequired,
    goToNextMonth: PropTypes.func.isRequired,
};

const MonthPickerButton = (props) => {
    const handleClick = (e) => {
        e.target.blur();
        props.handleClick();
    };

    return (
        <button
            className={css(styles.button)}
            onClick={handleClick}
        >
            {props.children}
        </button>
    );
};

MonthPickerButton.propTypes = {
    children: PropTypes.node.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default MonthPicker;
