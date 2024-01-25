console.log('Vue OK', Vue);

const { user, contacts } = data;

const { createApp } = Vue;

const app = createApp({
    name: 'Boolzapp',
    data: () => ({
        user,
        contacts,
        activeId: Math.min(...contacts.map(contact => contact.id)),
        currentInput: '',
        searchText: '',
    }),
    computed: {
        currentContact() {
            return this.contacts.find(contact => contact.id === this.activeId);
        },
        filteredContacts() {
            const textToSearch = this.searchText.toLowerCase();
            return this.contacts.filter(contact => contact.name.toLowerCase().includes(textToSearch));
        }
    },
    methods: {
        setActiveId(id) {
            this.activeId = id;
        },
        getLastMessage(contact) {
            const lastMessage = contact.messages[contact.messages.length - 1];
            return lastMessage.text;
        },
        getLastMessageDate(contact) {
            const lastMessage = contact.messages[contact.messages.length - 1];
            return lastMessage.date;
        },
        sendMessage() {
            if (this.currentInput.trim() !== '') {
                const newMessage = {
                    id: this.currentContact.messages.length + 1,
                    date: new Date().toLocaleString(),
                    text: this.currentInput,
                    status: 'sent',
                };
                this.currentContact.messages.push(newMessage);
                this.currentInput = '';

                setTimeout(() => {
                    const responseMessage = {
                        id: this.currentContact.messages.length + 1,
                        date: new Date().toLocaleString(),
                        text: 'OK',
                        status: 'received',
                    };
                    this.currentContact.messages.push(responseMessage);
                }, 1000);
            }
        },
        deleteMessage(messageId) {
            this.currentContact.messages = this.currentContact.messages.filter(message => message.id !== messageId);
        }
    }
});

app.mount('#root');