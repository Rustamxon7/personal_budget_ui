import React, { useEffect } from 'react';

import {
  AreaChart, Area, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchTransactions } from '../redux/funds/transactions';

const Chart = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const funds = useSelector((state) => state.transactions.transactions.transactions);
  const incomes = useSelector((state) => state.transactions.transactions.incomes);
  const expenses = useSelector((state) => state.transactions.transactions.expenses);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const fundsLocation = (location) => {
    if (location.pathname.split('/')[1] === 'incomes') {
      return incomes || [];
    }
    if (location.pathname.split('/')[1] === 'expenses') {
      return expenses || [];
    }
    if (location.pathname.split('/')[3] === 'incomes') {
      return incomes || [];
    }
    if (location.pathname.split('/')[3] === 'expenses') {
      return expenses || [];
    }
    return funds || [];
  };

  const transaction = fundsLocation(location).map((fund) => ({
    name: fund.title,
    expenses: fund.type_declaration === 'expenses' ? fund.amount : 0,
    incomes: fund.type_declaration === 'incomes' ? fund.amount : 0,
    amt: fund.amount,
  }));

  return (
    <div style={{ width: '100%', height: 340 }} className="chart">
      <ResponsiveContainer>
        <AreaChart
          width={430}
          height={250}
          data={transaction}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0
          }}
        >
          <defs>
            <linearGradient id="colorincomes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorexpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />

          <CartesianGrid strokeDasharray="3 9" />
          <Tooltip />
          <Area type="monotone" dataKey="incomes" stroke="#8884d8" fillOpacity={1} fill="url(#colorincomes)" />
          <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fillOpacity={1} fill="url(#colorexpenses)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
