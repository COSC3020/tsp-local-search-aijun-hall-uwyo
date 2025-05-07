// Calculate total length of the route
function route_length(route, matrix) {
    let sum = 0;

    for (let i = 0; i < route.length - 1; i++) {
        sum += matrix[route[i]][route[i+1]];
    }

    return sum;
}

// Reverse the route between indices i and k
function two_opt_swap(route, i, k) {
    // cities 1 to i-1 stay in the order they are -> untouched before i
    // cities i to k are reversed -> this loop reverses [i, k]
    // cities k + 1 to n stay in the order they are -> untouched after k
    while (i < k) {
        [route[i], route[k]] = [route[k], route[i]];
        i = i + 1;
        k = k - 1;
    }

    return route;
}

// Random shuffle for initial route
function shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
        const index_j = Math.floor(Math.random() * (index + 1));
        [array[index], array[index_j]] = [array[index_j], array[index]];
    }
}

// Get two distinct indices where i < k, by random selection.
function random_indices(n) {
    let i = Math.floor(Math.random() * (n - 1));
    let k = (i + 1) + Math.floor(Math.random() * (n - i - 1));

    return [i, k];
}


function tsp_ls(distance_matrix) {
    // Number of cities
    const n = distance_matrix.length;

    // Edge Case
    if (n <= 1) {
        return 0;
    }

    // Generate an initial random route
    let route = [];
    for (let i = 0; i < n; i++) {
        route.push(i);
    }

    shuffle(route);

    // Evaluate initial route
    let best_distance = route_length(route, distance_matrix);
    let best_route = [...route];

    // Stopping criterion: stop if no improvement after 100 iterations
    const max_no_improve = 100;
    let no_improve_count = 0;

    while (no_improve_count < max_no_improve) {
        const [i, k] = random_indices(n);

        // Test new_route by appling 2-opt swap, reversing segment between i and k
        const new_route = two_opt_swap([...best_route], i, k);
        const new_distance = route_length(new_route, distance_matrix);

        // If new_route is better, accept it as the new best
        if (new_distance < best_distance) {
            best_distance = new_distance;
            best_route = new_route;
            no_improve_count = 0; // reset, hit stopping criteria
        } else {
            no_improve_count = no_improve_count + 1;
        }
    }

    // Return length, not tour itself
    return best_distance;
}