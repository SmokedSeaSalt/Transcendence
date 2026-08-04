import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

type Point = {
	index: number;
	wpm: number;
	cpm: number;
};

// inspired by example chart from docs: https://recharts.github.io/?p=/en-US/api/PieChart
export default function ArrayGraph({ data }: { data: Point[] }) {
	return (
		<LineChart width={600} height={300} data={data}>
			<CartesianGrid strokeDasharray="5 5" />
			<YAxis yAxisId="wpm" orientation="left" stroke="#3b82f6" />

			<YAxis yAxisId="cpm" orientation="right" stroke="orange" />
			<Line
				yAxisId="wpm"
				dataKey="wpm"
				stroke="#3b82f6"
				dot={{
					fill: "#3b82f6",
				}}
				name="wpm"
			/>
			<Line
				yAxisId="cpm"
				dataKey="cpm"
				stroke="orange"
				dot={{
					fill: "orange",
				}}
				name="cpm"
			/>
			<Legend />
		</LineChart>
	);
}
