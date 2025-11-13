const users = [
  { user: "user", password: "user123", role: "admin", token: "user" },
];

export function verifyUser(user, password) {
    const userFound = users.find( (u) => {
        return u.user === user && u.password === password
    } )

    return userFound ? { role: userFound.role, token: userFound.token } : null
}