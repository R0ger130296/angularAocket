let manageDocs = (http) => {
    let io = require("socket.io")(http),
        socketJwt = require("socketio-jwt");

    io.use(
        socketJwt.authorize({
            secret: process.env.KEY_JWT,
            handshake: true,
        })
    );

    const getData = {}; //lista de salas/documentos

    io.on("connection", (socket) => {
        let previousId;

        const safeJoin = (currentId) => {
            socket.leave(previousId);
            socket.join(currentId);
            previousId = currentId;
        };

        socket.on("getDoc", (id) => {
            safeJoin(id);
            socket.emit("manageData", getData[id]);
        });

        socket.on("addDoc", (doc) => {
            let rooms = Object.keys(getData),
                roomsNumber = rooms.length + 1,
                roomName = `Doc
                 ${roomsNumber}`;

            doc.id = roomName;

            getData[doc.id] = doc;
            safeJoin(doc.id);
            io.emit("getData", Object.keys(getData));
            // console.log(Object.values(getData));
            socket.emit("manageData", doc);
        });

        socket.on("editDoc", (doc) => {
            getData[doc.id] = doc;
            socket.to(doc.id).emit("manageData", doc);
        });

        io.emit("getData", Object.keys(getData));
    });
};

module.exports = manageDocs;