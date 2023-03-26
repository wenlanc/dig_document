export default function GenerateChartData({
	xAxis,
	yAxis,
	Xmin,
	Xmax,
	Xstep,
	Ymin,
	Ymax,
	Ystep,
	label,
	highlight,
}) {
	console.log('=-=-===-==', highlight);
	let currXAxis;
	if (Array.isArray(xAxis)) {
		currXAxis = xAxis;
	} else {
		currXAxis = [];
		while (Xmin <= Xmax) {
			currXAxis.push(Xmin);
			Xmin += Xstep;
		}
	}
	let currYAxis;
	if (Array.isArray(yAxis)) {
		currYAxis = yAxis;
	} else {
		currYAxis = [];
		while (Ymin <= Ymax) {
			currYAxis.push(Ymin);
			Ymin += Ystep;
		}
	}
	let backGroundColor = 'rgba(12, 105, 253, 0.2)';

	if (typeof highlight != undefined) {
		backGroundColor = currXAxis.map((value, index) => {
			if (index === highlight) {
				return '#333333';
			}
			return '#dadce1';
		});
	}
	let currLabel = 'test1';
	if (typeof label != undefined) {
		currLabel = label;
	}
	let borderColor = '#dadce1';
	let hoverBackgroundColor = '#dadce1';
	let hoverBorderColor = '#dadce1';
	const data = {
		labels: currXAxis,
		datasets: [
			{
				label: currLabel,
				backgroundColor: backGroundColor,
				borderColor: borderColor,
				borderWidth: 1,
				hoverBackgroundColor: hoverBackgroundColor,
				hoverBorderColor: hoverBorderColor,
				data: currYAxis,
			},
		],
	};
	return data;
}
