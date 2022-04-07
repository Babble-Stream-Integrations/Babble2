//todo: dictionary van maken
interface Client {
    id: string,
    res: any
}

let clients: Client[] = [];

async function connect(id:string, res:any) {
	const headers = {
		"Content-Type": "text/event-stream",
		Connection: "keep-alive",
	};
	res.writeHead(200, headers);
	// setInterval(function () {res.write(":\n\n");}, 4000);
    setInterval(function () {res.write("event:end\n"); client.res.write('data: test && werkt && dit}\n\n');}, 4000);


	const client:Client = {
		id,
		res,
	};
	clients.push(client);
}

async function disconnect(id:string) {
	clients = clients.filter((client) => client.id !== id);
}

async function start(id:string, duration:bigint) {
	clients.forEach((client) => {
		if (client.id == id) {
            let time:number = Date.now();
			client.res.write("event: start\n");
			client.res.write(`data: {"time": ${time}, "duration": ${duration}}\n\n`);
		}
	});
}

async function end(id:string, winners:string[]) {
	clients.forEach((client) => {
		if (client.id == id) {
			client.res.write("event: end\n");
			client.res.write(`data: ${winners}\n\n`);
		}
	});
}

export default {
    connect,
    disconnect,
    start,
    end,
};