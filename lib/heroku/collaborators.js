import Promise                from 'bluebird';
import { log, error } from '../logger';

let request;

function collaborators(app, newCollaborators) {

    let currentCollaborators;

    // fetch existing collaborators
    return request.get(`/apps/${app.name}/collaborators`)

    // filter out existing collaborators that need to be removed
    .then((response) => {

        currentCollaborators = response;

        // Existing collaborators that don't exist in the new schema will lose collaborator status
        let toRemove = currentCollaborators
        .filter((collaborator) => !newCollaborators.includes(collaborator))
        .filter((collaborator) => collaborator.role !== 'owner')
        .map((collaborator) => collaborator.user.email);

        return Promise.resolve(toRemove);
    })

    // remove collaborators
    .then((toRemove) => {

        return Promise.all(
            toRemove.map((collaborator) => {
                let url = `/apps/${app.name}/collaborators/${collaborator}`;
                request.delete(url);
            })
        );
    })

    // filter new collaborators to add
    .then(() => {

        let currentCollaboratorNames = currentCollaborators.map((collaborator) => collaborator.user.email);

        let toAdd = newCollaborators.filter(
            (collaborator) => !currentCollaboratorNames.includes(collaborator)
        );
        
        return Promise.resolve(toAdd);
    })

    // Add new Collaborators
    .then((toAdd) => {

        let url = `/apps/${app.name}/collaborators`;
        return Promise.all(
            toAdd.map((collaborator) => request.post(url, {
                body: {
                    user: collaborator,
                    silent: true
                }
            })
            .catch((err) => error(`Error: ${err}`)))
        );
    }) 

    .then(() => {

        log(`Updated app collaborators`);
        return Promise.resolve(app);
    })

    .catch((err) => {

        error(`Error: ${err}`);
        process.exit(1);
    });
}

export default function(req) {

    request = req;
    return collaborators;
};
