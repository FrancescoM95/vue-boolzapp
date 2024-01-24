console.log('Vue OK', Vue);

const { createApp } = Vue;
const app = createApp({
    name: 'Boolzapp',
    data: () => ({
        data,
    }),
    computed: {

    },
    methods: {

    }
});

app.mount('#root');