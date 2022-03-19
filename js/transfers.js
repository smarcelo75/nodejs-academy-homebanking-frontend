var app = new Vue({
    el: "#app",
    data: {
        clientAccounts: [],
        clientAccountsTo: [],
        debitCards: [],
        errorToats: null,
        errorMsg: null,
        accountFromNumber: "VIN",
        accountToNumber: "VIN",
        trasnferType: "own",
        amount: 0,
        description: ""
    },
    methods: {
        getData: function() {
            const config = this.getToken();
            axios.get("http://localhost:3000/api/v1/clients/current/accounts", config)
                .then((response) => {
                    //get client ifo
                    this.clientAccounts = response.data.response;
                })
                .catch((error) => {
                    this.errorMsg = "Error getting data";
                    this.errorToats.show();
                })
        },
        formatDate: function(date) {
            return new Date(date).toLocaleDateString('en-gb');
        },
        checkTransfer: function() {
            if (this.accountFromNumber == "VIN") {
                this.errorMsg = "You must select an origin account";
                this.errorToats.show();
            } else if (this.accountToNumber == "VIN") {
                this.errorMsg = "You must select a destination account";
                this.errorToats.show();
            } else if (this.amount == 0) {
                this.errorMsg = "You must indicate an amount";
                this.errorToats.show();
            } else if (this.description.length <= 0) {
                this.errorMsg = "You must indicate a description";
                this.errorToats.show();
            } else {
                this.modal.show();
            }
        },
        transfer: function() {
            const config = this.getToken();
            axios.post(`http://localhost:3000/api/v1/transactions/transfer?fromAccountNumber=${this.accountFromNumber}&toAccountNumber=${this.accountToNumber}&amount=${this.amount}&description=${this.description}`, null, config)
                .then(response => {
                    this.modal.hide();
                    this.okmodal.show();
                })
                .catch((error) => {
                    this.errorMsg = error.response.data.response;
                    this.errorToats.show();
                })
        },
        changedType: function() {
            this.accountFromNumber = "VIN";
            this.accountToNumber = "VIN";
        },
        changedFrom: function() {
            if (this.trasnferType == "own") {
                this.clientAccountsTo = this.clientAccounts.filter(account => account.number != this.accountFromNumber);
                this.accountToNumber = "VIN";
            }
        },
        finish: function() {
            window.location.reload();
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
        this.modal = new bootstrap.Modal(document.getElementById('confirModal'));
        this.okmodal = new bootstrap.Modal(document.getElementById('okModal'));
        this.getData();
    }
})