# Todo List App

This is a simple React application that fetches and displays a list of items from a mock API endpoint. Each item has a title and a description, and you can mark items as "completed."

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

1. **Clone the repository:**
  
   git clone https://github.com/your-username/todo-list-app.git
# Navigate to the project directory:

`cd todo-list-app`

# Install dependencies:

`npm install`

# Run the application:
 `npm start`

## Open http://localhost:3000 to view the app.

 ### Usage
Click the "Show Completed" or "Hide Completed" button to toggle the visibility of completed items.
Click the "Refresh List" button to reload the todo list.
Mark items as completed by clicking the checkbox next to each item.


### Implementation Choices
React and React Hooks: The project is built using React, utilizing functional components and hooks for state management.
Virtualization: To optimize performance, I used the react-window library for virtualization when dealing with a large number of items.
Styled Components: Styled components are used for a more maintainable and readable way of styling.


