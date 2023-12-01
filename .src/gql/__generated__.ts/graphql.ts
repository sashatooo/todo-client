/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addTask?: Maybe<Task>;
  addTodolist?: Maybe<Todolist>;
  deleteTask?: Maybe<Task>;
  deleteTodolist?: Maybe<Todolist>;
  updateTask?: Maybe<Task>;
  updateTodolist?: Maybe<Todolist>;
};


export type MutationAddTaskArgs = {
  isDone: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  todolistId: Scalars['ID']['input'];
};


export type MutationAddTodolistArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteTodolistArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  isDone: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  todolistId: Scalars['String']['input'];
};


export type MutationUpdateTodolistArgs = {
  filter: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  task?: Maybe<Task>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  tasksByTodolistId?: Maybe<Array<Maybe<Task>>>;
  todolist?: Maybe<Todolist>;
  todolists?: Maybe<Array<Maybe<Todolist>>>;
};


export type QueryTaskArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTasksByTodolistIdArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTodolistArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Task = {
  __typename?: 'Task';
  id?: Maybe<Scalars['ID']['output']>;
  isDone: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  todolist?: Maybe<Todolist>;
};

export type Todolist = {
  __typename?: 'Todolist';
  filter: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  title: Scalars['String']['output'];
};
