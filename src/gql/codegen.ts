import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: "https://online-todos.onrender.com/graphql",
  documents: "./src/gql/documents/**/*.gql",
  generates: {
    '.src/gql/__generated__.ts/': {
      documents: ['src/**/*.tsx'],
      preset: 'client',
      plugins: [],
    },
  },
  config: {
    withHOC: true,
    withHooks: true
  }
}

export default config