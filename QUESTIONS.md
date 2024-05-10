1. What is the difference between Component and PureComponent? Give an example where it might break my app.

    Component:

    - Re-renders every time its state or props change, even if it doesn't affect the component's output.
    - This causes the system to lose performance if the component is expensive to re-render.

    PureComponent:

    - Implements a shouldComponentUpdate method that performs a shallow comparison of the previous props and state with the new ones.
    - Only re-renders if the comparison reveals an actual change in value, not just a reference change.
    - This improves performance by avoiding unnecessary re-renders.

    Pure Components issues:
    May not be suitable for components that have complex logic, deep data structures, or depend objects created during rendering.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

    Context: Designed to efficiently pass data down a component tree. Updates to context values should trigger re-renders in components that rely on that data.
    ShouldComponentUpdate: An optimization to avoid unnecessary re-renders. It allows components to control if they update based on prop or state changes.

    It might be dangerous because:

    Skipped Updates: If a component using context implements ShouldComponentUpdate with a shallow comparison, it might miss updates to the context value. This is because ShouldComponentUpdate only checks for changes in props and state passed directly to the component, not the context itself.

3. Describe 3 ways to pass information from a component to its PARENT.

    - Callback Functions as Props
        Pass a callback function as a prop from the parent to the child component.
        Inside the child component, when it has the information to send back, it calls the callback function, passing the data as an argument.
        The parent component receives the data through the callback function's arguments.
    - Lifting State Up
        The child component calls a update state function, that was passed as prop, to modify the shared state, triggering a re-render in both the parent and child.
    - Context API
        Create a context object with a provider component that wraps the part of the tree where the data needs to be accessible.
        Child components can access the context using a useContext hook and can't directly modify the context value, but can trigger updates through provider component logic.

4. Give 2 ways to prevent components from re-rendering.

    - Using hooks like 'useMemo' and 'useCallback'. useMemo memorize values and only recompute them if their depencies change and useCallback memorize function references similar to useMemo.
    - Using PureCompnent correctly.

5. What is a fragment and why do we need it? Give an example where it might break my app.

    - Its a tag that allows to group multiple elements without adding extra nodes to the DOM. Without the extra nodes it optmize markup rendering time.
    - Break Example: A custom styling component that expects a list (<ul>) as its child for applying specific styles. If you wrap the list items in a fragment, the styling component might not work as intended because the fragment isn't considered.

6. Give 3 examples of the HOC pattern.

    - Higher-Order Component can be used for example:
        1. Logging function, so it add logs to the components that was passed as parameter of the HOC function.
        2. Checks if a user is logged in and authorized to access a specific component. It can redirect unauthorized users or display an error message.
        3. Fetching new data to the component, so the HOC function could receive the component and the data fetch function, and retrieve it to a new state in the component.

7. What's the difference in handling exceptions in promises, callbacks and async…await?

    1. Promises have a catch method that allows you to handle errors. When a promise is rejected, the catch is executed.
    2. Callbacks: It has to be passed a callbackError function and call it in the error scenario
    3. async…await: It has to use try...catch blocks to handle potential errors within async functions.

8. How many arguments does setState take and why is it async.

    - setState can take two arguments, the updated state object and a callback function that could be called after update the state.
    - It is async because:
        1. It allows to batch setState calls
        2. Prioritize setState calls accordingly of where it's been called.

9. List the steps needed to migrate a Class to Function Component.

    1. Convert Class to Function.
    2. Remove Constructor.
    3. Replace State with useState.
    4. Convert Methods to Functions.
    5. Remove this References.
    6. Replace Lifecycle Methods with Hook.
    7. Update Event Handlers.

10. List a few ways styles can be used with components.

    1. Basic CSS
    2. CSS Preprocessors
    3. Tailwind
    4. Inline styles

11. How to render an HTML string coming from the server.
    - Parsing the HTML into React elements with the react-html-parser library