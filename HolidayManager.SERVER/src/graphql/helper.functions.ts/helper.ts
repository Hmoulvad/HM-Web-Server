export async function saveObjectToDB (object: any) {
    try {
        await object.save();
    } catch(e) {
        throw new Error(e);
    }
};
