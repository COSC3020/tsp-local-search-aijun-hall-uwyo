# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

<hr>

Initial for loop to build route: `for (let i = 0; i < n; i++) {`

$O(n)$

Fisher-Yates shuffle: `shuffle(route);`

`for (let index = array.length - 1; index > 0; index--) {`

$O(n)$

Add up edge weights to compute tour length: `route_length(route, distance_matrix);`

`for (let i = 0; i < route.length - 1; i++) {`

$O(n)$

Constant 100 iterations in the worst case while loop:
```
  while (no_improve_count < max_no_improve) {
    const [i, k] = random_indices(n);

    // Test new_route by appling 2-opt swap, reversing segment between i and k
    const new_route = two_opt_swap([...best_route], i, k);
    const new_distance = route_length(new_route, distance_matrix);
```

This loop executes a constant 100 iterations in the worst case due to the limit set by `max_no_improve`

Worst case time complexity: $100 * O(n) = O(n)$

Worst case memory complexity: All helper functions stay constant-space. `route_length` holds a running
total and a loop index, `two_opt_swap` swaps in place, and `shuffle` and `random_indicies` only use
a few simple variables. All routes in memory within this algorithm are just a list of `n` citiy indicies, so at most the extra memory needed grows in proportion to the number of cities:

$O(n)$

- Referenced https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/ for shuffle code. All code written by me, just referenced.

- Referenced https://www.geeksforgeeks.org/traveling-salesman-problem-tsp-implementation/ for traveling salesman problem reading. All code written by me, just referenced.

- Referenced https://www.geeksforgeeks.org/travelling-salesman-problem-implementation-using-backtracking/ for traveling salesman problem with local search for this problem. All code written by me, just referenced.

"I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice."