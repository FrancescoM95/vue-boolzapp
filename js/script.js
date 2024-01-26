console.log('Vue OK', Vue);

const { user, contacts } = data;

const { createApp } = Vue;

const app = createApp({
    //# DATA
    name: 'Boolzapp',
    data: () => ({
        user,
        contacts,
        activeId: Math.min(...contacts.map(contact => contact.id)),
        currentInput: '',
        searchText: '',
        lastLog: `Ultimo accesso oggi alle ${new Date().toLocaleTimeString()}`
    }),

    //# COMPUTED
    computed: {
        currentContact() {  //* Funzione che restituisce l'id del contatto attivo
            return this.contacts.find(contact => contact.id === this.activeId);
        },
        filteredContacts() {  //* Funzione che restituisce un array filtrato in base all'input dell'utente
            const textToSearch = this.searchText.toLowerCase();
            return this.contacts.filter(contact => contact.name.toLowerCase().includes(textToSearch));
        }
    },

    //# METHODS
    methods: {
        setActiveId(id) {  //* Funzione che imposta come id attivo l'id del contatto ricevuto come parametro
            this.activeId = id;
        },
        getLastMessage(contact) {  //* Funzione che, se presente, restituisce l'ultimo messaggio con il contatto ricevuto come parametro 
            if (contact.messages.length) {
                const lastMessage = contact.messages[contact.messages.length - 1];
                return lastMessage.text;
            } return ''

        },
        getLastMessageDate(contact) {   //* Funzione che restituisce la data dell'ultimo messaggio
            const lastMessage = contact.messages[contact.messages.length - 1];
            return lastMessage.date;
        },
        sendMessage() {    //* Funzione che aggiunge un nuovo messaggio inviato alla chat
            if (this.currentInput.trim() !== '') {
                const newMessage = {
                    id: this.currentContact.messages.length + 1,
                    date: new Date().toLocaleString(),
                    text: this.currentInput,
                    status: 'sent',
                };
                this.currentContact.messages.push(newMessage);
                this.currentInput = '';
                this.lastLog = 'Sta scrivendo...';

                setTimeout(() => {  //* Funzione che simula risposta al messaggio
                    const responseMessage = {
                        id: this.currentContact.messages.length + 1,
                        date: new Date().toLocaleString(),
                        text: 'OK',
                        status: 'received',
                    };
                    this.currentContact.messages.push(responseMessage);
                    this.lastLog = `Ultimo accesso oggi alle ${new Date().toLocaleTimeString()}`;
                }, 1000);
            }
        },
        deleteMessage(messageId) {  //* Funzione per eliminare il messaggio dalla chat
            if (this.currentContact.messages.length > 1) {
                this.currentContact.messages = this.currentContact.messages.filter(message => message.id !== messageId);
            } else {
                this.currentContact.messages = [
                    {
                        id: '',
                        date: '',
                        text: '',
                        status: 'd-none',
                    }
                ]
            }

        }
    }
});

app.mount('#root');