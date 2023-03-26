import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function RentToIncomeRatioChart(props) {
	const options = {
		title: {
			display: true,
			text: 'Rent-to-Income Income Calculator',
			fontSize: 13,
		},
		legend: {
			display: false,
			position: 'right',
		},
		tooltips: {
			callbacks: {
				label: function (tooltipItem) {
					return (
						'Person with annual income $' +
						Number(tooltipItem.xLabel) +
						'k can pay $' +
						Math.round(Number(tooltipItem.yLabel))
					);
				},
			},
		},
		scales: {
			yAxes: [
				{
					ticks: {
						callback: function (value) {
							return '$' + value;
						},
					},
					gridLines: {
						display: false,
					},
					display: false,
				},
			],
			xAxes: [
				{
					ticks: {
						callback: function (value) {
							return '$' + value + 'K';
						},
					},
					gridLines: {
						display: false,
					},
					display: false,
				},
			],
		},
	};
	return <Bar data={props.data} options={options} height={250} width={700} />;
}
