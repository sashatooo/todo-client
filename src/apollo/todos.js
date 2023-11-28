import { gql } from "@apollo/client";

export const ADD_TODOLIST = gql`
  mutation AddNewTodoList($title: String!) {
    addTodolist(title: $title) {
      id
      title
      filter
    }
  }
`;

export const ALL_TODOLISTS = gql`
  query AllTdolists {
    todolists {
      id
      title
      filter
    }
  }
`;

export const UPDATE_TODOLIST_TITLE = gql`
  mutation updateTodolistTitle($id: ID!, $title: String!, $filter:String!) {
    updateTodolist(id: $id, title: $title, filter:$filter) {
      id
      title
      filter
    }
  }
`;

export const CHANGE_TODOLIST_FILTER = gql`
  mutation updateTodolistTitle($id: ID!, $title: String!, $filter:String!) {
    updateTodolist(id: $id, title: $title, filter:$filter) {
      id
      title
      filter
    }
  }
`;

// export const ADD_TODOLIST = gql`
//   mutation AddTodolist($title: String!, $filter: String!) {
//     addTodolist(title: $title, filter: $filter) {
//       id
//       title
//       filter
//     }
//   }
// `;

export const REMOVE_TODOLIST = gql`
  mutation removeTodolist($id: ID) {
    deleteTodolist(id: $id) {
      id
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddNewTask($title: String!, $isDone: Boolean!, $todolistId: ID!) {
    addTask(title: $title, isDone: $isDone, todolistId: $todolistId) {
      id
      title
      isDone
    }
  }
`;

export const GET_TASK_BYID_TODO = gql`
  query getTasksByTodoId($id: ID, $filter: String) {
    tasks: tasksByTodolistId(id: $id, filter: $filter) {
      id
      title
      isDone
    }
  }
`;

// -----------------------

export const UPDATE_TASK_STATUS = gql`
  mutation ChandgeTaskStatus($id: ID!, $title: String!, $isDone: Boolean!, $todolistId: String!) {
    updateTask(id: $id, title: $title, isDone: $isDone, todolistId: $todolistId) {
      id
      isDone
    }
  }
`;

export const UPDATE_TASK_TITLE = gql`
  mutation ChandgeTaskStatus($id: ID!, $title: String!, $isDone: Boolean!, $todolistId: String!) {
    updateTask(id: $id, title: $title, isDone: $isDone, todolistId: $todolistId) {
      id
      title
    }
  }
`;

// -------------------------

export const REMOVE_TASK = gql`
  mutation removeTask($id: ID) {
    deleteTask(id: $id) {
      id
    }
  }
`;



// export const ADD_TODO = gql`
//   mutation AddTodo($title:String!, $userId: ID!, $completed:Boolean!){
//     newTodo:createTodo(title:$title, user_id: $userId, completed: $completed) {
//       id
//       title
//       completed
//     }
//   }
// `;

// export const UPDATE_TODO = gql`
//   mutation UpdateTodo($id:ID!, $completed:Boolean){
//     updateTodo(id: $id, completed:$completed) {
//       id
//       title
//       completed
//     }
//   }
// `;

// export const DELETE_TODO = gql`
//   mutation DeleteTodo($id:ID!) {
//     removeTodo(id:$id) {
//       id
//     }
//   }
// `;
