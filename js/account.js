var app = new Vue({
    el: "#app",
    data: {
        accountInfo: {},
        errorToats: null,
        errorMsg: null,
    },
    methods: {
        getData: function() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            const config = this.getToken();
            axios.get(`http://localhost:3000/api/v1/accounts/${id}`, config)
                .then((response) => {
                    //get client ifo
                    this.accountInfo = response.data.response;
                    this.accountInfo.transactions.sort((a, b) => parseInt(b.id - a.id))
                })
                .catch((error) => {
                    // handle error
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