import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type Point = {
	index: number;
	wpm: number;
	cpm: number;
};

// inspired by example chart from docs: https://recharts.github.io/?p=/en-US/api/PieChart
export default function ArrayGraph({ data }: { data: Point[] }) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart data={data} className="outline-none">
				<CartesianGrid strokeDasharray="5 5" />

				<YAxis yAxisId="wpm" orientation="left" stroke="var(--color-graph-wpm)" />
				<YAxis yAxisId="cpm" orientation="right" stroke="var(--color-graph-cpm)" />

				<Line
					yAxisId="wpm"
					dataKey="wpm"
					stroke="var(--color-graph-wpm)"
					dot={{
						fill: "var(--color-graph-wpm)",
					}}
					name="wpm"
					isAnimationActive={false}
				/>
				<Line
					yAxisId="cpm"
					dataKey="cpm"
					stroke="var(--color-graph-cpm)"
					dot={{
						fill: "var(--color-graph-cpm)",
					}}
					name="cpm"
					isAnimationActive={false}
				/>
				<Legend />
			</LineChart>
		</ResponsiveContainer>
	);
}
