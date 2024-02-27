public class Message {
    private String content;

    public Message(String content) {
        this.content = content;
    }

    public Message encrypt() {
        // Logic to encrypt the message
        this.content = "Encrypted: " + this.content;
        return this;
    }

    public Message compress() {
        // Logic to compress the message
        this.content = "Compressed: " + this.content;
        return this;
    }

    public Message sign() {
        // Logic to sign the message
        this.content = "Signed: " + this.content;
        return this;
    }

    public String getContent() {
        return this.content;
    }

    public static void main(String[] args) {
        // Creating a Message and chaining multiple operations
        Message myMessage = new Message("Hello, world!");
        String finalMessage = myMessage.content.encrypt().compress().sign().getContent();

        System.out.println(finalMessage);
    }
}
