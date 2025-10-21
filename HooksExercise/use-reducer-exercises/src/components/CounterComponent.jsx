// component CounterComponent.jsx — useReducer version
import React, { useReducer } from 'react';
import Button from 'react-bootstrap/Button';

// State & reducer
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Style chung cho các button
  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Bộ Đếm Đa Năng</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Giá trị hiện tại: {state.count}
      </p>

      <Button
        onClick={() => dispatch({ type: 'INCREMENT' })}
        style={{ ...buttonStyle, background: '#007bff', color: 'white' }}
      >
        Tăng (+1)
      </Button>

      <Button
        onClick={() => dispatch({ type: 'DECREMENT' })}
        style={{ ...buttonStyle, background: '#ffc107', color: '#333' }}
      >
        Giảm (-1)
      </Button>

      <Button
        onClick={() => dispatch({ type: 'RESET' })}
        style={{ ...buttonStyle, background: 'red', color: 'white' }}
      >
        Reset
      </Button>
    </div>
  );
}
