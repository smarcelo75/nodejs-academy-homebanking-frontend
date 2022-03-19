var app = new Vue({
    el: "#app",
    data: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        errorToats: null,
        errorMsg: "",
        showSignUp: false,
    },
    methods: {
        signIn: function(event) {
            event.preventDefault();
            const config = this.getToken();
            axios.post('http://localhost:3000/api/v1/signin', `email=${this.email}&password=${this.password}`, config)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    window.location.href = "/accounts.html"
                })
                .catch(() => {
                    this.errorMsg = "Sign in failed, check the information"
                    this.errorToats.show();
                })
        },
        signUp: function(event) {
            event.preventDefault();
            const config = this.getToken();
            axios.post('http://localhost:3000/api/v1/clients', `firstName=${this.firstName}&lastName=${this.lastName}&email=${this.email}&password=${this.password}`, config)
                .then(() => { this.signIn(event) })
                .catch(() => {
                    this.errorMsg = "Sign up failed, check the information"
                    this.errorToats.show();
                })
        },
        showSignUpToogle: function() {
            this.showSignUp = !this.showSignUp;
        },
        formatDate: function(date) {
            return new Date(date).toLocaleDateString('en-gb');
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