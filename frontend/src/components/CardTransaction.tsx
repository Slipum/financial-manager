'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Model from './Model';

enum TypeOperations {
	DELIVERY_FOODS = 'DELIVERY_FOODS',
	PERSONAL_PURCHASES = 'PERSONAL_PURCHASES',
	OTHERS = 'OTHERS',
}

type Operation = {
	id?: number;
	label: string;
	value: number;
	type: TypeOperations;
};

type Transaction = {
	id: number;
	value: number;
	operations: Operation[];
	createDate: string;
	closeDate: string;
};

export function CardTransaction() {
	const [isModalTransactionOpen, setIsModalTransactionOpen] = useState(false);
	const [isModalPricesOpen, setIsModalPricesOpen] = useState(false);
	const [transaction, setTransaction] = useState<Transaction[]>();
	const [prices, setPrices] = useState<Record<number, number>>({});

	useEffect(() => {
		axios
			.get('http://localhost:4000/finance')
			.then((res) => setTransaction(res.data))
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		if (!transaction) return;
		transaction.forEach(async (e) => {
			try {
				const response = await axios.get(`http://localhost:4000/finance/price/${e.id}`);
				setPrices((prev) => ({ ...prev, [e.id]: response.data.price }));
			} catch (error) {
				console.error('Ошибка запроса цены для id ', e.id, error);
			}
		});
	}, [transaction]);

	return (
		<div className="allTransactions flex mx-4 my-2 text-2xl">
			{isModalTransactionOpen && (
				<Model isOpen={isModalTransactionOpen} onClose={() => setIsModalTransactionOpen(false)}>
					<form className="space-y-4">
						<input
							type="text"
							placeholder="Название"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="text"
							placeholder="Тип (DELIVERY_FOODS...)"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="number"
							placeholder="Значение"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="flex gap-3 pt-2">
							<button
								type="button"
								onClick={() => setIsModalTransactionOpen(false)}
								className="flex-1 bg-gray-300 hover:bg-gray-400 p-3 rounded-lg transition-colors">
								Отмена
							</button>
							<button
								type="submit"
								className="flex-1 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
								Создать
							</button>
						</div>
					</form>
				</Model>
			)}
			{isModalPricesOpen && (
				<Model isOpen={isModalPricesOpen} onClose={() => setIsModalPricesOpen(false)}>
					<form className="space-y-4">
						<input
							type="text"
							placeholder="Тип (DELIVERY_FOODS...)"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="number"
							placeholder="Значение"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="flex gap-3 pt-2">
							<button
								type="button"
								onClick={() => setIsModalPricesOpen(false)}
								className="flex-1 bg-gray-300 hover:bg-gray-400 p-3 rounded-lg transition-colors">
								Отмена
							</button>
							<button
								type="submit"
								className="flex-1 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
								Создать
							</button>
						</div>
					</form>
				</Model>
			)}
			{transaction
				? transaction.map((e) => (
						<div key={e.id} className="transaction bg-gray-700 w-fit m-2 p-1 rounded-2xl">
							<div className="info-transaction bg-indigo-500 px-4 py-2 rounded-2xl m-2">
								<div className="flex justify-between">
									<p>Id: {e.id}</p>|<p>Цена: {prices[e.id] ?? 'Загрузка...'}</p>|
									<p
										className={`underline ${
											e.value - prices[e.id] < 0 ? 'decoration-red-500' : 'decoration-green-400'
										}`}>
										Итог: {e.value - prices[e.id]}
									</p>
								</div>
								<div className="">Value: {e.value}</div>
								<div className="">Create date: {new Date(e.createDate).toLocaleString()}</div>
								<div className="">Close date: {new Date(e.closeDate).toLocaleString()}</div>
							</div>
							<div className="allOperations m-2">
								{e.operations.map((op) => (
									<div
										key={op.id}
										className="operation mb-2 mx-8 bg-blue-400 px-4 py-2 rounded-2xl">
										<div className="">Id: {op.id}</div>
										<div className="">Label: {op.label}</div>
										<div className="flex gap-2">
											<p className={`px-2 py-1`}>Type:</p>
											<p
												className={`${
													op.type === 'DELIVERY_FOODS'
														? 'bg-green-400'
														: op.type === 'PERSONAL_PURCHASES'
														? 'bg-yellow-400'
														: 'bg-gray-400'
												} rounded-xl px-2 py-1`}>
												{op.type}
											</p>
										</div>
										<div className="">Value: {op.value}</div>
									</div>
								))}
								<div className="operation mb-2 mx-8 bg-gray-50 px-4 py-2 rounded-2xl opacity-15">
									<div
										onClick={() => setIsModalTransactionOpen(true)}
										className="flex justify-center text-black cursor-pointer">
										<i className="text-4xl fa-solid fa-circle-plus"></i>
									</div>
								</div>
							</div>
						</div>
				  ))
				: 'Загрузка...'}
			<div className="transaction bg-gray-700 w-fit m-2 p-1 rounded-2xl flex justify-center items-center">
				<div
					onClick={() => setIsModalPricesOpen(true)}
					className="info-transaction bg-gray-50 px-4 py-2 rounded-2xl opacity-15 cursor-pointer">
					<div>
						<i className="text-4xl fa-solid fa-circle-plus text-black"></i>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardTransaction;
