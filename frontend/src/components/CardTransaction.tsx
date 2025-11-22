'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

enum TypeOperations {
	DELIVERY_FOODS = 'DELIVERY_FOODS',
	PERSONAL_PURCHASES = 'PERSONAL_PURCHASES',
	OTHERS = 'OTHERS',
}

type Operation = {
	id: number;
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
											<p className={`bg-${whichType(op.type)}-400 rounded-xl px-2 py-1`}>
												{op.type}
											</p>
										</div>
										<div className="">Value: {op.value}</div>
									</div>
								))}
							</div>
						</div>
				  ))
				: 'Загрузка...'}
		</div>
	);
}

function whichType(type: string) {
	switch (type) {
		case 'DELIVERY_FOODS':
			return 'green';
		case 'PERSONAL_PURCHASES':
			return 'yellow';
		default:
			return 'gray';
	}
}

export default CardTransaction;
