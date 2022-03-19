var app = new Vue({
    el: "#app",
    data: {
        errorToats: null,
        errorMsg: null,
        cardType: "none",
        cardColor: "none",
    },
    methods: {
        formatDate: function(date) {
            return new Date(date).toLocaleDateString('en-gb');
        },
        signOut: function() {
            localStorage.removeItem('token');
            window.location.href = "/index.html";
        },
        create: function(event) {
            event.preventDefault();
            if (this.cardType == "none" || this.cardColor == "none") {
                this.errorMsg = "You must select a card type and color";
                this.errorToats.show();
            } else {
                const config = this.getToken();
                console.log(config);
                axios.post(`http://localhost:3000/api/v1/clients/current/cards?cardType=${this.cardType}&cardColor=${this.cardColor}`, null, config)
                    .then(response => window.location.href = "./cards.html")
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        this.errorToats.show();
                    })
            }
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
    }
})