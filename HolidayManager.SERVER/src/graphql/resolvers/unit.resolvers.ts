export default {
    Query: {
        getUnit: async (parent, { _id }, { models }) => {
            const Unit = await models.Unit.findOne({ _id });
            return Unit;
        },
    },
    Mutation: {
        createUnit: async (parent, { name }, { models }) => {
            const Unit = await models.Unit.findOne({ name });
            if ( Unit ) {
                throw new Error("Please provide a unique name.");
            }

            const newUnit = new models.Unit({
                name,
            })

            try {
                await newUnit.save();
            } catch(e) {
                throw new Error(e);
            }

            return true;
        }
    }
};