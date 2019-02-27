export default {
    Query: {
        farewell: (_: any, { name }: any) => `hello ${ name || "Farewell"}`,
    },
};