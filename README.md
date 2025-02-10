## Setup

Pre-add generate and add `ssh` keys. Next, declone this repository with the command below:

### In order to declone a repository using SSH

```bash
 git clone git@github.com:antondevreact/Blog-App.git
```

## Commands

`npm install` - to establish dependency

`npm run dev` - to start the project

`next build` - to create a production build of the application

`npm start` - runs an already built application in production mode

`npm run lint` - checks the code for errors and style violations with ESLint

## Implemented Functions

### 1.useInfiniteScroll

A custom React hook that enables infinite scrolling by detecting when the last element in a list is visible and triggering a callback to load more data.

Props:

**isLoading (boolean)** – Indicates if data is currently being loaded.

**hasMore (boolean)** – Indicates if there is more data to load.

**loadMore (function)** – Function that loads additional data.

How It Works:
Uses the IntersectionObserver API to observe the last list element.
Calls loadMore when the element becomes visible in the viewport, provided isLoading is false and hasMore is true.

### 2.useDebounce

A custom React hook that delays the execution of a function until after a specified time has elapsed since the last invocation. Useful for optimizing performance in events like search input or window resizing.

Props:

**callback (function)** – The function to be debounced.

**delay (number)** – Delay in milliseconds before executing the function.

How It Works:
Prevents frequent function calls by resetting a timer each time the function is invoked.
Ensures that the callback function is executed only after the user stops triggering it for the specified delay period.

## API Integration

This project utilizes Mirage.js to simulate a backend API for development and testing purposes. Mirage.js allows you to create a mock server that intercepts network requests and returns predefined responses, making it easier to develop and test your application without relying on a real backend.

### Installation & Setup

To use Mirage.js, ensure you have it installed in your project:

`npm install miragejs`

Then, import and configure the mock server.

### Explanation of the API Setup\*\*

Namespace: The API routes are prefixed with /api to simulate a real API structure.

**GET /posts**: This endpoint supports pagination and searching. It filters the posts based on the search query and returns a subset of posts based on the requested page and limit.

**GET /posts/:id**: This endpoint retrieves a specific post by its ID.
By using Mirage.js, you can easily test various scenarios, such as loading states, error handling, and data fetching, without needing a live backend. This approach enhances the development experience and allows for rapid iteration on the frontend.

### Mock Data

The API serves mock posts stored in a JavaScript array. Each post includes an ID, image, date, author, title, description, and tags.

Example post structure:

```typescript
export const posts = [
  {
    id: 1,
    image: picture,
    date: "Sunday, 1 Jan 2023",
    author: "John Doe",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Discover the key strategies, leadership principles, and mindset shifts that made it possible.",
    tags: ["Leadership", "Sports", "Strategy", "Mindset"],
  },
  ...
];
```

### Deployment URL - [Blog App](https://guileless-mousse-67203f.netlify.app)
