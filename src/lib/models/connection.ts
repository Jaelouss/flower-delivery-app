import mongoose, { type Connection } from "mongoose";

if (!global.mongoose) {
	global.mongoose = { conn: null, promise: null } as {
		conn: Connection | null;
		promise: Promise<Connection> | null;
	};
}

const cached = global.mongoose as {
	conn: Connection | null;
	promise: Promise<Connection> | null;
};

async function dbConnect(): Promise<Connection> {
	const MONGODB_URI = process.env.MONGODB_URI!;

	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI).then((m) => m.connection);
	}

	try {
		cached.conn = await cached.promise;
		console.log("✅ Підключено до MongoDB");
	} catch (error) {
		cached.promise = null;
		console.error("❌ Помилка підключення до MongoDB:", error);
		throw error;
	}

	if (!cached.conn) {
		throw new Error("MongoDB connection failed");
	}

	return cached.conn;
}

export default dbConnect;
