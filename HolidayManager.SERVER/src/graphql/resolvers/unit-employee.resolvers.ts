export default {
    Query: {
        unitEmployee: async (parent, { _id }, { models }) => {
            const UnitEmployee = await models.UnitEmployee.findOne({ _id });
            return UnitEmployee;
        },
    },
    Mutation: {
        createUnitEmployee: async (parent, { name }, { models }) => {
            const UnitEmployee = await models.UnitEmployee.findOne({ name });
            if ( UnitEmployee ) {
                throw new Error("Please provide a unique name.");
            }

            const newUnitEmployee = new models.UnitEmployee({
                name,
            })

            try {
                await newUnitEmployee.save();
            } catch(e) {
                throw new Error(e);
            }

            return true;
        }
    }
};