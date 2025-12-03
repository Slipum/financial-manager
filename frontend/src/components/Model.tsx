type ModelProps = {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
};

export function Model({ isOpen, onClose, title, children }: ModelProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={onClose}>
			<div
				className="bg-white p-6 rounded-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()}>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">{title}</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
						×
					</button>
				</div>
				{children}
			</div>
		</div>
	);
}

export default Model;
