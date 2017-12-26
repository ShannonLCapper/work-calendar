import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StyleSheet, css } from 'aphrodite';
import colors from '../colors';
import './ParamPicker.css';

const styles = StyleSheet.create({
    container: {
        color: colors.defaultText,
        textAlign: `right`,
    },
    paramPickerItem: {
        marginBottom: 5,
    },
    input: {
        border: `none`,
        backgroundColor: colors.gray,
        color: colors.defaultText,
        [`::placeholder`]: {
            color: colors.lightGray,
        },
        marginLeft: 5,
        marginRight: 5,
        fontSize: `1rem`,
    },
    numberInput: {
        width: 40,
    },
    dateInput: {
        width: 120,
    },
});

class ParamPicker extends Component {
    constructor(props) {
        super(props);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleDaysOnChange = this.handleDaysOnChange.bind(this);
        this.handleDaysOffChange = this.handleDaysOffChange.bind(this);
    }

    render() {
        return (
            <div className={css(styles.container)}>
                <ParamPickerItem className='datepicker-style-override' label='Start date'>
                    <DatePicker
                        selected={moment(this.props.startDate)}
                        onChange={this.handleStartDateChange}
                        className={css(styles.input, styles.dateInput)}
                        popperPlacement='top-end'
                    />
                </ParamPickerItem>
                <ParamPickerItem label='Days on'>
                    <input
                        type='number'
                        placeholder={this.props.numDaysOn}
                        onChange={this.handleDaysOnChange}
                        min='1'
                        className={css(styles.input, styles.numberInput)}
                    />
                </ParamPickerItem>
                <ParamPickerItem label='Days off'>
                    <input
                        type='number'
                        placeholder={this.props.numDaysOff}
                        onChange={this.handleDaysOffChange}
                        min='1'
                        className={css(styles.input, styles.numberInput)}
                    />
                </ParamPickerItem>
            </div>
        );
    }

    handleStartDateChange(newMoment) {
        this.props.handleStartDateChange(newMoment.toDate());
    }

    handleDaysOnChange(e) {
        const newValue = parseInt(e.target.value);
        if (newValue) {
            this.props.handleDaysOnChange(newValue);
        }
    }

    handleDaysOffChange(e) {
        const newValue = parseInt(e.target.value);
        if (newValue) {
            this.props.handleDaysOffChange(newValue);
        }
    }
}


ParamPicker.propTypes = {
    startDate: PropTypes.object.isRequired,
    numDaysOn: PropTypes.number.isRequired,
    numDaysOff: PropTypes.number.isRequired,
    handleStartDateChange: PropTypes.func.isRequired,
    handleDaysOnChange: PropTypes.func.isRequired,
    handleDaysOffChange: PropTypes.func.isRequired,
};

const ParamPickerItem = (props) => {
    const classes = [
        css(styles.paramPickerItem),
        props.className,
    ].join(` `);

    return (
        <div className={classes}>
            <label>{props.label}:</label>
            {props.children}
        </div>
    );
};

ParamPickerItem.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default ParamPicker;
