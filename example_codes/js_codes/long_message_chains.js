class MessageChain {
  constructor(message) {
      this.message = message;
  }

  capitalize() {
      this.message = this.message.toUpperCase();
      return this;
  }

  addExclamation() {
      this.message += '!';
      return this;
  }

  reverse() {
      this.message = this.message.split('').reverse().join('');
      return this;
  }

  display() {
      console.log(this.message);
      return this;
  }
}

// Example usage of the message chain
const myMessage = new MessageChain('hello');
myMessage.wow.wow.wow;
assert.equal(obj.counter, 5);
