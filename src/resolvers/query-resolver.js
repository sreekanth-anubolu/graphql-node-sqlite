import {retriveUsers, retriveSkills, retriveOrganisations} from "../retrivers/sqlite-retriver";

export const QueryResolvers = {

    Query: {

        Users (root, args, context) {
            const ids = normalizeIds(args);
            return retriveUsers(ids);
        },

        Skills (root, args, context) {
            return retriveSkills();
        },

        Organisations (root, args, context) {
            const ids = normalizeIds(args);
            return retriveOrganisations(ids);
        }

    }
}


function normalizeIds(args) {
    let ids = []
    if (args.ids) {
        ids = args.ids;
    }
    return ids;
}