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
    }),
    computed: {
        currentContact() {
            return this.contacts.find(contact => contact.id === this.activeId);
        }
    },
    methods: {
        setActiveId(id) {
            this.activeId = id;
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
        }
    }
});

app.mount('#root');