export default {
    Query: {
        project: async (parent, { _id }, { models }) => {
            const Project = await models.Project.findOne({ _id });
            return Project;
        },
    },
    Mutation: {
        createProject: async (parent, { name }, { models }) => {
            const Project = await models.Project.findOne({ name });
            if ( Project ) {
                throw new Error("Please provide a unique name.");
            }

            const newProject = new models.Project({
                name,
            })

            try {
                await newProject.save();
            } catch(e) {
                throw new Error(e);
            }

            return true;
        }
    }
};