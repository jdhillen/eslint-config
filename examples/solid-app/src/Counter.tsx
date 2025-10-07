import { createSignal } from 'solid-js';

interface CounterProps {
  initialCount?: number;
}

export function Counter(props: CounterProps) {
  const [count, setCount] = createSignal(props.initialCount || 0);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const decrement = () => {
    setCount((c) => c - 1);
  };

  return (
    <div>
      <h1>Counter: {count()}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
