import io from 'socket.io-client'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from "@feathersjs/authentication-client";

const socket = io(import.meta.env.PUBLIC_BACKEND_URI)
const client = feathers()

client.configure(socketio(socket))
client.configure(authentication())
export default client
