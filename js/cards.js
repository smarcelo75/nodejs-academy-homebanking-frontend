var app = new Vue({
    el: "#app",
    data: {
        clientInfo: {},
        creditCards: [],
        debitCards: [],
        errorToats: null,
        errorMsg: null,
    },
    methods: {
        getData: function() {
            const config = this.getToken();
            axios.get("http://localhost:3000/api/v1/clients/current", config)
                .then((response) => {
                    //get client ifo
                    this.clientInfo = response.data.response;
                    this.creditCards = this.clientInfo.cards.filter(card => card.type == "CREDIT");
                    this.debitCards = this.clientInfo.cards.filter(card => card.type == "DEBIT");
                })
                .catch((error) => {
                    this.errorMsg = "Error getting data";
                    this.errorToats.show();
                })
        },
        formatDate: function(date) {
            return new Date(date).toLocaleDateString('en-gb');
        },
        signOut: function() {
            localStorage.removeItem('token');
            window.location.href = "/index.html";
        },
        getToken: function() {
            return {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'token': localStorage.getItem('token')
                }
            }
        }
    },
    mounted: function() {
        this.errorToats = new bootstrap.Toast(document.getElementById('danger-toast'));
        this.getData();
    }
})