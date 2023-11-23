import { gql } from "@apollo/client";

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
  mutation updateTodolistTitle($id: ID, $title: String) {
    updateTodolist(id: $id, title: $title) {
      id
      title
      filter
    }
  }
`;

export const ADD_TODOLIST = gql`
  mutation AddTodolist($title: String!, $filter: String!) {
    addTodolist(title: $title, filter: $filter) {
      id
      title
      filter
    }
  }
`;

export const REMOVE_TODOLIST = gql`
  mutation AddTodolist($id: ID) {
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
  query getTasksByTodoId($id: ID) {
    tasks: tasksByTodolistId(id: $id) {
      id
      title
      isDone
    }
  }
`;

export const UPDATE_TASK_STATUS = gql`
  mutation ChandgeTaskStatus($id: ID!, $isDone: Boolean) {
    updateTask(id: $id, isDone: $isDone) {
      id
      title
      isDone
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
