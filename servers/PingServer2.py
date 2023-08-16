from twisted.internet.protocol import DatagramProtocol
from twisted.internet import reactor, task

# Server configuration
HOST = '0.0.0.0'
PORT = 21274

class GameServerProtocol(DatagramProtocol):
    def startProtocol(self):
        print(f'Serving on {HOST}:{PORT}')
        
        # Start sending packets every 1 second
        self.send_task = task.LoopingCall(self.send_packet)
        self.send_task.start(1.0)  # Send a packet every 1 second

    def datagramReceived(self, data, addr):
        print(f"Received message from {addr}: {data}")

        # Process the message and perform any game-related logic here
        # Update game state, respond to the client, etc.

    def send_packet(self):
        # Send a packet containing the letter "a"
        message = b'a'
        self.transport.write(message, ('127.0.0.1', PORT))  # Replace IP with appropriate client IP

def main():
    reactor.listenUDP(PORT, GameServerProtocol(), interface=HOST)
    reactor.run()

if __name__ == '__main__':
    main()