import { Loader } from "components";

export default function Loading() {
	return (
		<div className="flex-center h-screen">
			<Loader textClassNames="text-2xl text-center" />
		</div>
	);
}
