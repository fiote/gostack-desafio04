import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
	title: string,
	value: number,
	type: 'income' | 'outcome'
}

class CreateTransactionService {
	private transactionsRepository: TransactionsRepository;

	constructor(transactionsRepository: TransactionsRepository) {
		this.transactionsRepository = transactionsRepository;
	}

	execute({ title, value, type }: RequestDTO) {
		const balance = this.transactionsRepository.getBalance();
		if (type == 'outcome' && value > balance.total) throw Error('You dont have enough money.');

		const appointment = this.transactionsRepository.create({ title, value, type });
		return appointment;
	}
}

export default CreateTransactionService;
