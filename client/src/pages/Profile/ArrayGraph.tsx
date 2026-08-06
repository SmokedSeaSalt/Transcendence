import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type Point = {
	index: number;
	wpm: number;
	accuracy: number;
};

// inspired by example chart from docs: https://recharts.github.io/?p=/en-US/api/PieChart
export default function ArrayGraph({ data }: { data: Point[] }) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart data={data} className="outline-none">
				<CartesianGrid strokeDasharray="5 5" className="outline-none" />

				<YAxis yAxisId="wpm" orientation="left" stroke="var(--color-graph-wpm)"  className="outline-none"/>
				<YAxis yAxisId="accuracy" orientation="right" stroke="var(--color-graph-cpm)"  className="outline-none"/>

				<Line
					yAxisId="wpm"
					dataKey="wpm"
					stroke="var(--color-graph-wpm)"
					dot={{
						fill: "var(--color-graph-wpm)",
					}}
					name="wpm"
					isAnimationActive={false}
					className="outline-none"
				/>
				<Line
					yAxisId="accuracy"
					dataKey="accuracy"
					stroke="var(--color-graph-cpm)"
					dot={{
						fill: "var(--color-graph-cpm)",
					}}
					name="accuracy"
					isAnimationActive={false}
					className="outline-none"
				/>
				<Legend className="outline-none"/>
			</LineChart>
		</ResponsiveContainer>
	);
}
