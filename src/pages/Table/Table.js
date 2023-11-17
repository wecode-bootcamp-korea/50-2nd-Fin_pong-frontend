import React from 'react';
import './Table.scss';

const Table = ({date, category, amount}) => {
    <tr>
      <td>{date}</td>
      <td>{category}</td>
      <td>{amount}</td>
    </tr>
  );
  
  // Component for the spending table
  const SpendingTable = ({ spendingData }) => (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {spendingData.map((spending, index) => (
          <SpendingRow key={index} {...spending} />
        ))}
      </tbody>
    </table>
  );
  
  // Component for the family spending book
  const FamilySpendingBook = () => {
    const [spendingData, setSpendingData] = useState([
      { date: '2023-01-01', category: 'Groceries', amount: 50 },
      { date: '2023-01-05', category: 'Utilities', amount: 100 },
      // Add more initial spending data as needed
    ]);
  
    // Function to handle adding a new spending entry
    const addSpendingEntry = (newEntry) => {
      setSpendingData([...spendingData, newEntry]);
    };
  
    return (
      <div>
        <h2>Family Spending Book</h2>
        <SpendingTable spendingData={spendingData} />
        {/* Form for adding new spending entry */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const date = e.target.date.value;
            const category = e.target.category.value;
            const amount = parseFloat(e.target.amount.value);
  
            if (date && category && !isNaN(amount)) {
              addSpendingEntry({ date, category, amount });
              e.target.reset();
            } else {
              alert('Please fill in all fields with valid data.');
            }
          }}
        >
          <label>Date:</label>
          <input type="date" name="date" required />
          <label>Category:</label>
          <input type="text" name="category" required />
          <label>Amount:</label>
          <input type="number" name="amount" step="0.01" required />
          <button type="submit">Add Entry</button>
        </form>
      </div>
    );
  };
  
  export default FamilySpendingBook;

export default Table;
