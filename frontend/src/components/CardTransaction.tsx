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
	const [data, setData] = useState<Transaction[]>();

	useEffect(() => {
		axios
			.get('http://localhost:4000/finance')
			.then((res) => setData(res.data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="allTransactions">
			{data
				? data.map((e) => (
						<div key={e.id} className="transaction bg-amber-300 w-fit m-2 p-1">
							<div className="info-transaction bg-red-300 px-4 py-2">
								<div className="">Id: {e.id}</div>
								<div className="">Value: {e.value}</div>
								<div className="">Create date: {new Date(e.createDate).toLocaleString()}</div>
								<div className="">Close date: {new Date(e.closeDate).toLocaleString()}</div>
							</div>
							<div className="allOperations  m-2">
								{e.operations.map((op) => (
									<div key={op.id} className="operation mb-2 bg-blue-400 px-4 py-2">
										<div className="">Id: {op.id}</div>
										<div className="">Label: {op.label}</div>
										<div className="">Type: {op.type}</div>
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

export default CardTransaction;
