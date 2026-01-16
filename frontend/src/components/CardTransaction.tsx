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
	const [refresh, setRefresh] = useState(false);

	const [valueTransaction, setValueTransaction] = useState<number | null>(null);
	const [dateCloseTransaction, setDateCloseTransaction] = useState<Date | null>(null);

	const [typeTransaction, setTypeTransaction] = useState('0');
	const [addLabelTransaction, setAddLabelTransaction] = useState<string | null>(null);
	const [addValueTransaction, setAddValueTransaction] = useState<number | null>(null);
	const [idTransaction, setIdTransaction] = useState(0);

	useEffect(() => {
		axios
			.get('http://localhost:4000/finance')
			.then((res) => setTransaction(res.data))
			.catch((err) => console.error(err));
	}, [refresh]);

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

	const handleCreateTransaction = async () => {
		try {
			const data = {
				value: valueTransaction,
				closeDate: dateCloseTransaction,
			};
			if (valueTransaction != null && dateCloseTransaction != null) {
				await axios.post('http://localhost:4000/finance', data);
			}

			setRefresh(!refresh);

			setValueTransaction(null);
			setDateCloseTransaction(null);
			setIsModalPricesOpen(false);
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddTransaction = async () => {
		try {
			const data = {
				label: addLabelTransaction,
				value: addValueTransaction,
				type: typeTransaction,
				transactionId: idTransaction,
			};
			if (addLabelTransaction != null && addValueTransaction != null && typeTransaction != null) {
				await axios.post('http://localhost:4000/finance/operation', data);
			}

			setRefresh(!refresh);

			setTypeTransaction('0');
			setAddLabelTransaction(null);
			setAddValueTransaction(null);

			setIsModalTransactionOpen(false);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="allTransactions flex mx-4 my-2 text-2xl flex-wrap">
			{isModalTransactionOpen && (
				<Model isOpen={isModalTransactionOpen} onClose={() => setIsModalTransactionOpen(false)}>
					<div className="space-y-4">
						<label htmlFor="name-tag">Название</label>
						<input
							name="name-tag"
							type="text"
							placeholder="Steam"
							onChange={(e) => setAddLabelTransaction(e.target.value)}
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<label htmlFor="type">Тип транзакции</label>
						<select
							name="type"
							value={typeTransaction}
							onChange={(e) => setTypeTransaction(e.target.value)}
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="DELIVERY_FOODS">DELIVERY_FOODS</option>
							<option value="PERSONAL_PURCHASES">PERSONAL_PURCHASES</option>
							<option value="OTHERS">OTHERS</option>
						</select>
						<label htmlFor="value">Потрачено</label>
						<input
							name="value"
							type="number"
							placeholder="0"
							onChange={(e) => setAddValueTransaction(Number(e.target.value))}
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="flex gap-3 pt-2">
							<button
								type="button"
								onClick={() => setIsModalTransactionOpen(false)}
								className="flex-1 bg-gray-300 hover:bg-gray-400 p-3 rounded-lg transition-colors"
							>
								Отмена
							</button>
							<button
								type="button"
								onClick={handleAddTransaction}
								className="flex-1 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors"
							>
								Создать
							</button>
						</div>
					</div>
				</Model>
			)}
			{isModalPricesOpen && (
				<Model isOpen={isModalPricesOpen} onClose={() => setIsModalPricesOpen(false)}>
					<div className="space-y-4">
						<label htmlFor="value">Зачисленно</label>
						<input
							name="value"
							type="number"
							onChange={(e) => setValueTransaction(Number(e.target.value))}
							placeholder="Значение"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<label htmlFor="date">Дата окончания транзакции</label>
						<input
							name="date"
							type="date"
							onChange={(e) => setDateCloseTransaction(new Date(e.target.value))}
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="flex gap-3 pt-2">
							<button
								type="button"
								onClick={() => setIsModalPricesOpen(false)}
								className="flex-1 bg-gray-300 hover:bg-gray-400 p-3 rounded-lg transition-colors"
							>
								Отмена
							</button>
							<button
								type="button"
								onClick={handleCreateTransaction}
								disabled={!valueTransaction || !dateCloseTransaction}
								className="flex-1 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors"
							>
								Создать
							</button>
						</div>
					</div>
				</Model>
			)}
			{transaction
				? transaction.map((e) => (
						<div
							key={e.id}
							className="transaction bg-gray-700 
                 w-full sm:w-[calc(50%-0.25rem)] 
                 md:w-[calc(33.333%-0.666rem)] 
                 min-w-[250px] 
                 m-1 p-4 rounded-2xl shrink-0 hover:shadow-lg transition-all"
						>
							<div className="info-transaction bg-indigo-500 px-4 py-2 rounded-2xl m-2">
								<div className="flex justify-between">
									<p>Цена: {prices[e.id] ?? 'Загрузка...'}</p>
									<p
										className={`underline ${
											e.value - prices[e.id] < 0 ? 'decoration-red-500' : 'decoration-green-400'
										}`}
									>
										Итог: {e.value - prices[e.id]}
									</p>
								</div>
								<div className="">{e.value} ₽</div>
								<div className="">
									Create date:{' '}
									{new Date(e.createDate).toLocaleDateString('ru-RU', {
										day: 'numeric',
										month: 'short',
										year: 'numeric',
									})}
								</div>
								<div className="">
									Close date:{' '}
									{new Date(e.closeDate).toLocaleDateString('ru-RU', {
										day: 'numeric',
										month: 'short',
										year: 'numeric',
									})}
								</div>
							</div>
							<div className="allOperations m-2">
								{e.operations.map((op) => (
									<div
										key={op.id}
										className="operation mb-2 mx-8 bg-blue-400 px-4 py-2 rounded-2xl"
									>
										<div className="font-black">{op.label}</div>
										<div className="flex gap-2">
											<p
												className={`${
													op.type === 'DELIVERY_FOODS'
														? 'bg-green-400'
														: op.type === 'PERSONAL_PURCHASES'
														? 'bg-yellow-400'
														: 'bg-gray-400'
												} rounded-xl px-2 py-1 left-[4px]`}
											>
												{op.type}
											</p>
										</div>
										<div className="">{op.value} ₽</div>
									</div>
								))}
								<div className="operation mb-2 mx-8 bg-gray-50 px-4 py-2 rounded-2xl opacity-15">
									<div
										onClick={() => {
											setIsModalTransactionOpen(true);
											setIdTransaction(e.id);
										}}
										className="flex justify-center text-black cursor-pointer"
									>
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
					className="info-transaction bg-gray-50 px-4 py-2 rounded-2xl opacity-15 cursor-pointer"
				>
					<div>
						<i className="text-4xl fa-solid fa-circle-plus text-black"></i>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardTransaction;
