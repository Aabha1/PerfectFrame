/* eslint-disable arrow-body-style */
const SigninScreen = {
    after_render: () => {},
    render: () => {
        return `
        <div class="formContainer">
            <form id="signinForm">
                <ul class="formItems">
                    <li>
                        <h1> Sign-In Please </h1>
                    </li>
                    <li>
                        <label for="email">Enter e-mail</label>
                        <input type="email" name="email" id="email"/>
                    </li>
                    <li>
                        <label for=password">Enter password</label>
                        <input type="password" name="password" id="password" />
                    </li>
                    <li>
                        <button type="Submit" disabled class="primary">Sign-in</button>
                    </li>
                    <li>
                        <div>
                            New User?
                            <a href="/#/register">Create your account</a>
                        </div>
                    </li>
                </ul>
            <form>
        </div>
        `;
    },
};
export default SigninScreen;