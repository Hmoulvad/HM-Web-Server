export default {
    Query: {
        hello: (_: any, { name }: any) => `hello ${name || "World"}`,
    },
};