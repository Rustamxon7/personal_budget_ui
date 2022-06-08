import React from 'react';

const Transactions = ({ data }) => {
  const transactionsList =
    data.length > 0 ? (
      data.slice(0, 10).map((fund) => (
        <div className="small-list__row" key={fund.id}>
          <ion-icon class="small-list__icon" name={`${fund.icon}-outline`} style={{ color: fund.color }} />
          <div className="small-list__content">
            <span className="small-list__name">{fund.title}</span>
            <span className="small-list__date">{fund.date}</span>
          </div>
          <span className="small-list__price" style={fund.type_declaration === 'incomes' ? { color: 'green' } : { color: 'red' }}>
            {fund.type_declaration === 'incomes' ? `+ $ ${fund.amount}` : `- $ ${fund.amount}`}
          </span>
        </div>
      ))
    ) : (
      <div className="small-list__row">
        <ion-icon class="small-list__icon" name="cart-outline" />
        <div className="small-list__content">
          <span className="small-list__name">NO FUND</span>
          <span className="small-list__date">4 Aug 10:65 PM</span>
        </div>
        <span className="small-list__price">0$</span>
      </div>
    );

  return (
    <div>
      <div className="one-row">
        <h3 className="heading-tertiary">Transactions</h3>
      </div>
      <div className="small-list">{transactionsList}</div>
    </div>
  );
};

Transactions.defaultProps = {
  data: [],
};

export default Transactions;
