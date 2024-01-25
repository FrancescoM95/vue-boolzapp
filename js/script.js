console.log('Vue OK', Vue);

const { user, contacts } = data;

const { createApp } = Vue;

const app = createApp({
    name: 'Boolzapp',
    data: () => ({
        user,
        contacts,
        activeId: Math.min(...contacts.map(contact => contact.id)),
    }),
    computed: {
        currentContact() {
            return this.contacts.find(contact => contact.id === this.activeId);
        }
    },
    methods: {
        setActiveId(id) {
            this.activeId = id;
        }
    }
});

app.mount('#root');