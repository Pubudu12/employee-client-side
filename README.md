As per the frontend, I have used Next Js, along with typescript. And for state management, I have used redux.

Inside the employee folder, all the list view, add and edit view are included.


Inside the redux folder in src the store file which is responsible for configuring the Redux store is included. And slices files are included inside the features/slices folder in order to store related actions, reducers, and initial state.

The provider file is kept inside src/app folder and that is used to wrap the entire application (in layout.tsx file) to make the Redux store available to all components in the component tree.
