export default {
    Query: {
        projectManager: async (parent, { _id }, { models }) => {
            const ProjectManager = await models.ProjectManager.findOne({ _id });
            return ProjectManager;
        },
    },
    Mutation: {
        createProjectManager: async (parent, { name }, { models }) => {
            const ProjectManager = await models.ProjectManager.findOne({ name });
            if ( ProjectManager ) {
                throw new Error("Please provide a unique name.");
            }

            const newProjectManager = new models.ProjectManager({
                name,
            })

            try {
                await newProjectManager.save();
            } catch(e) {
                throw new Error(e);
            }

            return true;
        }
    }
};