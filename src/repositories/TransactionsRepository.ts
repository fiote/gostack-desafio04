import Transaction from '../models/Transaction';

interface Balance {
	income: number;
	outcome: number;
	total: number;
}

interface CreateDTO {
	title: string,
	value: number,
	type: 'income' | 'outcome'
}

class TransactionsRepository {
	private transactions: Transaction[];

	constructor() {
		this.transactions = [];
	}

	public all() {
		return this.transactions;
	}

	public getTypeSum(type: string) {
		return this.transactions.filter(t => t.type == type).map(t => t.value).reduce((total,value) => (total || 0) + (value || 0),0);
	}

	public getBalance(): Balance {
		const income = this.getTypeSum('income');
		const outcome = this.getTypeSum('outcome');
		return {
			income,
			outcome,
			total: income-outcome
		};
	}

	public create({ title, value, type }: CreateDTO) {
		const transaction = new Transaction({ title, value, type });
		this.transactions.push(transaction);
		return transaction;
	}
}

export default TransactionsRepository;
