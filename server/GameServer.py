from twisted.internet.protocol import DatagramProtocol
from twisted.internet import reactor

# Server configuration
HOST = '0.0.0.0'
PORT = 6793

class GameServerProtocol(DatagramProtocol):
    def startProtocol(self):
        print(f'Serving on {HOST}:{PORT}')

    def datagramReceived(self, data, addr):
        print(f"Received message from {addr}: {data}")

        # Process the message and perform any game-related logic here
        # Update game state, respond to the client, etc.

        # Do not send a response back to the client, just print to server console

def main():
    reactor.listenUDP(PORT, GameServerProtocol(), interface=HOST)
    reactor.run()

if __name__ == '__main__':
    main()
