import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://online-todos.onrender.com/graphql",
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      documents: ["src/**/*.tsx"],
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
