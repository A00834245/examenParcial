const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const membersData = [
    {
        usuario: "sandra.g",
        contraseña: "latte123",
        nombreCompleto: "Sandra García",
        numeroMembresia: 5001
    },
    {
        usuario: "roberto.m",
        contraseña: "capuccino456",
        nombreCompleto: "Roberto Martínez",
        numeroMembresia: 5002
    },
    {
        usuario: "esteban.l",
        contraseña: "espresso789",
        nombreCompleto: "Esteban López",
        numeroMembresia: 5003
    }
];

export const getMembers = async () => {
    await delay(500);
    return membersData;
};
