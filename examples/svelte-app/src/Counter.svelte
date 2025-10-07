<script>
let count = $state(0);

function increment() {
  count++;
}

function decrement() {
  count--;
}
</script>

<div>
  <h1>Counter: {count}</h1>
  <button onclick={increment}>Increment</button>
  <button onclick={decrement}>Decrement</button>
</div>
