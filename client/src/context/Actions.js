//clic du bouton :
// 1 envoi du pseudo / mdp
// 2 puis succès : réponse avec les infos d'user
// 2 ou echec, error: true
// 3 update de l'initial state, user != null


export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
});

export const LoginSuccess = (user) =>({
    type: "LOGIN_SUCCESS",
    payload: user, // pour update le state on utilise cet user
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
});

export const Logout = () => ({
    type: "LOGOUT"
});


//  UPDATE du profil d'user //

export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START"
});

export const UpdateSuccess = (user) =>({
    type: "UPDATE_SUCCESS",
    payload: user, // pour update le state on utilise cet user
});

export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE"
});