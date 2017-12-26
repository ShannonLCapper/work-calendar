import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    legend: {
        fontSize: `.7rem`,
        padding: 10,
    },
    legendItem: {
        display: `flex`,
        alignItems: `center`,
        paddingRight: 10,
    },
    legendSwatch: {
        width: 10,
        height: 10,
        display: `inline-block`,
        margin: 5,
    },
});

const CalendarLegend = props => (
    <div className={css(styles.legend, props.textStyle)}>
        <LegendItem label='Day off' swatchColor={props.offDayStyles}/>
        <LegendItem label='Work day' swatchColor={props.workDayStyles}/>
    </div>
);

CalendarLegend.propTypes = {
    textStyle: PropTypes.object.isRequired,
    offDayStyles: PropTypes.shape({
        backgroundColor: PropTypes.string,
    }),
    workDayStyles: PropTypes.shape({
        backgroundColor: PropTypes.string,
    }),
};

const LegendItem = props => (
    <div className={css(styles.legendItem)}>
        <span className={css(styles.legendSwatch, props.swatchColor)}/>
        {props.label}
    </div>
);

LegendItem.propTypes = {
    label: PropTypes.node.isRequired,
    swatchColor: PropTypes.shape({
        backgroundColor: PropTypes.string,
    }),
};

export default CalendarLegend;
